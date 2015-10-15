/*
 *
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 *
*/

var argscheck = require('cordova/argscheck'),
    utils = require('cordova/utils'),
    exec = require('cordova/exec');

var nocMixObject = { };
/**
 * _sonicSrc:  Url or File used to create looping beat if user has decided to have one
 * _sonicBuffer:byteArray; (Beat track)3
 * _sonicGain: number; floating point current level of Volume  (0-1);
 *
 *
 *
 *  _nocTitle:  Name the user has given to this creation
 * _nocBuffer:byteArray;   (Vocal track)
 * _nocGain: Number; floating point mixerLevel of Volume duriong  Playback PlayBack  (0-1);
 *
 *
 * */

var NocSonicMixer = function(successCallback, errorCallback, statusCallback){
   // should check to delete if one is already created
     this.id = utils.createUUID();
     nocMixObject[this.id]       =  this;
     this._sonicSrc              =  '';
     this._nocSrc                =  '';
     this._sonicLoopMeter        =  {left:-1, right:-1};
     this._vocalInputMeter       =  {left:-1, right:-1};
     this._nocTrackMeter         =  {left:-1, right:-1};
     this._sonicTrackMeter       =  {left:-1, right:-1};
     this._masterMixMeter        =  {left:-1, right:-1};
     this._masterMixPosition     =  -1;
     this._masterMixDuration     =  -1;
     this._promotedFileMeter     =  {left:-1, right:-1};
     this._promotedFilePosition  =  -1;
     this._promotedFileDuration  =  -1;
     this._promotedFileLocation  =  null;
     this.successCallback        =  successCallback;
     this.errorCallback          =  errorCallback;
     this.statusCallback         =  statusCallback;

     exec(null, this.errorCallback, "NocSonicMixer", "create", [this.id]);
}


// NocSonicMixer messages
NocSonicMixer.NSMIXER_STATE = 1;
NocSonicMixer.NSMIXER_SONICLOOP_VU_METER= 2;
NocSonicMixer.NSMIXER_VOCALINPUT_VU_METER = 3;
NocSonicMixer.NSMIXER_NOCTRACK_VU_METER = 4;
NocSonicMixer.NSMIXER_SONICTRACK_VU_METER = 5;
NocSonicMixer.NSMIXER_MASTERMIX_VU_METER = 6;
NocSonicMixer.NSMIXER_MASTERMIX_POSITION = 7;
NocSonicMixer.NSMIXER_MASTERMIX_DURATION = 8;
NocSonicMixer.NSMIXER_PROMOTEDFILE_VU_METER = 9;
NocSonicMixer.NSMIXER_PROMOTEDFILE_DURATION = 10;
NocSonicMixer.NSMIXER_PROMOTEDFILE_POSITION = 11;
NocSonicMixer.NSMIXER_PROMOTEDFILE_PATH = 12;

NocSonicMixer.NSMIXER_ERROR = 99;

// NocSonicMixer states
NocSonicMixer.NSMIXER_NONE                            = 0;
NocSonicMixer.NSMIXER_SONICLOOP_LOADED                = 1;
NocSonicMixer.NSMIXER_SONICLOOP_PLAYING               = 2;
NocSonicMixer.NSMIXER_SONICLOOP_PAUSED                = 3;
NocSonicMixer.NSMIXER_SONICLOOP_STOPPED               = 4;
NocSonicMixer.NSMIXER_SONICLOOP_REWIND                = 5;
NocSonicMixer.NSMIXER_SONICLOOP_VOLUME                = 6;
NocSonicMixer.NSMIXER_SONICLOOP_RELEASE               = 7;

NocSonicMixer.NSMIXER_RECORDSESSION_READY             = 8;
NocSonicMixer.NSMIXER_RECORDSESSION_STARTED           = 9;
NocSonicMixer.NSMIXER_RECORDSESSION_IN_PROGESS        = 10;
NocSonicMixer.NSMIXER_RECORDSESSION_STOPPED           = 11;
NocSonicMixer.NSMIXER_RECORDSESSION_INPUTVOLUME       = 12;

