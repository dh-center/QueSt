import React, {
  ReactElement,
  PropsWithChildren,
  useState,
  createContext,
  useContext,
  useEffect,
  Dispatch,
  SetStateAction, useRef
} from 'react';
import qtsApi from '../utils/qtsApi';
import Sound from 'react-native-sound';

// Enable playback in silence mode
Sound.setCategory('Playback');


/**
 * Props of AudioAccompanimentContext
 */
interface AudioAccompanimentContextValue {
  /**
   * Is audio accompaniment enabled now
   */
  isPlaying: boolean;

  /**
   * Setter for audio accompaniment enabled status
   */
  setIsPlaying: Dispatch<SetStateAction<boolean>>;

  /**
   * Setter for new text
   */
  setText: (value: string) => void;
}

const AudioAccompanimentContext = createContext<AudioAccompanimentContextValue | undefined>(undefined);

type AudioAccompanimentProviderProps = PropsWithChildren<unknown> & {
  /**
   * Current Quest id
   */
  questId: string;
};

/**
 * Provider for AudioAccompanimentContext
 *
 * @param props - children
 */
export function AudioAccompanimentProvider(props: AudioAccompanimentProviderProps): ReactElement {
  const [isPlaying, setIsPlaying] = useState(false);
  const [text, setText] = useState<string | null>(null);
  const sound = useRef<Sound | null>(null);

  const loadAudio = async (): Promise<void> => {
    if (!text) {
      return;
    }
    const path = await qtsApi.getAudio(props.questId, text);

    console.log(path);

    sound.current = new Sound(path, '', (error) => {
      if (error) {
        console.log('failed to load the sound', error);

        return;
      }
      if (!sound.current) {
        return;
      }
      // loaded successfully
      console.log('duration in seconds: ' + sound.current.getDuration() + ' number of channels: ' + sound.current.getNumberOfChannels());

      if (!isPlaying) {
        return;
      }
      // Play the sound with an onEnd callback
      console.log('start play');
      sound.current.play((success) => {
        if (success) {
          setIsPlaying(!isPlaying);
          console.log('successfully finished playing');
        } else {
          console.log('playback failed due to audio decoding errors');
        }
      });
    });
  };

  useEffect(() => {
    console.log('call effect');
    sound.current?.stop();
    sound.current?.release();
    sound.current = null;
    if (isPlaying) {
      console.log('load audio');
      loadAudio();
    }
  }, [isPlaying, text]);


  return (
    <AudioAccompanimentContext.Provider
      value={{
        isPlaying,
        setIsPlaying,
        setText,
      }}
    >
      {props.children}
    </AudioAccompanimentContext.Provider>
  );
}

/**
 * Helper hook for accessing data in AudioAccompanimentContext
 */
export default function useAudioAccompanimentContext(): AudioAccompanimentContextValue {
  const context = useContext(AudioAccompanimentContext);

  if (!context) {
    throw new Error('You should use this hook only inside AudioAccompanimentProvider');
  }

  return context;
}
