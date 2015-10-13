
#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioServices.h>
#import <AVFoundation/AVFoundation.h>

#import <Cordova/CDVPlugin.h>

enum CDVNocSonicMixerError {
    MEDIA_ERR_ABORTED = 1,
    MEDIA_ERR_NETWORK = 2,
    MEDIA_ERR_DECODE = 3,
    MEDIA_ERR_NONE_SUPPORTED = 4
};
typedef NSUInteger CDVNocSonicMixerError;

enum CDVNocSonicMixerStates {
    NSMIXER_NONE                            = 0,
    NSMIXER_SONICLOOP_LOADED                = 1,
    NSMIXER_SONICLOOP_PLAYING               = 2,
    NSMIXER_SONICLOOP_PAUSED                = 3,
    NSMIXER_SONICLOOP_STOPPED               = 4,
    NSMIXER_SONICLOOP_REWIND                = 5,
    NSMIXER_SONICLOOP_VOLUME                = 6,
    NSMIXER_SONICLOOP_RELEASE               = 7,

    NSMIXER_RECORDSESSION_READY             = 8,
    NSMIXER_RECORDSESSION_STARTED           = 9,
    NSMIXER_RECORDSESSION_IN_PROGESS        = 10,
    NSMIXER_RECORDSESSION_STOPPED           = 11,
    NSMIXER_RECORDSESSION_INPUTVOLUME       = 12,

    NSMIXER_MIXINGSESSION_READY             = 13,
    NSMIXER_MIXINGSESSION_PLAYING           = 14,
    NSMIXER_MIXINGSESSION_PAUSED            = 15,
    NSMIXER_MIXINGSESSION_STOPPED           = 16,
    NSMIXER_MIXINGSESSION_REWIND            = 17,
    NSMIXER_MIXINGSESSION_SONICVOLUME       = 18,
    NSMIXER_MIXINGSESSION_NOCVOLUME         = 19,
    NSMIXER_MIXINGSESSION_DESTROYSONIC      = 21,
    NSMIXER_MIXINGSESSION_RELEASESONIC      = 22,
    NSMIXER_MIXINGSESSION_DESTROYNOC        = 23,
    NSMIXER_MIXINGSESSION_RELEASENOC        = 24,
    NSMIXER_MIXINGSESSION_REMOVEDITS        = 25,
    NSMIXER_MIXINGSESSION_MERGE             = 26,

    NSMIXER_MASTERMIX_READY                 = 27,
    NSMIXER_MASTERMIX_PLAYING               = 28,
    NSMIXER_MASTERMIX_PAUSED                = 29,
    NSMIXER_MASTERMIX_STOPPED               = 30,
    NSMIXER_MASTERMIX_DELETE                = 31,
    NSMIXER_MASTERMIX_VOLUME                = 32,
    NSMIXER_MASTERMIX_SEEK_POSITION         = 33,
    NSMIXER_MASTERMIX_RELEASE               = 34,
    NSMIXER_MASTERMIX_PROMOTE_TO_FILE       = 35,

    NSMIXER_PROMOTEDFILE_READY              = 36,
    NSMIXER_PROMOTEDFILE_PLAYING            = 37,
    NSMIXER_PROMOTEDFILE_PAUSED             = 38,
    NSMIXER_PROMOTEDFILE_STOPPED            = 39,
    NSMIXER_PROMOTEDFILE_VOLUME             = 40,
    NSMIXER_PROMOTEDFILE_SEEK_POSITION      = 41,
    NSMIXER_PROMOTEDFILE_DELETE             = 42,
    NSMIXER_PROMOTEDFILE_RELEASE            = 43,
    NSMIXER_PROMOTEDFILE_LOCATION           = 44,
};

typedef NSUInteger CDVNocSonicMixerStates;

enum CDVNocSonicMixeMsg {
    NSMIXER_STATE = 1,
    NSMIXER_SONICLOOP_VU_METER= 2,
    NSMIXER_VOCALINPUT_VU_METER = 3,
    NSMIXER_NOCTRACK_VU_METER = 4,
    NSMIXER_SONICTRACK_VU_METER = 5,
    NSMIXER_MASTERMIX_VU_METER = 6,
    NSMIXER_MASTERMIX_POSITION = 7,
    NSMIXER_MASTERMIX_DURATION = 8,
    NSMIXER_PROMOTEDFILE_VU_METER = 9,
    NSMIXER_PROMOTEDFILE_DURATION = 10,
    NSMIXER_PROMOTEDFILE_POSITION = 11,
    NSMIXER_PROMOTEDFILE_PATH = 12,
    NSMIXER_ERROR = 99,
};

typedef NSUInteger CDVNocSonicMixeMsg;

@interface CDVAudioMixerPlayer : AVAudioPlayer
{
    NSString* mediaId;
}
@property (nonatomic, copy) NSString* mediaId;
@end

@interface CDVAudioMixerRecorder : AVAudioRecorder
{
}
@property (nonatomic, copy) NSString* mediaId;
@end

@interface CDVAudioMixerFile : NSObject
{
}

