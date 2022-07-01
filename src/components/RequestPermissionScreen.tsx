import type { FC } from "react";
import React, { useEffect } from "react";

import { useSpeechRecognition } from "hooks/useSpeechRecognition";
import { Loading } from "components/Loading";

export const RequestPermissionScreen: FC = () => {
  const { requestPermission } = useSpeechRecognition();

  useEffect(() => {
    requestPermission();
  }, []);

  return (
    <div>
      <Loading message="lütfen mikrofon kullanımı için izin ver (っ◕‿◕)っ" />
    </div>
  );
};
