"use client"
import { 
  BeatLoader, SyncLoader, BarLoader,
  FadeLoader, PacmanLoader, PropagateLoader,
  PuffLoader, PulseLoader, ScaleLoader, ClipLoader,
} from "react-spinners"

type loadersTypes = {
  type?: 'Beat' | 'Sync' | 'Bar' | 'Fade' | 'Pacman' | 'Propagate' | 'Puff' | 'Pulse' | 'Scale' | 'Clip' 
};

export function Loaders({ type, ...props }: loadersTypes) {
  switch (type) {
    case 'Beat':
      return <BeatLoader {...props}/>;
    case 'Sync':
      return <SyncLoader {...props}/>;
    case 'Bar':
      return <BarLoader {...props}/>;
    case 'Fade':
      return <FadeLoader {...props}/>;
    case 'Pacman':
      return <PacmanLoader {...props}/>;
    case 'Propagate':
      return <PropagateLoader {...props}/>;
    case 'Puff':
      return <PuffLoader {...props}/>;
    case 'Scale':
      return <ScaleLoader {...props}/>;
    case 'Clip':
      return <ClipLoader {...props}/>;
    case 'Pulse':
      
    default:
      return <PulseLoader {...props}/>;
  }
}