NocSonicMixer.NSMIXER_MIXINGSESSION_READY             = 13;
NocSonicMixer.NSMIXER_MIXINGSESSION_PLAYING           = 14;
NocSonicMixer.NSMIXER_MIXINGSESSION_PAUSED            = 15;
NocSonicMixer.NSMIXER_MIXINGSESSION_STOPPED           = 16;
NocSonicMixer.NSMIXER_MIXINGSESSION_REWIND            = 17;
NocSonicMixer.NSMIXER_MIXINGSESSION_NOCVOLUME         = 19;
NocSonicMixer.NSMIXER_MIXINGSESSION_SONICVOLUME       = 20;
NocSonicMixer.NSMIXER_MIXINGSESSION_DESTROYSONIC      = 21;
NocSonicMixer.NSMIXER_MIXINGSESSION_RELEASESONIC      = 22;
NocSonicMixer.NSMIXER_MIXINGSESSION_DESTROYNOC        = 23;
NocSonicMixer.NSMIXER_MIXINGSESSION_RELEASENOC        = 24;
NocSonicMixer.NSMIXER_MIXINGSESSION_REMOVEDITS        = 25;
NocSonicMixer.NSMIXER_MIXINGSESSION_MERGE             = 26;

NocSonicMixer.NSMIXER_MASTERMIX_READY                 = 27;
NocSonicMixer.NSMIXER_MASTERMIX_PLAYING               = 28;
NocSonicMixer.NSMIXER_MASTERMIX_PAUSED                = 29;
NocSonicMixer.NSMIXER_MASTERMIX_STOPPED               = 30;
NocSonicMixer.NSMIXER_MASTERMIX_DELETE                = 31;
NocSonicMixer.NSMIXER_MASTERMIX_VOLUME                = 32;
NocSonicMixer.NSMIXER_MASTERMIX_POSITION              = 33;
NocSonicMixer.NSMIXER_MASTERMIX_RELEASE               = 34;
NocSonicMixer.NSMIXER_MASTERMIX_PROMOTE_TO_FILE       = 35;

NocSonicMixer.NSMIXER_PROMOTEDFILE_READY              = 36;
NocSonicMixer.NSMIXER_PROMOTEDFILE_PLAYING            = 37;
NocSonicMixer.NSMIXER_PROMOTEDFILE_PAUSED             = 38;
NocSonicMixer.NSMIXER_PROMOTEDFILE_STOPPED            = 39;
NocSonicMixer.NSMIXER_PROMOTEDFILE_VOLUME             = 40;
NocSonicMixer.NSMIXER_PROMOTEDFILE_POSITION           = 41;
NocSonicMixer.NSMIXER_PROMOTEDFILE_DELETE             = 42;
NocSonicMixer.NSMIXER_PROMOTEDFILE_RELEASE            = 43;
NocSonicMixer.NSMIXER_PROMOTEDFILE_FILELOCATION       = 44;


NocSonicMixer.MEDIA_MSG = ["None",
                           "SonicLoopLoaded",
                           "SonicLoopPlaying",
                           "SonicLoopPaused",
                           "SonicLoopStopped",
                           "SonicLoopRewind",
                           "SonicLoopVolume",
                           "SonicLoopRelease",
                           "RecordingSessionReady",
                           "RecordingSessionStarted",
                           "RecordingSessionInProgress",
                           "RecordingSessionStopped",
                           "RecordingSessionInputVolume",
                           "MixingSessionReady",
                           "MixingSessionPlaying",
                           "MixingSessionPaused",
                           "MixingSessionStopped",
                           "MixingSessionRewind",
                           "MixingSessionSonicVolumeChange",
                           "MixingSessionNocVolumeChange",
                           "MixingSessionDestroySonic",
                           "MixingSessionReleaseSonic",
                           "MixingSessionDestroyNoc",
                           "MixingSessionReleaseNoc",
                           "MixingSessionRemoveEdits",
                           "MixingSessionMerge",
                           "MasterMixReady",
                           "MasterMixPlaying",
                           "MasterMixPaused",
                           "MasterMixStopped",
                           "MasterMixDelete",
                           "MasterMixVolume",
                           "MasterMixPosition",
                           "MasterMixRelease",
                           "MasterMixPromoteToFile",
                           "PromotedFileReady",
                           "PromotedFilePlaying",
                           "PromotedFilePaused",
                           "PromotedFileStopped",
                           "PromotedFileVolume",
                           "PromotedFilePosition",
                           "PromotedFileDelete",
                           "PromotedFileRelease",
                           "PromotedFileLocation"
                           ];




/**
 *       NOTES: Return State of Mix
 *
 *       getStateOfMixer();
 */



// "static" function to return existing objs.
NocSonicMixer.get = function(id) {
    return nocMixObject[id];
};



/**
 *     Rhythym Selection  Session
 *
 *
 * */





