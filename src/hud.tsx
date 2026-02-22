import { NS, UserInterfaceTheme } from "@ns";
import React from "react";
import { domDocument, ReactDOM } from "./react/libReact";

export async function main(ns: NS): Promise<void> {
  // const doc = eval('document');
  const doc = domDocument;

  const hook0 = doc.getElementById('overview-extra-hook-0');
  const hook1 = doc.getElementById('overview-extra-hook-1');
  const hook2 = doc.getElementById('overview-extra-hook-2');

  const theme = ns.ui.getTheme();

  if (hook0 === null || hook1 === null || hook2 === null) {
    ns.print("ERROR- Unable to find hooks for overview");
    return;
  }

  ns.atExit(async () => {
    // Need to wait to unmount without issues
    await ns.asleep(1000);
    ReactDOM.unmountComponentAtNode(hook0);
    ReactDOM.unmountComponentAtNode(hook1);
    hook2.innerText = '';
  });

  while (true) {
    try {
      // Define stats as an array of label/value pairs
      const stats = [
        { label: 'Karma', value: ns.heart.break().toPrecision(8) },
        { label: 'People Killed', value: ns.getPlayer().numPeopleKilled }
      ];

      // Render all labels and all values
      ReactDOM.render(
        <>{stats.map((stat, i) => <HP key={i} theme={theme}>{stat.label}</HP>)}</>,
        hook0
      );
      ReactDOM.render(
        <>{stats.map((stat, i) => <HP key={i} theme={theme}>{stat.value}</HP>)}</>,
        hook1
      );
    } catch (err) {
      ns.print("ERROR: Update Skipped: " + String(err));
    }
    await ns.asleep(1000);
  }
}

type HPProps = {
  theme: UserInterfaceTheme;
  children?: React.ReactNode;
};

const HP: React.FC<HPProps> = ({ theme, children }) => (
  <div style={{ color: theme.hp }}>{children}</div>
);
