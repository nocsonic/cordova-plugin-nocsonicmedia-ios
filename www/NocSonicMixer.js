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

var twoTrackObject = { };
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
      for(var prop in ad) {
        if (twoTrackObject.hasOwnProperty(prop)) {
            //check for listeners before destroying

            delete twoTrackObject[prop];
        }
     }
     this.id = utils.createUUID();
     twoTrackObject[this.id] = this;
     this.successCallback    = successCallback;
     this.errorCallback      = errorCallback;
     this.statusCallback     = statusCallback;
     exec(null, this.errorCallback, "NocSonicMixer", "create", [this.id]);
}


// NocSonicMixer messages
NocSonicMixer.MEDIA_STATE = 1;
NocSonicMixer.MEDIA_DURATION = 2;
NocSonicMixer.MEDIA_POSITION = 3;
NocSonicMixer.MEDIA_ERROR = 9;

// NocSonicMixer states
NocSonicMixer.MEDIA_NONE = 0;
NocSonicMixer.MEDIA_STARTING = 1;
NocSonicMixer.MEDIA_RUNNING = 2;
NocSonicMixer.MEDIA_PAUSED = 3;
NocSonicMixer.MEDIA_STOPPED = 4;
NocSonicMixer.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];




/**
 *       NOTES: Return State of Mix
 *
 *       getStateOfMixer();
 */







// "static" function to return existing objs.
NocSonicMixer.get = function(id) {
    return twoTrackObject[id];
};


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
    this.sonicSrc = sonicSrc;
    this._sonicPosition = -1;
    exec(this.successCallback, this.errorCallback, "NocSonicMixer", "loadSonicTrack", [this.id, this.sonicSrc]);
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
    exec(null, null, "NocSonicMedia", "startPlayingSonicLoop", [this.id, this.sonicSrc, options]);
};


/**
 *     NOTES: Pause play back of Sonic Loop, if  Recording (audio capturing) in progess do not stop,
 *            the Recording, simply set Gain Amount to mute
 *
 */