/**
 *     NOTES: If user has called this function the file supplied by the sonicSrc, should be download into
 *     and audio buffer, from where it will be played in a loop, the duration of the audio should be
 *     no longer than 30 seconds.
 *
 *      @param sonicSrc                  most often will represent a url path to a file previousl downloaded,
 *                                  thus residing with in the system app directory,  but should be able
 *                                  to work with remote (external url as well)
 *
 *      @param errorCallback        The callback to be called if there is an error.
 *                                  errorCallback(int errorCode)
 *
 *      @param statusCallback       The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode)
 *
 *      loadSonic(url, successCallback, errorCallback,statusCallback)
 *
 */


NocSonicMixer.prototype.loadSonic = function(sonicSrc) {
    if(this._sonicSrc){
        //release all current resources used for sonicSrc
    }
    this._sonicSrc        =  sonicSrc;
    this._sonicLoopMeter =  {left:-1, right:-1};
    console.log('[NocSonicMixer.prototype.loadSonic ---- sonicSrc ='+sonicSrc);
    exec(this.successCallback, this.errorCallback, "NocSonicMixer", "loadedSonicTrack", [this.id, this._sonicSrc]);
};


/**
 *     NOTES: This function should begin playing the beat in a loop from the audio buffer that it has been
 *     loaded into. If the Buffer has not been loaded it should return and ErrorCode (), the Gain (Volume
 *     level should begin at .75
 *      options is simple Object{
 *          loop:true  //  by default this true unless explicitly set to FALSE, if not present it is TRUE
 *          gainAmount: .75  // volume level
 *          playAudioWhenScreenIsLocked default = true;
 *      }
 *
 *      playSonicLoop();
 */

NocSonicMixer.prototype.playSonicLoop = function(options) {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "startPlayingSonicLoop", [this.id, this._sonicSrc, options]);
};


/**
 *     NOTES: Pause play back of Sonic Loop, if  Recording (audio capturing) in progess do not stop,
 *            the Recording, simply set Gain Amount to mute
 *
 */


NocSonicMixer.prototype.pauseSonicLoop = function() {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "pauseSonicLoop", [this.id,  this._sonicSrc]);
};




/**
 *     NOTES: Stop play back of Sonic Loop occurs, this will either occur before
 *     user begins a record session and means that the user has choosen to record without a beat Accapella or
 *     the user has stopped a looping beat because the no longer want to hear it and are possibly deciding on
 *     another beat.
 *     a) Stopping a sonic Loop will only occur in "rhythm selection" view
 *     b) Stopping a sonic Loop will be trigger by selecting acapella
 *
 *     stopSonicLoop();
 *
 * */

NocSonicMixer.prototype.stopSonicLoop = function() {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "stopSonicLoop", [this.id], 0);
};




/**
 * NOTES: Currently this will be used to send user back to beginning of a sonic clip,
 * and start the Looping over again. The distinction between "stopSonicLoop" and
 *  "sonicLoopRewind" is that when "sonicLoopRewind" occurs the playback of a loop will not stop
 *
 *
 * Seek or jump to a new time in the track..
 */
NocSonicMixer.prototype.sonicLoopRewind = function() {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "sonicLoopRewind", [this.id, 0]);
};

 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param sonicLoopGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      setSonicLoopVolume(sonicLoopGain);
 */


NocSonicMixer.prototype.setSonicLoopVolume = function(sonicLoopGain) {
    exec(this.successCallback, this.errorCallback,  "NocSonicMixer", "setSonicLoopVolume", [this.id, sonicLoopGain]);
};



/**
 *       NOTES:Audio Graph displaying levels of Audio Amplitude..
 *       turns on event status issuing
 *       broadcastLevelOfSonicMeter()
 *
 *       http://lovingod.host.sk/iphone/developers/avmeter_colon_build_a_vu_meter.html
 *
 *
 *       https://github.com/YogendraSharma2007/android-spl-meter
 *       https://github.com/AdFabConnect/ViewMeterCordova
 *
 *      https://msdn.microsoft.com/en-us/library/windows/apps/windows.media.audio.aspx
 *      https://github.com/Microsoft/Windows-universal-samples/tree/master/Samples/AudioCreation
 *      https://msdn.microsoft.com/en-us/library/windows/apps/mt203787.aspx
 *      https://channel9.msdn.com/coding4fun/articles/NET-Voice-Recorder
 *      https://github.com/Microsoft/audio-recorder
 *
 *      https://github.com/Microsoft/audio-recorder/blob/master/AudioRecorder/MainPage.xaml.cs
 *      //
 *
 */

