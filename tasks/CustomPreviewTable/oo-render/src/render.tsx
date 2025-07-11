import type { RenderContext, NodeRenderer } from "@oomol/types/render";

import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const renderer: NodeRenderer = {
  setup(dom: HTMLDivElement, context: RenderContext) {
    const root = createRoot(dom);
    const styleURI = context.resolveStaticResource("oo-render/dist/style.css");

    context.events.on("message", event => {
      root.render(
        <>
          <link rel="stylesheet" href={styleURI} />
          <App contextProps={event.payload} />
        </>
      );
    });

    root.render(
      <>
        <link rel="stylesheet" href={styleURI} />
        <App contextProps={"Empty"} />
      </>
    );

    return () => {
      root.unmount();
    };
  },
};

export default renderer;
