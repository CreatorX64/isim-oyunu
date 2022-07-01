import type { FC } from "react";
import React from "react";

import styles from "styles/HowToPlay.module.css";

interface HowToPlayProps {
  onClose: () => void;
}

export const HowToPlay: FC<HowToPlayProps> = ({ onClose }) => {
  return (
    <article className={styles.howToPlay}>
      <h1>nasıl oynanır?</h1>

      <p>bu oyunda bilgisayar ve senin aranda 8 saniyelik tur değişimleri olur.</p>

      <p>
        her turda, sırası olan kişi kimse, bir önceki turda söylenmiş olan ismin son harfiyle
        başlayan bir isim bulması gerekir.
      </p>

      <p>
        ilk turda bilgisayar ekrana rastgele bir isim yazarak bu süreci başlatır. bilgisayar kendi
        sırası tekrar geldiği zaman otomatik olarak tekrar isim bulup ekrana yazar.
      </p>

      <p>
        sen ise sıran geldiğinde bulduğun ismi mikrofonuna konuşarak söylersin ve bu isim ekrana
        yazılır.
      </p>

      <p>
        söylediğin isim yanlış harfle başlıyorsa, daha önceden söylenmişse, veya süren dolduysa
        oyunu kaybedersin ಥ_ಥ
      </p>

      <p>bol şans!</p>

      <button type="button" className="link" onClick={onClose}>
        &lt; geri dön
      </button>
    </article>
  );
};
