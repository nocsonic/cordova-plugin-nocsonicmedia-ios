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



/**
 *     NOTES: If user has called this function the file supplied by the src, should be download into
 *     and audio buffer, from where it will be played in a loop, the duration of the audio should be
 *     no longer than 30 seconds.
 *
 *      @param src                  most often will represent a url path to a file previousl downloaded,
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



/**
 *       NOTES: Return State of Mix
 *
 *       getStateOfMixer();
 */



/**
 *     NOTES: This function should begin playing the beat in a loop from the audio buffer that it has been
 *     loaded into. If the Buffer has not been loaded it should return and ErrorCode (), the Gain (Volume
 *     level should begin at .75
 *
 *      playSonicLoop();
 */



/**
 *     NOTES: Pause play back of Sonic Loop, if  Recording (audio capturing) in progess do not stop,
 *            the Recording, simply set Gain Amount to mute
 *
 *      pauseSonicLoop();
 */


/**
 *     NOTES: Stop play back of Sonic Loop
 *
 *     stopSonicLoop();
 *
 * */




 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param sonicLoopGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      updateSonicLoopVolume(sonicLoopGain);
 */



/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastLevelOfSonicMeter()
 *
 */



/**
 *      NOTES: Audio Capture from device input (with or without microphone).
 *
 *      a) If current looping beat exist (even if it has been paused) begins to write into Audio Beat Buffer
 *         from its current position ( thus, the beat should not be forced to start at the zero position);
 *
 *      b) Captured audio from microphone or other input should be directly  write into Audio Vocal track Buffer,
 *           separate from beat track
 *
 *      c) If stopTime has not been set, the recording stop after 31 seconds, the Maximum amount of recording time
 *        is 45 seconds.
 *           - BEAT stops playing and stop writing to audio beat buffer
 *           - MIC or input Device Is closed(prevented from capturing) and stop writing to vocal buffer
 *
 *
 *      d) If STUDIO_STATE == recording and STUDIO_BEAT_END_ATTACHED == true
 *         then perform c) actions
 *
 *      @param stopTime:number;
 *
 *      nocStartRecording(stopTime );
 */


 /**
 *     NOTES: the Gain (Volume) level should begin at .75, the volume of input coming in
 *
 *      @param  inputGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      updateInputVolume(inputGain);
 */



/**
 *       NOTES:Level of Audio being Caputre from Input
 *
 *
 *       event return volume levels
 *
 *       broadcastLevelOfAudioRecordingMeter()
 *
 *
 */


/**
 *     NOTES: Simultaneously play audio back from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *      playTwoTracks();
 */



/**
 *     NOTES: Simultaneously pause audio from Audio Beat Buffer and And Audio Vocal Buffer
 *
 *      pauseTwoTracks();
 */



/**
 *     NOTES: Simultaneously stop audio play from Audio Beat Buffer and And Audio Vocal Buffer
 *            and start playing each buffer from beginning
 *
 *      rewindTwoTracks();
 */


 /**
 *     NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param beatGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      updateBeatTrackVolume(beatGain);
 */


/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastBeatTrackMeter()
 *
 */


 /**
 *       NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param vocalGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      updateVocalTrackVolume(beatGain);
 */


/**
 *       NOTES:Level of Volume
 *       event return volume levels
 *
 *       broadcastVocalTrackMeter()
 *
 */

/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       deleteTwoTracks()
 *
 */

/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       createMasterMix();
 *
 */


/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       playMasterMix();
 *
 */




/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       stopMasterMix();
 *
 */



/**
 *       NOTES: Merge audio from two Buffers, into one buffer, DO not destroy  BEAT Buffer or VOCAL Buffer\
 *
 *       rewindMasterMix();
 *
 */



 /**
 *       NOTES: the Gain (Volume) level should begin at .75
 *
 *      @param masterMixGain: Number; (0-1)  0 being mute, 1 being the loudest
 *
 *      updateMasterMixVolume(masterMixGain);
 */



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
 * @param src                   The file name or url to play
 * @param successCallback       The callback to be called when the file is done playing or recording.
 *                                  successCallback()
 * @param errorCallback         The callback to be called if there is an error.
 *                                  errorCallback(int errorCode) - OPTIONAL
 * @param statusCallback        The callback to be called when media status has changed.
 *                                  statusCallback(int statusCode) - OPTIONAL
 *
 *
 *
 *
 *
 *
 */
