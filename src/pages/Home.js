// Updated Home.js
import React from "react";
import { useNavigate } from "react-router-dom";
import squid_game_banner from "../assets/squid-game-banner.jpg";
import ep1 from "../assets/episode-thumbnails/ep1.jpg";
import ep2 from "../assets/episode-thumbnails/ep2.jpg";
import ep3 from "../assets/episode-thumbnails/ep3.jpg";
import ep4 from "../assets/episode-thumbnails/ep4.jpg";
import ep5 from "../assets/episode-thumbnails/ep5.jpg";
import ep6 from "../assets/episode-thumbnails/ep6.jpg";
import ep7 from "../assets/episode-thumbnails/ep7.jpg";

import './Home.css';

const episodes = [
  { id: 1, title: "Bread and Lottery", duration: "65m", description: "A vengeful Gi-hun makes a U-turn at the airport. Later, in his hideout, he intensifies his search for the elusive recruiter who is seeking new players.", thumbnail: ep1 },
  { id: 2, title: "Halloween Party", duration: "51m", description: "Gi-hun finally gets hold of an invitation, marked for Halloween day. In a tense moment facing Jun-ho, they reveal their truths to each other.", thumbnail: ep2 },
  { id: 3, title: "001", duration: "61m", description: "New players gather for a chance to win 45.6 billion won. After an intense first round, the survivors' fates hang in the balance — down to one final vote.", thumbnail: ep3 },
  { id: 4, title: "Six Legs", duration: "62m", description: "The players prepare for the next game: a six-legged pentathlon, where each team member must clear a mini-game to survive — or face collective elimination.", thumbnail: ep4 },
  { id: 5, title: "One More Game", duration: "76m", description: "Kang No-eul earns enemies for her unruly actions. Nerves fray to the breaking point as the remaining players vote on whether to move to the next round.", thumbnail: ep5 },
  { id: 6, title: "O X", duration: "52m", description: "Jun-ho and his team prepare to infiltrate a suspicious island. As monetary stakes and tensions rise, players split into two opposing factions.", thumbnail: ep6 },
  { id: 7, title: "Friend or Foe", duration: "60m", description: "The remaining players strategize on how to survive the night. Gi-hun proposes a risky plan — but he will need trustworthy allies to carry it out.", thumbnail: ep7 },
];

const Home = () => {
  const navigate = useNavigate();

  const goToPlayer = (id) => {
    navigate(`/player/${id}`);
  };

  return (
    <div className="home">
      {/* Banner Section */}
      <div className="banner">
        <img src={squid_game_banner} alt="Squid Game Banner" className="banner-image" />
        <div className="banner-content">
          <h1 className="series-title">Squid Game</h1>
          <p className="series-meta">2024 | Seasons 2 | HD</p>
          <p className="series-tags"> <span className="maturity-rating"><span className="maturity-number">A</span></span> Crude humor, gore, language, nudity, sex, substances, suicide, tobacco use, violence</p>
          {/* <div className="banner-buttons">
            <button className="play-button">▶ Play</button>
            <button className="add-button">+ Add to List</button>
          </div> */}
          <p className="series-description">
            With nothing to lose, Seong Gi-hun accepts a strange invitation to compete in thrilling yet deadly children's games for a chance to win 45.6 billion won.
          </p>
        </div>
      </div>

      {/* Metadata */}
      <div className="show-info">
        <p><strong>Cast:</strong> Lee Jung-jae, Lee Byung-hun, Yim Si-wan</p>
        <p><strong>Genres:</strong> TV Dramas, Korean, TV Thrillers</p>
        <p><strong>This show is:</strong> Violent, Suspenseful</p>
      </div>

      {/* Episodes Section */}
      <div className="episodes">
        <h2 className="episodes-title">Episodes</h2>
        <p className="season-meta">Season 2: <span className="maturity-rating"><span className="maturity-number">A</span></span> crude humor, nudity, sex, suicide, tobacco use, violence</p>
        <div className="episode-list">
          {episodes.map((episode) => (
            <div key={episode.id} className="episode-card" onClick={() => goToPlayer(episode.id)}>
              <div className="thumbnail-wrapper">
              <img
                src={episode.thumbnail}
                alt={episode.title}
                className="episode-thumbnail"
              />
              <div className="play-icon">▶</div>
            </div>
              <div className="episode-details">
                <h3 className="episode-title">{episode.id}. {episode.title} <span className="episode-duration">{episode.duration}</span>
                </h3>
                {/* <span className="episode-duration">{episode.duration}</span> */}
                <p className="episode-description">{episode.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
