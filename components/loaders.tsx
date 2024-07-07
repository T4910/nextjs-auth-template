"use client"
import { 
  BeatLoader, SyncLoader, BarLoader,
  FadeLoader, PacmanLoader, PropagateLoader,
  PuffLoader, PulseLoader, ScaleLoader, ClipLoader
} from "react-spinners"

type loadersTypes = {
  type?: 'Beat' | 'Sync' | 'Bar' | 'Fade' | 'Pacman' | 'Propagate' | 'Puff' | 'Pulse' | 'Scale' | 'Clip' 
};

export function Loaders({ type }: loadersTypes) {
  switch (type) {
    case 'Beat':
      return <BeatLoader />;
    case 'Sync':
      return <SyncLoader />;
    case 'Bar':
      return <BarLoader />;
    case 'Fade':
      return <FadeLoader />;
    case 'Pacman':
      return <PacmanLoader />;
    case 'Propagate':
      return <PropagateLoader />;
    case 'Puff':
      return <PuffLoader />;
    case 'Scale':
      return <ScaleLoader />;
    case 'Clip':
      return <ClipLoader />;
    case 'Pulse':
      
    default:
      return <PulseLoader />;
  }
}
