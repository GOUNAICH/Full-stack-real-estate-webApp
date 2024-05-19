import React, { useState } from "react";
import { FaVideo, FaPhoneSlash, FaMicrophone, FaVolumeMute, FaVideoSlash } from 'react-icons/fa'; // Import icons
import './videoCallPage.scss';

function VideoCallPage() {
  const [isCalling, setIsCalling] = useState(false);
  const [isAudioMuted, setIsAudioMuted] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isVolumeMuted, setIsVolumeMuted] = useState(false);

  const handleCall = () => {
    // Your logic for initiating a call
    setIsCalling(true);
  };

  const handleEndCall = () => {
    // Your logic for ending the call
    setIsCalling(false);
  };

  const toggleAudio = () => {
    setIsAudioMuted(!isAudioMuted);
  };

  const toggleVideo = () => {
    setIsVideoEnabled(!isVideoEnabled);
  };

  const toggleVolume = () => {
    setIsVolumeMuted(!isVolumeMuted);
  };

  return (
    <div className="video-call-page">
      <div className="video-container">
        {/* Video stream goes here */}
        {isCalling ? (
          <>
            {/* Participant display */}
            <div className="participant-display">
              {/* Profile pictures or initials */}
            </div>
            {/* Call controls */}
            <div className="call-controls">
              <FaMicrophone className={`control-icon ${isAudioMuted ? 'muted' : ''}`} onClick={toggleAudio} />
              <FaVolumeMute className={`control-icon ${isVolumeMuted ? 'muted' : ''}`} onClick={toggleVolume} />
              <FaVideoSlash className={`control-icon ${!isVideoEnabled ? 'muted' : ''}`} onClick={toggleVideo} />
              <FaPhoneSlash className="end-call-icon" onClick={handleEndCall} />
            </div>
          </>
        ) : (
          <FaVideo className="video-icon" onClick={handleCall} />
        )}
      </div>
    </div>
  );
}

export default VideoCallPage;