NocSonicMixer.prototype.getSonicLoopMeter = function(success, fail) {
    var me = this;
  exec(function(sonicLoopMeter) {
            me._sonicLoopMeter = sonicLoopMeter;
            success(sonicLoopMeter);
            },
            fail, "NocSonicMixer", "getSonicLoopMeter", [this.id]);
};



/**
 * Release the resources.
 * if Neccessary
 */
NocSonicMixer.prototype.sonicLoopRelease = function() {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "sonicLoopRelease", [this.id]);
};




/**
 *     Recording Session View
 *
 *
 * */

 /**
 *      NOTES: Audio Capture from device input (with or without microphone) and, if it exist, the current looping
 *             sonic.
 *
 *      a)  Simultaneoulsy, (using native Audio Api sequencer, audio manager, etc) begin capturing audio from microphone
 *            (may be external headset with microphone, or just the native device microphone) and write into Vocal Track Buffer
 *             and
 *             If current looping beat exist (even if it has been paused) begin to write into a sonic Beat Buffer
 *             from its current position ( thus, the beat should not be forced to start at the zero position, looping beat will
 *             not exist if audioLoop has been stopped... this means that a user has choosen Acapella );
 *
 *             - two Distinct Buffers Created    Vocal Track Buffer  and Sonic Track Buffer
 *             - begin writing to both Buffers  at the same time...even if the sonicLoop is PAUSED or
 *               even if the user is silent (has not began Vocalizing)
 *             - Sample data that is being written to each buffer should be done with 16 bit PCM, (stereo)
 *
 *      c) If stopTime has NOT been set, the recording stop automatically after 31 seconds, the maximum amount of recording time
 *            is 45 seconds and should only be set to that amount of time by the   @param stopTime
 *           - BEAT stops playing and stops writing to Sonic Track Buffer
 *           - MIC or input Device Is closed(prevented from capturing) and stop writing to Vocal Track Buffer
 *           
 *
 *      d) Hopefully the state of the sonicLoop can be deduced from the native code implementation, however, if you 
 *         find that it neccessary to pass the state, it can be added to the function call by getting state locally 
 *      
 *      
 *      e) During a recording Session if the user play back is interrupted by a phone call.. 
 *      
 *          -- looping sonic audio should stop... if Sonic Audio that is being looped is using separate buffer ( NOT the
 *             Sonic Track Buffer) than there is no need to delete this buffer.
 *          -- any buffers created specfically for capturing should be deleted and memory released
 *
 *      
 *
 *      @param minCaptureTime:number; //milliseconds, default 5 seconds(5000)
 *      @param maxCaputreTime:number;   //milliseconds, default 31 seconds (31000)
 *      @param decayCaptureTime:number; //milliseconds, default 3 seconds (3000)
 *      @param syncTwoTrackCapture:bool;   // default true, when "true", while writing cautred audio from input device stops writing to
  *                                Vocal Track Buffer, writing sonicLoop samples to Sonic Track Buffer does
  *                                not stop until softStopTime has elapsed.
  *                                -- If the amount of time left for recordings is less than 3 seconds, then stops writing to
  *                                Vocal Track Buffer, but continue to write to Sonic Track Buffer for time remaining.
 *
 *      startNocRecordingSession(minCaptureTime, stopTime, softStopTime, syncStop);
 */


NocSonicMixer.prototype.startNocRecordingSession = function (options) {
    this._nocSrc = options.nocSrc;
   exec(this.successCallback, this.errorCallback,  "NocSonicMixer", "startNocRecordingSession", [this.id, options]);
};



/**
*       Start clock
*
*/


NocSonicMixer.prototype.startRecordingAudio = function (){
   exec(this.successCallback, this.errorCallback,  "NocSonicMixer", "startRecordingAudio", [this.id]);
}

