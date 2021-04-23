import { createContext, useState, ReactNode, useContext } from "react";

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
  isLooping: boolean;
  isShuffling: boolean;
  hasNext: boolean;
  hasPrevious: boolean;
  play: (episode: Episode) => void;
  playList: (list: Episode[], index: number) => void;
  togglePlay: () => void;
  toggleLoop: () => void;
  toggleShuffle: () => void;
  playNext: () => void;
  playPrevious: () => void;
  setPlayingState: (state: boolean) => void;
}

const PlayerContext = createContext({} as PlayerContextData)

interface PlayerProviderProps {
  children: ReactNode;
}

export function PlayerProvider({ children }: PlayerProviderProps) {
  const [episodesList, setEpisodesList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isLooping, setIsLooping] = useState(false)
  const [isShuffling, setIsShuffling] = useState(false)

  function play(episode: Episode) {
    setEpisodesList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function playList(list: Episode[], index: number) {
    setEpisodesList(list)
    setCurrentEpisodeIndex(index)
    setIsPlaying(true)
  }
  
  function togglePlay() {
    setIsPlaying(!isPlaying)
  }
  
  function toggleLoop() {
    setIsLooping(!isLooping)
  }
  
  function toggleShuffle() {
    setIsShuffling(!isShuffling)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  const hasPrevious = currentEpisodeIndex > 0
  const hasNext = (currentEpisodeIndex + 1) < episodesList.length

  function playNext() {
    const nextEpisodeIndex = currentEpisodeIndex + 1;

    if (isShuffling) {
      const nextRandomEpisodeIndex = Math.floor(Math.random() * episodesList.length)
      setCurrentEpisodeIndex(nextRandomEpisodeIndex)
    } else if (hasNext) {
      setCurrentEpisodeIndex(nextEpisodeIndex)
    }
  }

  function playPrevious() {
    const prevEpisodeIndex = currentEpisodeIndex - 1;

    if (hasPrevious) setCurrentEpisodeIndex(prevEpisodeIndex)
  }

  return (
    <PlayerContext.Provider value={{
      episodesList,
      currentEpisodeIndex,
      isPlaying,
      isLooping,
      isShuffling,
      play,
      playList,
      hasNext,
      hasPrevious,
      playNext,
      playPrevious,
      togglePlay,
      toggleLoop,
      toggleShuffle,
      setPlayingState
    }}>
      { children }
    </PlayerContext.Provider>

  )
}

export function usePlayer() {
  const context = useContext(PlayerContext)
  if (!context) throw new Error('usePlayer must be used within a PlayerContext.')

  return context
}
