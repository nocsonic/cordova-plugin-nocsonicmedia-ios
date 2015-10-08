
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
    return resourceURL;
}

// Maps a url for a resource path for playing
// "Naked" resource paths are assumed to be from the www folder as its base
- (NSURL*)urlForNocPlaying:(NSString*)resourcePath
{
    NSURL* resourceURL = nil;

    return resourceURL;
}

// Creates or gets the cached audio file resource object
- (CDVAudioMixerFile*)audioNocFileForResource:(NSString*)resourcePath withId:(NSString*)mediaId doValidation:(BOOL)bValidate forRecording:(BOOL)bRecord
{
    CDVAudioMixerFile* audioFile = nil;
    return audioFile;
}

// returns whether or not audioSession is available - creates it if necessary
- (BOOL)hasNocAudioSession
{
    BOOL bSession = YES;
    return bSession;
}

// helper function to create a error object string
- (NSString*)createNocSonicMixErrorWithCode:(CDVNocSonicMixerError)code message:(NSString*)message
{
    NSString* someValue = nil;
    return someValue;
}

- (void)create:(CDVInvokedUrlCommand*)command
{
}

- (void)loadedSonicTrack:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    BOOL loadedState     = YES;
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_LOADED];
    [self.commandDelegate evalJs:jsString];
}

- (void)startPlayingSonicLoop:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    BOOL loadedState     = YES;
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_PLAYING];
    [self.commandDelegate evalJs:jsString];
}

- (BOOL)prepareToPlayNoc:(CDVAudioMixerFile*)audioFile withId:(NSString*)mediaId
{
    BOOL bError = NO;
    return bError;
}

- (void)stopSonicLoop:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    BOOL loadedState     = YES;
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_STOPPED];
    [self.commandDelegate evalJs:jsString];
}


- (void)pauseSonicLoop:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    BOOL loadedState     = YES;
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_PAUSED];
    [self.commandDelegate evalJs:jsString];
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

@implementation CDVAudioMixerFile

@synthesize resourcePath;
@synthesize resourceURL;
@synthesize player, volume;
@synthesize recorder;

@end
@implementation CDVAudioMixerPlayer
@synthesize mediaId;

@end

@implementation CDVAudioMixerRecorder
@synthesize mediaId;

@end
