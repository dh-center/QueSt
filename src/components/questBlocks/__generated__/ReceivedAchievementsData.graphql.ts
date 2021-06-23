/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReceivedAchievementsData = ReadonlyArray<{
    readonly id: string;
    readonly name: string;
    readonly " $refType": "ReceivedAchievementsData";
}>;
export type ReceivedAchievementsData$data = ReceivedAchievementsData;
export type ReceivedAchievementsData$key = ReadonlyArray<{
    readonly " $data"?: ReceivedAchievementsData$data;
    readonly " $fragmentRefs": FragmentRefs<"ReceivedAchievementsData">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ReceivedAchievementsData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "name",
      "storageKey": null
    }
  ],
  "type": "Achievement",
  "abstractKey": null
};
(node as any).hash = '1eea93639c19f5506881680b56fc0d42';
export default node;
