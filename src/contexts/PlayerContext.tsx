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
  isPlaying: boolean;
  play: (episode: Episode) => void;
  togglePlay: () => void;
  setPlayingState: (state: boolean) => void;
}

export const PlayerContext = createContext({} as PlayerContextData)

export const PlayerProvider: React.FC = ({ children }) => {
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <PlayerContext.Provider value={{ episodesList, currentEpisodeIndex, isPlaying, play, togglePlay, setPlayingState }}>
      { children }
    </PlayerContext.Provider>

  )
}
