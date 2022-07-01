import { useEffect, useState } from "react";

import type { SpeechRecognitionEvent } from "lib/recognition";
import { recognition } from "lib/recognition";

export const useSpeechRecognition = () => {
  const [isPermissed, setIsPermissed] = useState(false);
  const [recordedText, setRecordedText] = useState("");
  const [isListening, setIsListening] = useState(false);
  const [isResultReady, setIsResultReady] = useState(false);

  useEffect(() => {
    resetRecognitionState();

    recognition.onresult = (event: SpeechRecognitionEvent) => {
      let name = event.results[0][0].transcript.split(" ")[0].toLocaleLowerCase("tr-TR");

      // If name starts with Turkish "i̇", which has a different char code than
      // English "i", replace it with English "i" because the initial "i" letters
      // in the "names.json" file begins with the English "i". To see what problem
      // this if check solves, open your DevTools console and type the following
      // expression: "i̇" === "i" (which will say "false")
      if (name.charCodeAt(0) === 105 && name.charCodeAt(1) === 775) {
        // "İ" character has a length of 2, so we cut it & replace it with the English "I"
        name = `I${name.slice(2, name.length)}`;
      }

      console.log("Algilanan kelime:", { name });

      setRecordedText(name);
      setIsListening(false);
      setIsResultReady(true);

      haltRecording();
    };

    // Abort listening if/when component unmounts
    () => {
      recognition.abort();
    };
  }, []);

  // Check for microphone permission, update isPermissed state accordingly
  useEffect(() => {
    /* eslint-disable */
    // @ts-ignore: Type '"microphone"' is not assignable to type 'PermissionName'.
    navigator.permissions.query({ name: "microphone" }).then((status) => {
      /* eslint-enable */
      setIsPermissed(status.state === "granted");

      status.onchange = () => {
        setIsPermissed(status.state === "granted");
      };
    });
  }, []);

  const speechToText = () => {
    // Do this if we're not already listening
    if (!isListening) {
      recognition.start();
      setIsListening(true);
      setIsResultReady(false);
    }
  };

  const haltRecording = () => {
    recognition.abort();
    setIsListening(false);
  };

  const requestPermission = () => {
    navigator.mediaDevices.getUserMedia({ video: false, audio: true });
  };

  const resetRecognitionState = () => {
    setRecordedText("");
    setIsListening(false);
    setIsResultReady(false);
  };

  return {
    recordedText,
    isListening,
    isPermissed,
    speechToText,
    haltRecording,
    requestPermission,
    isResultReady,
    resetRecognitionState
  };
};