/**
 *      NOTES: Just as would happen if the default 31 seconds elapsed, device stops capturing all audio from device
 *             inputs, and stops writing to the Vocal Track Buffer and Sonic Track Buffer, release any allocated memory
 *             ...retain sampled buffer data unless deleter or clear is determined to be necessary.
 *
 *             -- if stopNocRecordingSession() is executed before "minCaptureTime" (5 seconds) has occurred..
 *                   !!! the "softStopTime" should encompass the "minCaptureTime", it is dependent on the
 *                   amount of time that elapsed since the startNocRecordingSession() has been called.
 *
 *                  * Unless sonicLoop has been paused it does not stop playing, but does stop writing to
 *                    Sonic Track Buffer and the Buffer is cleared
 *                  * Stop Writing to Vocal Track Buffer and Buffer is cleared
 *                  * Message Event Status is broadcast informing that the 5 second limit was not met
 *
 *
 *             --  when "stopNocRecordingSession()" is called, by default 'syncStop' should be true, which
 *                 signals that the writing to the Sonic Track Buffer should not stop until "softStopTime"
 *                 (default 3000 milliseconds) has elapsed.
 *
 *             --
 *
 *
 * */


NocSonicMixer.prototype.stopNocRecordingSession = function() {
   exec(this.successCallback, this.errorCallback,  "NocSonicMixer", "stopNocRecordingSession", [this.id]);
};



 /**
 *     NOTES: the amplitude (Volume) level should begin at .75, the volume of input coming in
 *
 *      @param  inputGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *
 */

NocSonicMixer.prototype.setInputAmplitude= function(inputAmplitude) {
   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "setInputAmplitude", [this.id, inputAmplitude]);
};


/**
  *      ---While not expressed as separate function the ability to change the volume of the sonicLoop
  *         will be available to user
 *
 *       --The level of audio peak of the sonicLoop should also continue to be broadcast
 *
 *       TODO# Does the audio peak broadcast during a record session need to be represented in a different
 *       during capturing of audio
**/


/**
 *       NOTES:Level of Audio being Capture from Input
 *
 *
 *       event return volume levels
 *
 *
 */

NocSonicMixer.prototype.getVocalInputMeter = function(success, fail) {
    var me = this;
  /*exec(function(vocalInputMeter) {
            me._vocalInputMeter = vocalInputMeter;
            success(vocalInputMeter);
            },
            fail, "NocSonicMixer", "getVocalInputMeter", [this.id]);*/
};





/**
 *     Two Track Mixing Session
 *
 *
 * */




/*
*     NOTES:Clone buffer(s) created during recording session.
*
*
*
*/

NocSonicMixer.prototype.start2TrackMixingSession = function(){
   exec(this.successCallback, this.errorCallback,  "NocSonicMixer", "start2TrackMixingSession", [this.id]);
};


/**
 *     NOTES: Simultaneously play audio back from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *       -- set both Vocal Track Buffer and  Sonic Track Buffer position to 0
 *       -- begin playing both Vocal Track Buffer and  Sonic Track Buffer  tacks simultaneously
 *
 */

NocSonicMixer.prototype.playTwoTracks = function() {
 exec(this.successCallback, this.errorCallback, "NocSonicMixer",  "playTwoTracks", [this.id]);
};




/**
 *     NOTES: Simultaneously pause audio from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *       -- simultaneously pause both Vocal Track Buffer and  Sonic Track Buffer  from playing
 *
 */

NocSonicMixer.prototype.pauseTwoTracks = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "pauseTwoTracks", [this.id]);
};



/**
 *     NOTES: Stop audio from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *       -- both buffer positions are set back to zero
 *
 */

NocSonicMixer.prototype.stopTwoTracks = function() {
 exec(this.successCallback, this.errorCallback, "NocSonicMixer",  "stopTwoTracks", [this.id]);
};



/**
 *     NOTES: Simultaneously rewind audio both Buffers back to 0(zero) and begin palying
 *
 */

NocSonicMixer.prototype.rewindTwoTracks = function() {

 exec(this.successCallback, this.errorCallback, "NocSonicMixer", "rewindTwoTracks", [this.id]);
};




 /**
 *     NOTES: Adjustments to the volume of the Sonic Buffer Track present in the final
 *     master and proceeding  .m4a file creation.
 *
 *       -- A test of this capability would be to call pauseTwoTracks(), change level of volume and then
  *         call playTwoTracks() the volume change  should be evident.
 *
 *      @param sonicBufferGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 */

NocSonicMixer.prototype.setSonicBufferTrackVolume = function(sonicBufferGain) {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "setSonicBufferTrackVolume", [this.id, sonicBufferGain]);
};



/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastBeatTrackMeter()
 *
 */


