
#import "CDVAudions.h"
#import "CDVFile.h"

#define DOCUMENTS_SCHEME_PREFIX @"documents://"
#define HTTP_SCHEME_PREFIX @"http://"
#define HTTPS_SCHEME_PREFIX @"https://"
#define CDVFILE_PREFIX @"cdvfile://"
#define RECORDING_WAV @"wav"

@implementation CDVAudions

@synthesize soundCache, avSession;

// Maps a url for a resource path for recording
- (NSURL*)urlForNocRecording:(NSString*)resourcePath
{
    NSURL* resourceURL = nil;
    NSString* filePath = nil;
    NSString* docsPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];

    // first check for correct extension
    if ([[resourcePath pathExtension] caseInsensitiveCompare:RECORDING_WAV] != NSOrderedSame) {
        resourceURL = nil;
        NSLog(@"Resource for recording must have %@ extension", RECORDING_WAV);
    } else if ([resourcePath hasPrefix:DOCUMENTS_SCHEME_PREFIX]) {
        // try to find Documents:// resources
        filePath = [resourcePath stringByReplacingOccurrencesOfString:DOCUMENTS_SCHEME_PREFIX withString:[NSString stringWithFormat:@"%@/", docsPath]];
        NSLog(@"Will use resource '%@' from the documents folder with path = %@", resourcePath, filePath);
    } else if ([resourcePath hasPrefix:CDVFILE_PREFIX]) {
        CDVFile *filePlugin = [self.commandDelegate getCommandInstance:@"File"];
        CDVFilesystemURL *url = [CDVFilesystemURL fileSystemURLWithString:resourcePath];
        filePath = [filePlugin filesystemPathForURL:url];
        if (filePath == nil) {
            resourceURL = [NSURL URLWithString:resourcePath];
        }
    } else {
        // if resourcePath is not from FileSystem put in tmp dir, else attempt to use provided resource path
        NSString* tmpPath = [NSTemporaryDirectory()stringByStandardizingPath];
        BOOL isTmp = [resourcePath rangeOfString:tmpPath].location != NSNotFound;
        BOOL isDoc = [resourcePath rangeOfString:docsPath].location != NSNotFound;
        if (!isTmp && !isDoc) {
            // put in temp dir
            filePath = [NSString stringWithFormat:@"%@/%@", tmpPath, resourcePath];
        } else {
            filePath = resourcePath;
        }
    }

    if (filePath != nil) {
        // create resourceURL
        resourceURL = [NSURL fileURLWithPath:filePath];
    }
    return resourceURL;
}

// Maps a url for a resource path for playing
// "Naked" resource paths are assumed to be from the www folder as its base
- (NSURL*)urlForNocPlaying:(NSString*)resourcePath
{
    NSURL* resourceURL = nil;
    NSString* filePath = nil;

    // first try to find HTTP:// or Documents:// resources

    if ([resourcePath hasPrefix:HTTP_SCHEME_PREFIX] || [resourcePath hasPrefix:HTTPS_SCHEME_PREFIX]) {
        // if it is a http url, use it
        NSLog(@"Will use resource '%@' from the Internet.", resourcePath);
        resourceURL = [NSURL URLWithString:resourcePath];
    } else if ([resourcePath hasPrefix:DOCUMENTS_SCHEME_PREFIX]) {
        NSString* docsPath = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory, NSUserDomainMask, YES)[0];
        filePath = [resourcePath stringByReplacingOccurrencesOfString:DOCUMENTS_SCHEME_PREFIX withString:[NSString stringWithFormat:@"%@/", docsPath]];
        NSLog(@"Will use resource '%@' from the documents folder with path = %@", resourcePath, filePath);
    } else if ([resourcePath hasPrefix:CDVFILE_PREFIX]) {
        CDVFile *filePlugin = [self.commandDelegate getCommandInstance:@"File"];
        CDVFilesystemURL *url = [CDVFilesystemURL fileSystemURLWithString:resourcePath];
        filePath = [filePlugin filesystemPathForURL:url];
        if (filePath == nil) {
            resourceURL = [NSURL URLWithString:resourcePath];
        }
    } else {
        // attempt to find file path in www directory or LocalFileSystem.TEMPORARY directory
        filePath = [self.commandDelegate pathForResource:resourcePath];
        if (filePath == nil) {
            // see if this exists in the documents/temp directory from a previous recording
            NSString* testPath = [NSString stringWithFormat:@"%@/%@", [NSTemporaryDirectory()stringByStandardizingPath], resourcePath];
            if ([[NSFileManager defaultManager] fileExistsAtPath:testPath]) {
                // inefficient as existence will be checked again below but only way to determine if file exists from previous recording
                filePath = testPath;
                NSLog(@"Will attempt to use file resource from LocalFileSystem.TEMPORARY directory");
            } else {
                // attempt to use path provided
                filePath = resourcePath;
                NSLog(@"Will attempt to use file resource '%@'", filePath);
            }
        } else {
            NSLog(@"Found resource '%@' in the web folder.", filePath);
        }
    }
    // if the resourcePath resolved to a file path, check that file exists
    if (filePath != nil) {
        // create resourceURL
        resourceURL = [NSURL fileURLWithPath:filePath];
        // try to access file
        NSFileManager* fMgr = [NSFileManager defaultManager];
        if (![fMgr fileExistsAtPath:filePath]) {
            resourceURL = nil;
            NSLog(@"Unknown resource '%@'", resourcePath);
        }
    }

    return resourceURL;
}

