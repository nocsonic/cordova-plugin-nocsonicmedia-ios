
#import <Foundation/Foundation.h>
#import <AudioToolbox/AudioServices.h>
#import <AVFoundation/AVFoundation.h>

#import <Cordova/CDVPlugin.h>

enum CDVMediaError {
    MEDIA_ERR_ABORTED = 1,
    MEDIA_ERR_NETWORK = 2,
    MEDIA_ERR_DECODE = 3,
    MEDIA_ERR_NONE_SUPPORTED = 4
};
typedef NSUInteger CDVMediaError;

enum CDVMediaStates {
    MEDIA_NONE = 0,
    MEDIA_STARTING = 1,
    MEDIA_RUNNING = 2,
    MEDIA_PAUSED = 3,
    MEDIA_STOPPED = 4
};
typedef NSUInteger CDVMediaStates;

enum CDVMediaMsg {
    MEDIA_STATE = 1,
    MEDIA_DURATION = 2,
    MEDIA_POSITION = 3,
    MEDIA_ERROR = 9
};
typedef NSUInteger CDVMediaMsg;

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
- (void)stopNocRecordingSession:(CDVInvokedUrlCommand*)command;
- (void)setInputAmplitude:(CDVInvokedUrlCommand*)command;
- (void)getVocalInputMeter:(CDVInvokedUrlCommand*)command;

// Two Track Mixing Session
- (void)playTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)pauseTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)stopTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)rewindTwoTracks:(CDVInvokedUrlCommand*)command;
- (void)setSonicBufferTrackVolume:(CDVInvokedUrlCommand*)command;
- (void)getSonicTrackMeter:(CDVInvokedUrlCommand*)command;
- (void)setNocTrackVolume:(CDVInvokedUrlCommand*)command;
- (void)getNocTrackMeter:(CDVInvokedUrlCommand*)command;
- (void)deleteSonicTrackBuffer:(CDVInvokedUrlCommand*)command;
- (void)deleteNocTrackBuffer:(CDVInvokedUrlCommand*)command;

// Master Creation Session
- (void)createMasterMix:(CDVInvokedUrlCommand*)command;
- (void)playMasterMix:(CDVInvokedUrlCommand*)command;
- (void)stopMasterMix:(CDVInvokedUrlCommand*)command;
- (void)setMasterMixVolume:(CDVInvokedUrlCommand*)command;
- (void)getMasterMixMeter:(CDVInvokedUrlCommand*)command;
- (void)getCurrentMasterMixPosition:(CDVInvokedUrlCommand*)command;
- (void)deleteMasterMix:(CDVInvokedUrlCommand*)command;

//  Master Promotion Session
- (void)promoteMasterMix:(CDVInvokedUrlCommand*)command;
- (void)playPromotedFile:(CDVInvokedUrlCommand*)command;
- (void)pausePromotedFile:(CDVInvokedUrlCommand*)command;
- (void)stopPromotedFile:(CDVInvokedUrlCommand*)command;
- (void)getPromotedFilePosition:(CDVInvokedUrlCommand*)command;
- (void)promotedFileSeekTo:(CDVInvokedUrlCommand*)command;
- (void)setPromotedFileVolume:(CDVInvokedUrlCommand*)command;
- (void)getPromotedFileMeter:(CDVInvokedUrlCommand*)command;
- (void)releasePromotedFile:(CDVInvokedUrlCommand*)command;
- (void)deleteMasterFile:(CDVInvokedUrlCommand*)command;


// Two Track Mixing Session
- (BOOL)hasNocAudioSession;

// helper methods
- (NSURL*)urlForNocRecording:(NSString*)resourcePath;
- (NSURL*)urlForNocPlaying:(NSString*)resourcePath;

- (CDVAudioMixerFile*)audioNocFileForResource:(NSString*)resourcePath withId:(NSString*)mediaId doValidation:(BOOL)bValidate forRecording:(BOOL)bRecord;
- (BOOL)prepareToPlayNoc:(CDVAudioMixerFile*)audioFile withId:(NSString*)mediaId;
- (NSString*)createNocSonicMixErrorWithCode:(CDVMediaError)code message:(NSString*)message;


@end