NocSonicMixer.prototype.getSonicTrackMeter = function(success, fail) {
    var me = this;
  /*exec(function(sonicTrackMeter) {
            me._sonicTrackMeter = sonicTrackMeter;
            success(sonicTrackMeter);
            },
            fail, "NocSonicMixer", "getSonicTrackMeter", [this.id]);*/
};


 /**
 *     NOTES: Adjustments to the volume of the Vocal Buffer Track present in the final
 *     master and proceeding  .m4a file creation.
 *
 *       -- A test of this capability would be to call pauseTwoTracks(), change level of volume and then
  *         call playTwoTracks() the volume change  should be evident.
 */

NocSonicMixer.prototype.setNocBufferTrackVolume = function(nocBufferGain) {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "setNocBufferTrackVolume", [this.id, nocBufferGain]);
};


/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastVocalTrackMeter()
 *
 */


NocSonicMixer.prototype.getNocTrackMeter = function(success, fail) {
    var me = this;
  /*exec(function(nocTrackMeter ) {
            me._nocTrackMeter = nocTrackMeter ;
            success(nocTrackMeter );
            },
            fail, "NocSonicMixer", "getNocInputMeter", [this.id]);*/
};


/**
 *       NOTES:  deleteSonicTrackBuffer()  will be called when user has decided masterMix is acceptable
 *                -- All memory allocated for buffer should be deleted and resources released
 *
 *
 */
NocSonicMixer.prototype.deleteSonicTrackBuffer = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "deleteSonicTrackBuffer", [this.id]);
};

/**
 *       NOTES:  deleteSonicTrackBuffer()  will be called when user has decided masterMix is acceptable
 *                -- All memory allocated for buffer should be deleted and resources released
 *
 *
 */
NocSonicMixer.prototype.releaseSonicTrackBuffer = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer", "releaseSonicTrackBuffer", [this.id]);
};



/**
 *       NOTES:  deleteVocalTrackBuffer()  will be called when user has decided masterMix is acceptable
 *                -- All memory allocated for buffer should be deleted and resources released
 *
 *
 */
NocSonicMixer.prototype.deleteNocTrackBuffer = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer","deleteNocTrackBuffer", [this.id]);
};



/**
 *       NOTES:  deleteVocalTrackBuffer()  will be called when user has decided masterMix is acceptable
 *                -- All memory allocated for buffer should be deleted and resources released
 *
 *
 */
NocSonicMixer.prototype.releaseNocTrackBuffer = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer","deleteNocTrackBuffer", [this.id]);
};



/**
 *       NOTES:  remove current Noc and Sonic Midi Edtis...
 *               return to original buffer.
 *
 *
 */
NocSonicMixer.prototype.removeNocSonicMidiEdits = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer","removeNocSonicMidiEdits", [this.id]);
};




/**
 *       NOTES:  merge noc and soinic buffers and any midi edits into a single buffer
 *
 */
NocSonicMixer.prototype.mergeNocSonicMidiEdits = function() {

   exec(this.successCallback, this.errorCallback, "NocSonicMixer","mergeNocSonicMidiEdits", [this.id]);
};








/**
 *     Master Creation Session
 *
 *
 * */

/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  Sonic Buffer or VOCAL Buffer as user
 *       may decided they are not satisfied with what was created after listening to masterMix.
 *          --Changes made to the Volume of each Sonic Track Buffer and Vocal Track Bufffer should be present
 *            after the buffers have been merged to a single buffer
 *
 *       createMasterMix();
 *
 */
NocSonicMixer.prototype.startMasterMixSession = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "startMasterMixSession", [this.id]);
};


/**
 *       NOTES: Playing back (reading samples from master mix buffer)
 *
 *
 *       -- play master mix from current position
 *
 *
 */
NocSonicMixer.prototype.playMasterMix = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "playMasterMix", [this.id]);
};

/**
 *       NOTES: Pause playback back of maser mix
 *
 *
 */
NocSonicMixer.prototype.pauseMasterMix = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "pauseMasterMix", [this.id]);
};

/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       stopMasterMix();
 *
 */
NocSonicMixer.prototype.stopMasterMix = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "stopMasterMix", [this.id]);
};



 /**
 *       NOTES: the Gain (Volume) level should begin at .75
 *       --changes to volume do not effect final promoted mix, should simply simulate
  *        what playback will sound like from file creation
 *
 *      @param masterMixGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 */

NocSonicMixer.prototype.setMasterMixVolume = function(masterMixGain) {

  exec(this.successCallback, this.errorCallback,"NocSonicMixer", "setMasterMixVolume", [this.id, masterMixGain]);
};

/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastVocalTrackMeter()
 *
 */


