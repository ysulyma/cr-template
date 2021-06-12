import {Script} from "ractive-player";

export const markers = [
  ["intro/", "1:00"]
] as [string, string][];

export const script = new Script(markers);
