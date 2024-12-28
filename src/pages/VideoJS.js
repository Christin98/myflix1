import React from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

export const VideoJS = (props) => {
  const videoRef = React.useRef(null); // Reference to the video element container
  const playerRef = React.useRef(null); // Reference to the Video.js player instance
  const { options, onReady } = props;

  React.useEffect(() => {
    // Ensure the Video.js player is initialized only once
    if (!playerRef.current) {
      // Create the Video.js player element inside the component
      const videoElement = document.createElement('video-js');
      videoElement.classList.add('vjs-big-play-centered');
      videoRef.current.appendChild(videoElement);

      // Initialize Video.js player
      const player = (playerRef.current = videojs(videoElement, options, () => {
        videojs.log('Player is ready');
        if (onReady) {
          onReady(player); // Call the onReady callback if provided
        }
      }));
    } else {
      // Update existing player options if the props change
      const player = playerRef.current;
      player.autoplay(options.autoplay);
      player.src(options.sources);
    }

    // Cleanup function to dispose of the Video.js player
    return () => {
      const player = playerRef.current;
      if (player && !player.isDisposed()) {
        player.dispose();
        playerRef.current = null;
      }
    };
  }, [options]);

  return (
    <div data-vjs-player>
      {/* The ref here is used to attach the Video.js player */}
      <div ref={videoRef} />
    </div>
  );
};

export default VideoJS;