NocSonicMixer.prototype.getMasterMixMeter = function(success, fail) {
    var me = this;
  /*exec(function(masterMixMeter ) {
            me._masterMixMeter = masterMixMeter ;
            success(masterMixMeter );
            },
            fail, "NocSonicMixer", "getMasterMixMeter", [this.id]);*/
};



/**
 * Get position of audio.
 */
NocSonicMixer.prototype.getCurrentMasterMixPosition = function(success, fail) {
    var me = this;
      /*exec(function(masterMixPosition) {
            me._masterMixPosition = masterMixPosition;
            success(masterMixPosition);
        },
        fail, "NocSonicMixer", "getCurrentMasterMixPosition", [this.id]);*/
};

/**
 * Get duration of an audio file.
 * The duration is only set for audio that is playing, paused or stopped.
 *
 * @return      duration or -1 if not known.
 */

NocSonicMixer.prototype.getCurrentMasterMixDuration= function() {
        return this._masterMixDuration;
};


/**
 *       NOTES:  release master mix playback
 *
 */


NocSonicMixer.prototype.releaseMasterMix = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "releaseMasterMix", [this.id]);
};

/**
 *       NOTES:  deleteMasterMix()  will be called when user when user has accepted final promotedMasterMix()
 *                -- User will have options to listen to final .m4a file before deleteMasterMix() is called
 *                -- All memory allocated for buffer should be deleted and resources released
 *
 */


NocSonicMixer.prototype.deleteMasterMix = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "deleteMasterMix", [this.id]);
};



/**
 *       NOTES: Create a .m4a file based on the name of the user has supplied
 *              with    name_(id).mp4
 *          @param fileName:Stirng //ex. madness_12323423  which should result in madness_12323423.m4a
 */


NocSonicMixer.prototype.promoteMasterMix = function(fileName) {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "promoteMasterMix", [this.id], fileName);
};







/**
 *     Master Promotion Session
 *
 *
 * */
NocSonicMixer.prototype.startPromotedFileSession = function(){

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "startPromotedFileSession", [this.id]);
};


 /**
 *       NOTES: play/resume back of master file as it will be heard by others, should
  *       be the same as what was heard when masterMixPlay() occurred
  *
  *       -- if paused, resume playback from paused position
 *
 */

NocSonicMixer.prototype.playPromotedFile = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "playPromotedFile", [this.id]);
};


 /**
 *       NOTES: pause play back of promoted file
 *
 */

NocSonicMixer.prototype.pausePromotedFile = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "pausePromotedFile", [this.id]);
};


 /**
 *       NOTES: stop play back of promoted file, set position to zero
 *
 */

NocSonicMixer.prototype.stopPromotedFile = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "stopPromotedFile", [this.id]);
};


 /**
 *       NOTES: return the duration of the promotedFile
 *
 */

NocSonicMixer.prototype.getPromotedFileDuration = function() {
        return this._promotedFileDuration;
};




 /**
 *       NOTES: return the duration of the promotedFile
 *
 */

NocSonicMixer.prototype.getPromotedFilePosition = function(success, fail) {
    var me = this;
      /*exec(function(promotedFilePosition) {
            me._promotedFilePosition = promotedFilePosition;
            success(promotedFilePosition);
        },
        fail, "NocSonicMixer", "getPromotedFilePosition", [this.id]);*/
};

 /**
 *       NOTES: move promoted file to spcific position
 *
 */

NocSonicMixer.prototype.promotedFileSeekTo = function(milliseconds) {

    var me = this;
  /*exec(function(p) {
        me._promotedFilePosition = p;
    }, this.errorCallback,"NocSonicMixer", "promotedFileSeekTo", [this.id,milliseconds]);*/

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "promotedFileSeekTo", [this.id, milliseconds]);
};


 /**
 *       NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param promotedFileGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 */

NocSonicMixer.prototype.setPromotedFileVolume = function(promotedFileGain) {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "setPromotedFileVolume", [this.id, promotedFileGain]);
};



/**
 *       NOTES:Level of PromotedFile amplitude
 *
 *
 *       event return volume levels
 *
 *
 */
NocSonicMixer.prototype.getPromotedFileMeter = function(success, fail) {
    var me = this;
  /*exec(function(promotedFileMeter ) {
            me._promotedFileMeter = promotedFileMeter ;
            success(promotedFileMeter );
            },
            fail, "NocSonicMixer", "getPromotedFileMeter", [this.id]);*/
};


 /**
 *       NOTES: Retrieve File Created
 *
 */

