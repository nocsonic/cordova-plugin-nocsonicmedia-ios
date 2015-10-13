
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




// ---------------------------------------------------------------------
//
//    RHYTHYM - SELECTION
//
// ---------------------------------------------------------------------

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
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* rwString   = @"sonicLoopRewind-invoked";
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_REWIND];
    [self.commandDelegate evalJs:jsString];
}

- (void)setSonicLoopVolume:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    BOOL loadedState     = YES;
    NSString* volString   = @"setSonicLoopVolume-Change";
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_VOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getSonicLoopMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)sonicLoopRelease:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_SONICLOOP_RELEASE];
    [self.commandDelegate evalJs:jsString];
}



// ---------------------------------------------------------------------
//
//    REDCORDING - STUDIO
//
// ---------------------------------------------------------------------

- (void)startNocRecordingSession:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_RECORDSESSION_READY];
    [self.commandDelegate evalJs:jsString];
}

- (void)startRecordingAudio:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_RECORDSESSION_STARTED];
    [self.commandDelegate evalJs:jsString];
}


- (void)stopNocRecordingSession:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_RECORDSESSION_STOPPED];
    [self.commandDelegate evalJs:jsString];
}

- (void)setInputAmplitude:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_RECORDSESSION_INPUTVOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getVocalInputMeter:(CDVInvokedUrlCommand*)command
{
}




// ---------------------------------------------------------------------
//
//    2TRACK- MIXING
//
// ---------------------------------------------------------------------

- (void)start2TrackMixingSession:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_READY];
    [self.commandDelegate evalJs:jsString];
}



- (void)playTwoTracks:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_PLAYING];
    [self.commandDelegate evalJs:jsString];
}

- (void)pauseTwoTracks:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_PAUSED];
    [self.commandDelegate evalJs:jsString];
}

- (void)stopTwoTracks:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_STOPPED];
    [self.commandDelegate evalJs:jsString];
}

- (void)rewindTwoTracks:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_REWIND];
    [self.commandDelegate evalJs:jsString];
}

- (void)setSonicBufferTrackVolume:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_SONICVOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getSonicTrackMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)setNocBufferTrackVolume:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_NOCVOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getNocTrackMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)deleteSonicTrackBuffer:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_DESTROYSONIC];
    [self.commandDelegate evalJs:jsString];
}


- (void)releaseSonicTrackBuffer:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_RELEASESONIC];
    [self.commandDelegate evalJs:jsString];
}

- (void)deleteNocTrackBuffer:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_DESTROYNOC];
    [self.commandDelegate evalJs:jsString];
}

- (void)releaseNocTrackBuffer:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_RELEASENOC];
    [self.commandDelegate evalJs:jsString];
}


- (void)removeNocSonicMidiEdits:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_REMOVEDITS];
    [self.commandDelegate evalJs:jsString];
}

- (void)mergeNocSonicMidiEdits:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_MERGE];
    [self.commandDelegate evalJs:jsString];
}


// ---------------------------------------------------------------------
//
//    MASTER MIX CREATION AND PLAYBACK
//
// ---------------------------------------------------------------------


- (void)startMasterMixSession:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_READY];
    [self.commandDelegate evalJs:jsString];
}

- (void)playMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MIXINGSESSION_PLAYING];
    [self.commandDelegate evalJs:jsString];
}

- (void)pauseMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_PAUSED];
    [self.commandDelegate evalJs:jsString];
}

- (void)stopMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_STOPPED];
    [self.commandDelegate evalJs:jsString];
}

- (void)setMasterMixVolume:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_VOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getMasterMixMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)getCurrentMasterMixPosition:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_POSITION];
    [self.commandDelegate evalJs:jsString];
}

- (void)deleteMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_DELETE];
    [self.commandDelegate evalJs:jsString];
}



- (void)releaseMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_RELEASE];
    [self.commandDelegate evalJs:jsString];
}



- (void)promoteMasterMix:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_MASTERMIX_PROMOTE_TO_FILE];
    [self.commandDelegate evalJs:jsString];
}



// ---------------------------------------------------------------------
//
//     PROMOTED MASTER FILE CREATION AND PLAYBACK
//
// ---------------------------------------------------------------------

- (void)startPromotedFileSession:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_READY];
    [self.commandDelegate evalJs:jsString];
}

- (void)playPromotedFile:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_PLAYING];
    [self.commandDelegate evalJs:jsString];
}

- (void)pausePromotedFile:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_PAUSED];
    [self.commandDelegate evalJs:jsString];
}

- (void)stopPromotedFile:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_STOPPED];
    [self.commandDelegate evalJs:jsString];
}

- (void)getPromotedFilePosition:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_POSITION];
    [self.commandDelegate evalJs:jsString];
}


- (void)setPromotedFileVolume:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_VOLUME];
    [self.commandDelegate evalJs:jsString];
}

- (void)getPromotedFileMeter:(CDVInvokedUrlCommand*)command
{
}

- (void)releasePromotedFile:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_RELEASE];
    [self.commandDelegate evalJs:jsString];
}

- (void)deleteMasterFile:(CDVInvokedUrlCommand*)command
{
    NSString* callbackId = command.callbackId;
    NSString* mediaId    = [command argumentAtIndex:0];
    NSString* jsString   = nil;
    jsString = [NSString stringWithFormat:@"%@(\"%@\",%d,%d);", @"cordova.require('cordova-plugin-nocsonicmedia-ios.NocSonicMixer').onStatus", mediaId, NSMIXER_STATE, NSMIXER_PROMOTEDFILE_DELETE];
    [self.commandDelegate evalJs:jsString];
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
