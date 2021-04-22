import { createContext, useState } from "react";

type Episode = {
  title: string;
  members: string;
  thumbnail: string;
  duration: number;
  url: string;
}

interface PlayerContextData {
  episodesList: Episode[];
  currentEpisodeIndex: number;
  play: (episode: Episode) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider: React.FC = ({ children }) => {
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode: Episode) {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
  }

  return (
    <PlayerContext.Provider value={{ episodesList, currentEpisodeIndex, play }}>
      { children }
    </PlayerContext.Provider>

  )
}
