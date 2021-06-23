/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type AchievementData = {
    readonly id: string;
    readonly name: string;
    readonly " $refType": "AchievementData";
};
export type AchievementData$data = AchievementData;
export type AchievementData$key = {
    readonly " $data"?: AchievementData$data;
    readonly " $fragmentRefs": FragmentRefs<"AchievementData">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AchievementData",
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
(node as any).hash = 'e56c9a75fa23ca91cc7f864f148c9fa8';
export default node;
