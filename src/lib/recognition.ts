interface ISpeechRecognition {
  lang: string;
  continuous: boolean;
  interimResults: boolean;
  maxAlternatives: number;
  abort: () => void;
  start: () => void;
  stop: () => void;
  onspeechend: () => void;
  onstart: () => void;
  onend: () => void;
  onresult: (event: SpeechRecognitionEvent) => void;
}

interface ISpeechRecognitionWithConstructor {
  new (): ISpeechRecognition;
}

interface SpeechRecognitionAlternative {
  transcript: string;
  confidence: number;
}

interface SpeechRecognitionResult {
  isFinal: boolean;
  length: number;
  [index: number]: SpeechRecognitionAlternative;
}

export interface SpeechRecognitionEvent {
  results: SpeechRecognitionResult[];
}

type AppWindow = Window &
  typeof globalThis & {
    SpeechRecognition: ISpeechRecognitionWithConstructor;
    webkitSpeechRecognition: ISpeechRecognitionWithConstructor;
  };

const SpeechRecognition =
  (window as AppWindow).SpeechRecognition || (window as AppWindow).webkitSpeechRecognition;

export const recognition = new SpeechRecognition();

// Transcribe spoke words in Turkish language
recognition.lang = "tr";
// Return continuous results (i.e. don't stop speech recognition until we do it explicitly)
recognition.continuous = true;