NocSonicMixer.prototype.pauseSonicLoop = function() {
    exec(null, this.errorCallback, "NocSonicMixer", "pausePlayingSonicLoop", [this.id]);
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

NocSonicMedia.prototype.stopSonicLoop = function() {
    var me = this;
    exec(function() {
        me._sonicPosition = 0;
    }, this.errorCallback, "NocSonicMixer", "stopSonicLoop", [this.id]);
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
    var me = this;
    exec(function() {
        me._sonicPosition = 0;
    }, this.errorCallback, "NocSonicMixer", "sonicLoopRewind", [this.id, 0]);
};

 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param sonicLoopGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      setSonicLoopVolume(sonicLoopGain);
 */


NocSonicMixer.prototype.setSonicLoopVolume = function(sonicLoopGain) {
    exec(null, null, "NocSonicMixer", "setSonicLoopVolume", [this.id, sonicLoopGain]);
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

NocSonicMixer.prototype.broadcastSonicLoopMeter = function() {

  //  exec(null, null, "NocSonicMixer", "broadcastSonicLoopMeter", [this.id, sonicLoopGain]);
};



/**
 * Release the resources.
 * if Neccessary
 */
NocSonicMixer.prototype.sonicLoopRelease = function() {
    exec(null, this.errorCallback, "NocSonicMixer", "sonicLoopRelease", [this.id]);
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
 *      @param stopTime:number;   //milliseconds, default 31 seconds (31000)
 *      @param softStopTime:number; //milliseconds, default 3 seconds (3000)
 *      @param syncStop:bool;   // default true, when "true", while wrting caputre audio from input device stops writing to
  *                                Vocal Track Buffer, writing sonicLoop samples to Sonic Track Buffer does
  *                                not stop until softStopTime has elapsed.
  *                                -- If the amount of time left for recordings is less than 3 seconds, then stops writing to
  *                                Vocal Track Buffer, but continue to write to Sonic Track Buffer for time remaining.
 *
 *      startNocRecordingSession(minCaptureTime, stopTime, softStopTime, syncStop);
 */


NocSonicMixer.prototype.startNocRecordingSession = function(stopTime) {


};


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


NocSonicMedia.prototype.stopNocRecordingSession = function() {
    var me = this;
    exec(function() {
        me._sonicPosition = 0;
    }, this.errorCallback, "NocSonicMixer", "stopNocRecordingSession", [this.id]);
};



 /**
 *     NOTES: the amplitude (Volume) level should begin at .75, the volume of input coming in
 *
 *      @param  inputGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *
 */

NocSonicMixer.prototype.setInputAmplitude= function(inputAmplitude) {
    exec(null, null, "NocSonicMixer", "setInputAmplitude", [this.id, inputAmplitude]);
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

NocSonicMixer.prototype.broadcastInputDeviceAmplitude = function() {

    //exec(null, null, "NocSonicMixer", "broadcastInput", [this.id]);
};




/**
 *     NOTES: Simultaneously play audio back from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *       -- set both Vocal Track Buffer and  Sonic Track Buffer position to 0
 *       -- begin playing both Vocal Track Buffer and  Sonic Track Buffer  tacks simultaneously
 *
 */

NocSonicMixer.prototype.playTwoTracks = function() {

    exec(null, null, "NocSonicMixer", "playTwoTracks", [this.id]);
};




/**
 *     NOTES: Simultaneously pause audio from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *       -- simultaneously pause both Vocal Track Buffer and  Sonic Track Buffer  from playing
 *
 *      pauseTwoTracks();
 */

NocSonicMixer.prototype.pauseTwoTracks = function() {

    exec(null, null, "NocSonicMixer", "pauseTwoTracks", [this.id]);
};


 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param sonicBufferGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *     setSonicBufferTrackVolume(sonicBufferGain);
 */

NocSonicMixer.prototype.setSonicBufferTrackVolume = function(sonicBufferGain) {

    exec(null, null, "NocSonicMixer", "setSonicBufferTrackVolume", [this.id, sonicBufferGain]);
};



/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastBeatTrackMeter()
 *
 */



 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param vocalBufferGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *     setVocalBufferTrackVolume(vocalBufferGain);
 */

NocSonicMixer.prototype.setVocalBufferTrackVolume = function(vocalBufferGain) {

    exec(null, null, "NocSonicMixer", "setVocalBufferTrackVolume", [this.id, vocalBufferGain]);
};


/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastVocalTrackMeter()
 *
 */


/**
 *       NOTES:Level of Audio being Capture from Input
 *
 *
 */
NocSonicMixer.prototype.deleteSonicTrackBuffer = function() {

    //exec(null, null, "NocSonicMixer", "broadcastInput", [this.id]);
};



/**
 *       NOTES:Level of Audio being Capture from Input
 *
 *
 */
NocSonicMixer.prototype.deleteVocalTrackBuffer = function() {

    //exec(null, null, "NocSonicMixer", "broadcastInput", [this.id]);
};



/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       createMasterMix();
 *
 */
NocSonicMixer.prototype.createMasterMix = function() {

    exec(null, null, "NocSonicMixer", "createMasterMix", [this.id]);
};


/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *
 *       -- set master mix back to 0
 *       -- playing master mix from beginning
 *
 *
 */
NocSonicMixer.prototype.playMasterMix = function() {

    exec(null, null, "NocSonicMixer", "playMasterMix", [this.id]);
};





/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       stopMasterMix();
 *
 */
NocSonicMixer.prototype.stopMasterMix = function() {

    exec(null, null, "NocSonicMixer", "stopMasterMix", [this.id]);
};



 /**
 *       NOTES: the Gain (Volume) level should begin at .75
 *
 *
 *      @param mixerGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 */

NocSonicMixer.prototype.setMasterMixVolume = function(mixerGain) {

    exec(null, null, "NocSonicMixer", "setMasterMixVolume", [this.id, mixerGain]);
};





/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       deleteMasterMix()
 *
 */




/**
 *       NOTES: Create a .m4a file based on the name of the user has supplied
 *              with    name_(id).mp4
 *              a) After File is created destroy all buffers
 *
 *       promoteMasterMix();
 *
 */




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
NocSonicMedia.onStatus = function(id, msgType, value) {

    var media = nocMixObject[id];

    if(media) {
        switch(msgType) {
            case NocSonicMedia.MEDIA_STATE :
                media.statusCallback && media.statusCallback(value);
                if(value == NocSonicMedia.MEDIA_STOPPED) {
                    media.successCallback && media.successCallback();
                }
                break;
            case NocSonicMedia.MEDIA_DURATION :
                media._duration = value;
                break;
            case NocSonicMedia.MEDIA_ERROR :
                media.errorCallback && media.errorCallback(value);
                break;
            case NocSonicMedia.MEDIA_POSITION :
                media._position = Number(value);
                break;
            default :
                console.error && console.error("Unhandled NocSonicMedia.onStatus :: " + msgType);
                break;
        }
    }
    else {
         console.error && console.error("Received NocSonicMedia.onStatus callback for unknown media :: " + id);
    }

};

module.exports = NocSonicMedia;

function onMessageFromNative(msg) {
    if (msg.action == 'status') {
        NocSonicMedia.onStatus(msg.status.id, msg.status.msgType, msg.status.value);
    } else {
        throw new Error('Unknown media action' + msg.action);
    }
}

if (cordova.platformId === 'android' || cordova.platformId === 'amazon-fireos' || cordova.platformId === 'windowsphone') {

    var channel = require('cordova/channel');

    channel.createSticky('onNocSonicMediaPluginReady');
    channel.waitForInitialization('onNocSonicMediaPluginReady');

    channel.onCordovaReady.subscribe(function() {
        exec(onMessageFromNative, undefined, 'NocSonicMedia', 'messageChannel', []);
        channel.initializationComplete('onNocSonicMediaPluginReady');
    });
}