// Creates or gets the cached audio file resource object
- (CDVAudioFile*)audioNocFileForResource:(NSString*)resourcePath withId:(NSString*)mediaId doValidation:(BOOL)bValidate forRecording:(BOOL)bRecord
{
    BOOL bError = NO;
    CDVMediaError errcode = MEDIA_ERR_NONE_SUPPORTED;
    NSString* errMsg = @"";
    NSString* jsString = nil;
    CDVAudioFile* audioFile = nil;
    NSURL* resourceURL = nil;

    if ([self soundCache] == nil) {
        [self setSoundCache:[NSMutableDictionary dictionaryWithCapacity:1]];
    } else {
        audioFile = [[self soundCache] objectForKey:mediaId];
    }
    if (audioFile == nil) {
        // validate resourcePath and create
        if ((resourcePath == nil) || ![resourcePath isKindOfClass:[NSString class]] || [resourcePath isEqualToString:@""]) {
            bError = YES;
            errcode = MEDIA_ERR_ABORTED;
            errMsg = @"invalid media src argument";
        } else {
            audioFile = [[CDVAudioFile alloc] init];
            audioFile.resourcePath = resourcePath;
            audioFile.resourceURL = nil;  // validate resourceURL when actually play or record
            [[self soundCache] setObject:audioFile forKey:mediaId];
        }
    }
    if (bValidate && (audioFile.resourceURL == nil)) {
        if (bRecord) {
            resourceURL = [self urlForRecording:resourcePath];
        } else {
            resourceURL = [self urlForPlaying:resourcePath];
        }
        if (resourceURL == nil) {
            bError = YES;
            errcode = MEDIA_ERR_ABORTED;
            errMsg = [NSString stringWithFormat:@"Cannot use audio file from resource '%@'", resourcePath];
        } else {
            audioFile.resourceURL = resourceURL;
        }
    }

    if (bError) {
        jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%@);", @"cordova.require('cordova-plugin-nocsonicmedia.NocSonicMedia').onStatus", mediaId, MEDIA_ERROR, [self createMediaErrorWithCode:errcode message:errMsg]];
        [self.commandDelegate evalJs:jsString];
    }

    return audioFile;
}

// returns whether or not audioSession is available - creates it if necessary
- (BOOL)hasNocAudioSession
{
    BOOL bSession = YES;

    if (!self.avSession) {
        NSError* error = nil;

        self.avSession = [AVAudioSession sharedInstance];
        if (error) {
            // is not fatal if can't get AVAudioSession , just log the error
            NSLog(@"error creating audio session: %@", [[error userInfo] description]);
            self.avSession = nil;
            bSession = NO;
        }
    }
    return bSession;
}

// helper function to create a error object string
- (NSString*)createNocSonicMixErrorWithCode:(CDVMediaError)code message:(NSString*)message
{
    NSMutableDictionary* errorDict = [NSMutableDictionary dictionaryWithCapacity:2];

    [errorDict setObject:[NSNumber numberWithUnsignedInteger:code] forKey:@"code"];
    [errorDict setObject:message ? message:@"" forKey:@"message"];

    NSData* jsonData = [NSJSONSerialization dataWithJSONObject:errorDict options:0 error:nil];
    return [[NSString alloc] initWithData:jsonData encoding:NSUTF8StringEncoding];
}

