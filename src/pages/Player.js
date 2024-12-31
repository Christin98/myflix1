import React, {useState} from "react";
import { useParams } from "react-router-dom";
import VideoJS from './VideoJS'; // Import the VideoPlayer component
import "video.js/dist/video-js.css";
import './Player.css';
import ep1 from "../assets/episode-thumbnails/ep1.jpg";
import ep2 from "../assets/episode-thumbnails/ep2.jpg";
import ep3 from "../assets/episode-thumbnails/ep3.jpg";
import ep4 from "../assets/episode-thumbnails/ep4.jpg";
import ep5 from "../assets/episode-thumbnails/ep5.jpg";
import ep6 from "../assets/episode-thumbnails/ep6.jpg";
import ep7 from "../assets/episode-thumbnails/ep7.jpg";

const episodes = [
  { id: 1, title: "Bread and Lottery", duration: "65m", description: "A vengeful Gi-hun makes a U-turn at the airport. Later, in his hideout, he intensifies his search for the elusive recruiter who is seeking new players.", thumbnail: ep1, videoUrl: "https://sgs2.duckdns.org/hls/S02e01/master.m3u8" },
  { id: 2, title: "Halloween Party", duration: "51m", description: "Gi-hun finally gets hold of an invitation, marked for Halloween day. In a tense moment facing Jun-ho, they reveal their truths to each other.", thumbnail: ep2, videoUrl: "https://sgs2.duckdns.org/hls/S02e02/master.m3u8" },
  { id: 3, title: "001", duration: "61m", description: "New players gather for a chance to win 45.6 billion won. After an intense first round, the survivors' fates hang in the balance — down to one final vote.", thumbnail: ep3, videoUrl: "https://sgs2.duckdns.org/hls/S02e03/master.m3u8" },
  { id: 4, title: "Six Legs", duration: "62m", description: "The players prepare for the next game: a six-legged pentathlon, where each team member must clear a mini-game to survive — or face collective elimination.", thumbnail: ep4, videoUrl: "https://sgs2.duckdns.org/hls/S02e04/master.m3u8" },
  { id: 5, title: "One More Game", duration: "76m", description: "Kang No-eul earns enemies for her unruly actions. Nerves fray to the breaking point as the remaining players vote on whether to move to the next round.", thumbnail: ep5, videoUrl: "https://sgs2.duckdns.org/hls/S02e05/master.m3u8" },
  { id: 6, title: "O X", duration: "52m", description: "Jun-ho and his team prepare to infiltrate a suspicious island. As monetary stakes and tensions rise, players split into two opposing factions.", thumbnail: ep6, videoUrl: "https://sgs2.duckdns.org/hls/S02e06/master.m3u8" },
  { id: 7, title: "Friend or Foe", duration: "60m", description: "The remaining players strategize on how to survive the night. Gi-hun proposes a risky plan — but he will need trustworthy allies to carry it out.", thumbnail: ep7, videoUrl: "https://sgs2.duckdns.org/hls/S02e05/master.m3u8" },
];

// { id: 1, title: "Bread and Lottery", duration: "65m", description: "A vengeful Gi-hun makes a U-turn at the airport. Later, in his hideout, he intensifies his search for the elusive recruiter who is seeking new players.", thumbnail: ep1, videoUrl: "https://sgs2.duckdns.org/hls/S02e01/master.m3u8" },
// { id: 2, title: "Halloween Party", duration: "51m", description: "Gi-hun finally gets hold of an invitation, marked for Halloween day. In a tense moment facing Jun-ho, they reveal their truths to each other.", thumbnail: ep2, videoUrl: "https://sgs2.duckdns.org/hls/S02e02/master.m3u8" },
// { id: 3, title: "001", duration: "61m", description: "New players gather for a chance to win 45.6 billion won. After an intense first round, the survivors' fates hang in the balance — down to one final vote.", thumbnail: ep3, videoUrl: "https://sgs2.duckdns.org/hls/S02e03/master.m3u8" },
// { id: 4, title: "Six Legs", duration: "62m", description: "The players prepare for the next game: a six-legged pentathlon, where each team member must clear a mini-game to survive — or face collective elimination.", thumbnail: ep4, videoUrl: "https://sgs2.duckdns.org/hls/S02e04/master.m3u8" },
// { id: 5, title: "One More Game", duration: "76m", description: "Kang No-eul earns enemies for her unruly actions. Nerves fray to the breaking point as the remaining players vote on whether to move to the next round.", thumbnail: ep5, videoUrl: "https://sgs2.duckdns.org/hls/S02e05/master.m3u8" },
// { id: 6, title: "O X", duration: "52m", description: "Jun-ho and his team prepare to infiltrate a suspicious island. As monetary stakes and tensions rise, players split into two opposing factions.", thumbnail: ep6, videoUrl: "https://sgs2.duckdns.org/hls/S02e06/master.m3u8" },
// { id: 7, title: "Friend or Foe", duration: "60m", description: "The remaining players strategize on how to survive the night. Gi-hun proposes a risky plan — but he will need trustworthy allies to carry it out.", thumbnail: ep7, videoUrl: "https://sgs2.duckdns.org/hls/S02e07/master.m3u8" },

