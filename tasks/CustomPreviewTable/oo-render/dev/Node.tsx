import styles from "./Node.module.css";

import React, { useCallback, useState } from "react";

const MIN_NODE_WIDTH = 200;

export const Node = ({ children }: React.PropsWithChildren) => {
  const [width, setWidth] = useState(200);
  const startTrack = useCallback(
    (event: React.PointerEvent<HTMLDivElement>): void => {
      if (
        !event.isPrimary ||
        event.target !== event.currentTarget ||
        (event.button != null && event.button !== 0)
      ) {
        return;
      }
      event.preventDefault();
      event.stopPropagation();

      const startPointerX = event.clientX;
      const startWidth = 200;

      const mask = document.createElement("div");
      mask.className = styles.mask;
      document.body.append(mask);

      function handleTrackMove(event: PointerEvent): void {
        if (!event.isPrimary) {
          return;
        }
        if (event.buttons <= 0) {
          handleTrackEnd();
          return;
        }
        event.preventDefault();
        event.stopPropagation();

        const nodeDeltaX = event.clientX - startPointerX;
        const width = Math.max(MIN_NODE_WIDTH, startWidth + nodeDeltaX);
        setWidth(width);
      }

      function handleTrackEnd(): void {
        mask.remove();
        window.removeEventListener("pointermove", handleTrackMove);
        window.removeEventListener("pointerup", handleTrackEnd);
        window.removeEventListener("pointercancel", handleTrackEnd);
        window.removeEventListener("blur", handleTrackEnd);
      }

      window.addEventListener("pointermove", handleTrackMove);
      window.addEventListener("pointerup", handleTrackEnd, { passive: true });
      window.addEventListener("pointercancel", handleTrackEnd, {
        passive: true,
      });
      window.addEventListener("blur", handleTrackEnd, { passive: true });
    },
    []
  );

  return (
    <div className={styles.container} style={{ width }}>
      <div className={styles.node}>
        <div className={styles.resize} onPointerDown={startTrack}></div>
        <div className={styles.head}></div>
        <div className={styles.handles}></div>
        {children}
      </div>
    </div>
  );
};
