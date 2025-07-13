import type { RenderContext, NodeRenderer } from "@oomol/types/render";

import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";

import { App } from "./App";

const renderer: NodeRenderer = {
  setup(dom: HTMLDivElement, context: RenderContext) {
    const root = createRoot(dom);
    const styleURI = context.resolveStaticResource("oo-render/dist/style.css");

    context.events.on("message", event => {
      const equityDataSource = (event.payload as any)?.equity_rows
      const contribDataSource = (event.payload as any)?.contrib_rows
      const pnlDataSource = (event.payload as any)?.pnl_rows
      const greeksDataSource = (event.payload as any)?.greeks_rows

      root.render(
        <>
          <link rel="stylesheet" href={styleURI} />
          <App contextProps={equityDataSource} title="Equity Valuation"/>
          <App contextProps={contribDataSource} title="Contrib"/>
          <App contextProps={pnlDataSource} title="PnL Info"/>
          <App contextProps={greeksDataSource} title="Greeks Info"/>
        </>
      );
    });

    root.render(
      <>
        <link rel="stylesheet" href={styleURI} />
        <App contextProps={"Empty"} title="Empty"/>
      </>
    );

    return () => {
      root.unmount();
    };
  },
};

export default renderer;
