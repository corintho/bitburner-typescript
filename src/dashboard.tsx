import { NS } from "@ns";
import React from "react";

export async function main(ns: NS): Promise<void> {
  ns.ui.openTail();
  ns.printRaw(<div style={{color: 'yellow'}}>Hello Tail</div>)
  ns.tprintRaw(<div style={{color: 'lime'}}>Hello Console</div>)
}