var NocSonicMedia = function(src, successCallback, errorCallback, statusCallback) {
    argscheck.checkArgs('sFFF', 'NocSonicMedia', arguments);
    this.id = utils.createUUID();
    nocMixObject[this.id] = this;
    this.src = src;
    this.successCallback = successCallback;
    this.errorCallback = errorCallback;
    this.statusCallback = statusCallback;
    this._duration = -1;
    this._position = -1;
    exec(null, this.errorCallback, "NocSonicMedia", "create", [this.id, this.src]);
};

// NocSonicMedia messages
NocSonicMedia.MEDIA_STATE = 1;
NocSonicMedia.MEDIA_DURATION = 2;
NocSonicMedia.MEDIA_POSITION = 3;
NocSonicMedia.MEDIA_ERROR = 9;

// NocSonicMedia states
NocSonicMedia.MEDIA_NONE = 0;
NocSonicMedia.MEDIA_STARTING = 1;
NocSonicMedia.MEDIA_RUNNING = 2;
NocSonicMedia.MEDIA_PAUSED = 3;
NocSonicMedia.MEDIA_STOPPED = 4;
NocSonicMedia.MEDIA_MSG = ["None", "Starting", "Running", "Paused", "Stopped"];





//








// "static" function to return existing objs.
NocSonicMedia.get = function(id) {
    return nocMixObject[id];
};

/**
 * Start or resume playing audio file.
 */
NocSonicMedia.prototype.play = function(options) {
    exec(null, null, "NocSonicMedia", "startPlayingAudio", [this.id, this.src, options]);
};

/**
 * Stop playing audio file.
 */
NocSonicMedia.prototype.stop = function() {
    var me = this;
    exec(function() {
        me._position = 0;
    }, this.errorCallback, "NocSonicMedia", "stopPlayingAudio", [this.id]);
};

/**
 * Seek or jump to a new time in the track..
 */
NocSonicMedia.prototype.seekTo = function(milliseconds) {
    var me = this;
    exec(function(p) {
        me._position = p;
    }, this.errorCallback, "NocSonicMedia", "seekToAudio", [this.id, milliseconds]);
};

/**
 * Pause playing audio file.
 */
NocSonicMedia.prototype.pause = function() {
    exec(null, this.errorCallback, "NocSonicMedia", "pausePlayingAudio", [this.id]);
};

/**
 * Get duration of an audio file.
 * The duration is only set for audio that is playing, paused or stopped.
 *
 * @return      duration or -1 if not known.
 */
NocSonicMedia.prototype.getDuration = function() {
    return this._duration;
};

/**
 * Get position of audio.
 */
NocSonicMedia.prototype.getCurrentPosition = function(success, fail) {
    var me = this;
    exec(function(p) {
        me._position = p;
        success(p);
    }, fail, "NocSonicMedia", "getCurrentPositionAudio", [this.id]);
};

/**
 * Start recording audio file.
 */
NocSonicMedia.prototype.startRecord = function() {
    exec(null, this.errorCallback, "NocSonicMedia", "startRecordingAudio", [this.id, this.src]);
};

/**
 * Stop recording audio file.
 */
NocSonicMedia.prototype.stopRecord = function() {
    exec(null, this.errorCallback, "NocSonicMedia", "stopRecordingAudio", [this.id]);
};

/**
 * Release the resources.
 */
NocSonicMedia.prototype.release = function() {
    exec(null, this.errorCallback, "NocSonicMedia", "release", [this.id]);
};

/**
 * Adjust the volume.
 */
NocSonicMedia.prototype.setVolume = function(volume) {
    exec(null, null, "NocSonicMedia", "setVolume", [this.id, volume]);
};

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