- (void)create:(CDVInvokedUrlCommand*)command
{
    NSString* mediaId = [command argumentAtIndex:0];
    NSString* resourcePath = [command argumentAtIndex:1];

    CDVAudioFile* audioFile = [self audioFileForResource:resourcePath withId:mediaId doValidation:NO forRecording:NO];

    if (audioFile == nil) {
        NSString* errorMessage = [NSString stringWithFormat:@"Failed to initialize Media file with path %@", resourcePath];
        NSString* jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%@);", @"cordova.require('cordova-plugin-nocsonicmedia.NocSonicMedia').onStatus", mediaId, MEDIA_ERROR, [self createMediaErrorWithCode:MEDIA_ERR_ABORTED message:errorMessage]];
        [self.commandDelegate evalJs:jsString];
    } else {
        CDVPluginResult* result = [CDVPluginResult resultWithStatus:CDVCommandStatus_OK];
        [self.commandDelegate sendPluginResult:result callbackId:command.callbackId];
    }
}

- (void)loadedSonicTrack:(CDVInvokedUrlCommand*)command
{
}

- (void)startPlayingSonicLoop:(CDVInvokedUrlCommand*)command
{
}

- (BOOL)prepareToPlayNoc:(CDVAudioFile*)audioFile withId:(NSString*)mediaId
{
    BOOL bError = NO;
    return bError;
}

- (void)stopSonicLoop:(CDVInvokedUrlCommand*)command
{
}


- (void)pauseSonicLoop:(CDVInvokedUrlCommand*)command
{
}

- (void)sonicLoopRewind:(CDVInvokedUrlCommand*)command
{
}

- (void)setSonicLoopVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getSonicLoopMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)sonicLoopRelease:(CDVInvokedUrlCommand*)command
{
}

- (void)startRecordingAudio:(CDVInvokedUrlCommand*)command
{
}

- (void)startNocRecordingSession:(CDVInvokedUrlCommand*)command
{
}

- (void)stopNocRecordingSession:(CDVInvokedUrlCommand*)command
{
}

- (void)setInputAmplitude:(CDVInvokedUrlCommand*)command
{
}

- (void)getVocalInputMeter:(CDVInvokedUrlCommand*)command
{
}





- (void)playTwoTracks:(CDVInvokedUrlCommand*)command
{
}

- (void)pauseTwoTracks:(CDVInvokedUrlCommand*)command
{
}

- (void)stopTwoTracks:(CDVInvokedUrlCommand*)command
{
}

- (void)rewindTwoTracks:(CDVInvokedUrlCommand*)command
{
}

- (void)setSonicBufferTrackVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getSonicTrackMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)setNocTrackVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getNocTrackMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)deleteSonicTrackBuffer:(CDVInvokedUrlCommand*)command
{
}

- (void)deleteNocTrackBuffer:(CDVInvokedUrlCommand*)command
{
}



- (void)createMasterMix:(CDVInvokedUrlCommand*)command
{
}

- (void)playMasterMix:(CDVInvokedUrlCommand*)command
{
}

- (void)stopMasterMix:(CDVInvokedUrlCommand*)command
{
}

- (void)setMasterMixVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getMasterMixMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)setMasterMixVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getCurrentMasterMixPosition:(CDVInvokedUrlCommand*)command
{
}

- (void)deleteMasterMix:(CDVInvokedUrlCommand*)command
{
}




- (void)promoteMasterMix:(CDVInvokedUrlCommand*)command
{
}

- (void)playPromotedFile:(CDVInvokedUrlCommand*)command
{
}

- (void)pausePromotedFile:(CDVInvokedUrlCommand*)command
{
}

- (void)stopPromotedFile:(CDVInvokedUrlCommand*)command
{
}

- (void)getPromotedFilePosition:(CDVInvokedUrlCommand*)command
{
}

- (void)promotedFileSeekTo:(CDVInvokedUrlCommand*)command
{
}

- (void)setPromotedFileVolume:(CDVInvokedUrlCommand*)command
{
}

- (void)getPromotedFileMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)releasePromotedFile:(CDVInvokedUrlCommand*)command
{
}

- (void)deleteMasterFile:(CDVInvokedUrlCommand*)command
{
}




@end

@implementation CDVAudioFile

@synthesize resourcePath;
@synthesize resourceURL;
@synthesize player, volume;
@synthesize recorder;

@end
@implementation CDVAudioPlayer
@synthesize mediaId;

@end

@implementation CDVAudioRecorder
@synthesize mediaId;

@end