@property (nonatomic, strong) NSString* resourcePath;
@property (nonatomic, strong) NSURL* resourceURL;
@property (nonatomic, strong) CDVAudioMixerPlayer* player;
@property (nonatomic, strong) NSNumber* volume;

@property (nonatomic, strong) CDVAudioMixerRecorder* recorder;

@end

@interface CDVAudions : CDVPlugin <AVAudioPlayerDelegate, AVAudioRecorderDelegate>
{
}
@property (nonatomic, strong) NSMutableDictionary* soundCache;
@property (nonatomic, strong) AVAudioSession* avSession;

//rythym selector
- (void)loadedSonicTrack:(CDVInvokedUrlCommand*)command;
- (void)startPlayingSonicLoop:(CDVInvokedUrlCommand*)command;
- (void)pauseSonicLoop:(CDVInvokedUrlCommand*)command;
- (void)stopSonicLoop:(CDVInvokedUrlCommand*)command;
- (void)sonicLoopRewind:(CDVInvokedUrlCommand*)command;
- (void)setSonicLoopVolume:(CDVInvokedUrlCommand*)command;
- (void)getSonicLoopMeter:(CDVInvokedUrlCommand*)command;
- (void)sonicLoopRelease:(CDVInvokedUrlCommand*)command;

//Recording Session View
- (void)startNocRecordingSession:(CDVInvokedUrlCommand*)command;
- (void)startRecordingAudio:(CDVInvokedUrlCommand*)command;
- (void)stopNocRecordingSession:(CDVInvokedUrlCommand*)command;
- (void)setInputAmplitude:(CDVInvokedUrlCommand*)command;
- (void)getVocalInputMeter:(CDVInvokedUrlCommand*)command;

// 2 Track Mixing Session
- (void)start2TrackMixingSession:(CDVInvokedUrlCommand*)command;
- (void)playTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)pauseTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)stopTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)rewindTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)setSonicBufferTrackVolume:(CDVInvokedUrlCommand*)command;
- (void)getSonicTrackMeter:(CDVInvokedUrlCommand*)command;
- (void)setNocBufferTrackVolume:(CDVInvokedUrlCommand*)command;
- (void)getNocTrackMeter:(CDVInvokedUrlCommand*)command;
- (void)deleteSonicTrackBuffer:(CDVInvokedUrlCommand*)command;
- (void)releaseSonicTrackBuffer:(CDVInvokedUrlCommand*)command;
- (void)deleteNocTrackBuffer:(CDVInvokedUrlCommand*)command;
- (void)releaseNocTrackBuffer:(CDVInvokedUrlCommand*)command;
- (void)removeNocSonicMidiEdits:(CDVInvokedUrlCommand*)command;
- (void)mergeNocSonicMidiEdits:(CDVInvokedUrlCommand*)command;

// Master Creation Session
- (void)startMasterMixSession:(CDVInvokedUrlCommand*)command;
- (void)playMasterMix:(CDVInvokedUrlCommand*)command;
- (void)pauseMasterMix:(CDVInvokedUrlCommand*)command;
- (void)stopMasterMix:(CDVInvokedUrlCommand*)command;
- (void)setMasterMixVolume:(CDVInvokedUrlCommand*)command;
- (void)getMasterMixMeter:(CDVInvokedUrlCommand*)command;
- (void)getCurrentMasterMixPosition:(CDVInvokedUrlCommand*)command;
- (void)deleteMasterMix:(CDVInvokedUrlCommand*)command;
- (void)releaseMasterMix:(CDVInvokedUrlCommand*)command;
- (void)promoteMasterMix:(CDVInvokedUrlCommand*)command;

//  Master Promotion Session
- (void)startPromotedFileSession:(CDVInvokedUrlCommand*)command;
- (void)playPromotedFile:(CDVInvokedUrlCommand*)command;
- (void)pausePromotedFile:(CDVInvokedUrlCommand*)command;
- (void)stopPromotedFile:(CDVInvokedUrlCommand*)command;
- (void)getPromotedFilePosition:(CDVInvokedUrlCommand*)command;
- (void)promotedFileSeekTo:(CDVInvokedUrlCommand*)command;
- (void)setPromotedFileVolume:(CDVInvokedUrlCommand*)command;
- (void)getPromotedFileMeter:(CDVInvokedUrlCommand*)command;
- (void)releasePromotedFile:(CDVInvokedUrlCommand*)command;
- (void)deletePromotedFile:(CDVInvokedUrlCommand*)command;
- (void)getPromotedFileLocation:(CDVInvokedUrlCommand*)command;


// Two Track Mixing Session
- (BOOL)hasNocAudioSession;

// helper methods
- (NSURL*)urlForNocRecording:(NSString*)resourcePath;
- (NSURL*)urlForNocPlaying:(NSString*)resourcePath;

- (CDVAudioMixerFile*)audioNocFileForResource:(NSString*)resourcePath withId:(NSString*)mediaId doValidation:(BOOL)bValidate forRecording:(BOOL)bRecord;
- (BOOL)prepareToPlayNoc:(CDVAudioMixerFile*)audioFile withId:(NSString*)mediaId;
- (NSString*)createNocSonicMixErrorWithCode:(CDVNocSonicMixerError)code message:(NSString*)message;


@end
