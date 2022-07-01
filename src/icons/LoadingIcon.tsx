import type { FC } from "react";
import React from "react";

export const LoadingIcon: FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      style={{
        margin: "auto",
        background: "transparent",
        display: "block",
        shapeRendering: "auto"
      }}
      width="200px"
      height="200px"
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid"
    >
      <rect x="22.5" y="22.5" width="24" height="24" fill="#6b7280">
        <animate
          attributeName="fill"
          values="#e5e7eb;#6b7280;#6b7280"
          keyTimes="0;0.25;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="53.5" y="22.5" width="24" height="24" fill="#6b7280">
        <animate
          attributeName="fill"
          values="#e5e7eb;#6b7280;#6b7280"
          keyTimes="0;0.25;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.25s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="22.5" y="53.5" width="24" height="24" fill="#6b7280">
        <animate
          attributeName="fill"
          values="#e5e7eb;#6b7280;#6b7280"
          keyTimes="0;0.25;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.75s"
          calcMode="discrete"
        ></animate>
      </rect>
      <rect x="53.5" y="53.5" width="24" height="24" fill="#6b7280">
        <animate
          attributeName="fill"
          values="#e5e7eb;#6b7280;#6b7280"
          keyTimes="0;0.25;1"
          dur="1s"
          repeatCount="indefinite"
          begin="0.5s"
          calcMode="discrete"
        ></animate>
      </rect>
    </svg>
  );
};