const Player = () => {
  const [hasError, setHasError] = useState(false); // Track if there's an error with the video
  const { episodeId } = useParams()

  const episode = episodes.find((ep) => ep.id === parseInt(episodeId, 10));

  if (!episode) {
    return (
      <div className="player-error">
        <h1>404</h1>
        <h2>Episode Not Found</h2>
        <p>The requested episode does not exist or the link is invalid.</p>
        <button onClick={() => window.location.href = '/'}>Return to Home</button>
      </div>
    );
  }

  // Handle "Coming Soon" episodes
  if (!episode.videoUrl) {
    return (
      <div className="player-error">
        <h1>{episode.title}</h1>
        <h2>Coming Soon</h2>
        <p>Stay tuned for the next episode of Squid Game!</p>
        <button onClick={() => window.location.href = '/'}>Back to Episodes</button>
      </div>
    );
  }

  const videoJsOptions = {
    autoplay: true,
    controls: true,
    responsive: true,
    fluid: true,
    sources: [
      {
        src: episode.videoUrl,
        type: 'application/x-mpegURL',
      },
    ],
  };

  const handlePlayerReady = (player) => {
    console.log('Player is ready', player);
    player.on('waiting', () => {
      console.log('Player is waiting');
    });

    player.on('dispose', () => {
      console.log('Player will dispose');
    });

    // Listen for playback errors
    player.on('error', () => {
      console.error('Video playback error occurred');
      setHasError(true); // Trigger error state
    });
  };

    // Show "Something went wrong" screen if an error occurs
    if (hasError) {
      return (
        <div className="player-error">
          <h1>{episode.title}</h1>
          <h2>Something Went Wrong</h2>
          <p>We were unable to load the video. Please try again later.</p>
          <button onClick={() => window.location.href = '/'}>Back to Episodes</button>
        </div>
      );
    }

    
  // useEffect(() => {
  //   if (!episode) {
  //     return;
  //   }

  //   // Delay the initialization to ensure the DOM is fully mounted
  //   const initializePlayer = () => {
  //     if (!playerRef.current &&videoRef.current) {
  //       playerRef.current = videojs(videoRef.current, {
  //         controls: true,
  //         autoplay: true,
  //         preload: "auto",
  //         fluid: true,
  //         sources: [
  //           {
  //             src: episode.videoUrl,
  //             type: "application/x-mpegURL",
  //           },
  //         ],
  //       });
  //     }
  //   };

  //   setTimeout(initializePlayer, 0); // Short delay to ensure DOM is ready

  //   // Cleanup player instance on unmount
  //   return () => {
  //     if (playerRef.current) {
  //       playerRef.current.dispose();
  //       playerRef.current = null;
  //     }
  //   };
  // }, [episode, navigate]);

  // if (!episode) {
  //   return (
  //     <div className="player-error">
  //       <h1>404</h1>
  //       <h2>Episode Not Found</h2>
  //       <p>We couldn't find the episode you're looking for.</p>
  //       <button onClick={() => navigate("/")}>Return to Home</button>
  //     </div>
  //   );
  // }

  return (
    <div className="player">
      <h1 className="player-title">{episode.title}</h1>
      {/* <div data-vjs-player>
        <video ref={videoRef} className="video-js" />
      </div> */}
      <VideoJS options={videoJsOptions} onReady={handlePlayerReady} />
    </div>
  );
};

export default Player;