NocSonicMixer.prototype.getPromotedFileLocation = function() {
  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "getPromotedFileLocation", [this.id])
};



/**
 * Release the resources.
 */
NocSonicMixer.prototype.releasePromotedFile = function() {
  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "releasePromotedFile", [this.id]);
};


/*
 *     Notes: delete file and any resources
 *            -- Deleting a file should not destroy masterMix buffers
 *            -- releases all resources use to play back promoted file
 *
 */

NocSonicMixer.prototype.deletePromotedFile = function() {

  exec(this.successCallback, this.errorCallback, "NocSonicMixer", "deletePromotedFile", [this.id]);
};


/**
 * This class provides access to the device  audio interfaces for creating a two track mixer
 *
 * @constructor
 * @param sonicSrc                   The file name or url to play
 * @param successCallback       The callback to be called when the file is done playing or recording.
 *                                  successCallback()
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 * @param statusCallback        The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode) - OPTIONAL
 */


/**
 * Audio has status update.
 * PRIVATE
 *
 * @param id            The media object id (string)
 * @param msgType       The 'type' of update this is
 * @param value         Use of value is determined by the msgType
 */
NocSonicMixer.onStatus = function(id, msgType, value) {

    var nsMixer = nocMixObject[id];

    if(nsMixer) {
        switch(msgType) {
            case NocSonicMixer.NSMIXER_STATE :
                var rtrnValue =   ((typeof value === "number") && Math.floor(value) === value)?NocSonicMixer.MEDIA_MSG[value]:value;
                nsMixer.statusCallback && nsMixer.statusCallback(rtrnValue);
                break;
            case NocSonicMixer.NSMIXER_ERROR :
                nsMixer.errorCallback && nsMixer.errorCallback(value);
                break;
            case NocSonicMixer.NSMIXER_SONICLOOP_VU_METER :
                nsMixer._sonicLoopMeter = Object(value);
                break;
            case NocSonicMixer.NSMIXER_VOCALINPUT_VU_METER :
                nsMixer._vocalInputMeter = Object(value);
                break;
            case NocSonicMixer.NSMIXER_NOCTRACK_VU_METER :
                nsMixer._nocTrackMeter = Object(value);
                break;
            case NocSonicMixer.NSMIXER_SONICTRACK_VU_METER :
                nsMixer._sonicTrackMeter = Object(value);
                break;
            case NocSonicMixer.NSMIXER_MASTERMIX_VU_METER :
                nsMixer._masterMixMeter = Object(value);
                break;
            case NocSonicMixer.NSMIXER_MASTERMIX_POSITION :
                nsMixer._masterMixPosition = Number(value);
                break;
            case NocSonicMixer.NSMIXER_MASTERMIX_DURATION :
                nsMixer._masterMixDuration = Number(value);
                break;
            case NocSonicMixer.NSMIXER_PROMOTEDFILE_VU_METER :
                nsMixer._promotedFileMeter = Number(value);
                break;
            case NocSonicMixer.NSMIXER_PROMOTEDFILE_DURATION :
                nsMixer._promotedFilePosition = Number(value);
                break;
            case NocSonicMixer.NSMIXER_PROMOTEDFILE_POSITION :
                nsMixer._promotedFilePosition = Number(value);
                break;
            case NocSonicMixer.NSMIXER_PROMOTEDFILE_PATH :
                nsMixer._promotedFileLocation = String(value);
                break;
            default :
                console.error && console.error("Unhandled NocSonicMixer.onStatus :: " + msgType);
                break;
        }
    }
    else {
         console.error && console.error("Received NocSonicMixer.onStatus callback for unknown media :: " + id);
    }

};

module.exports = NocSonicMixer;

function onMessageFromNative(msg) {
    if (msg.action == 'status') {
        NocSonicMixer.onStatus(msg.status.id, msg.status.msgType, msg.status.value);
    } else {
        throw new Error('Unknown media action' + msg.action);
    }
}

if (cordova.platformId === 'android' || cordova.platformId === 'windowsphone') {

    var channel = require('cordova/channel');

    channel.createSticky('onNocSonicMixerPluginReady');
    channel.waitForInitialization('onNocSonicMixerPluginReady');

    channel.onCordovaReady.subscribe(function() {
      //exec(onMessageFromNative, undefined, 'NocSonicMixer', 'messageChannel', []);
        channel.initializationComplete('onNocSonicMixerPluginReady');
    });
}
