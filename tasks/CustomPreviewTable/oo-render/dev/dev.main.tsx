import type { AppProps } from "../src/App";

import React from "react";
import { createRoot } from "react-dom/client";

import { App } from "../src/App";
import { Node } from "./Node";

const fakeProps: AppProps = {
  contextProps: {
    equity_rows: [{"aa": "aa", "bb":"bb"}],
    pnl_rows: [{"aa": "a2", "bb":"b1"}],
    greeks_rows: [{"aa": "a3", "bb":"b3"}],
    contrib_rows: [{"aa": "a4", "bb":"b4"}],
  },
};

createRoot(document.getElementById("root")!).render(
  <Node>
    <App {...fakeProps} />
  </Node>
);
