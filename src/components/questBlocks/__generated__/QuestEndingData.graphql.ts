/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestEndingData = {
    readonly personsCards: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ReceivedCardsData">;
    }>;
    readonly linkedAchievements: ReadonlyArray<{
        readonly " $fragmentRefs": FragmentRefs<"ReceivedAchievementsData">;
    }>;
    readonly " $refType": "QuestEndingData";
};
export type QuestEndingData$data = QuestEndingData;
export type QuestEndingData$key = {
    readonly " $data"?: QuestEndingData$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestEndingData">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestEndingData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "Person",
      "kind": "LinkedField",
      "name": "personsCards",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ReceivedCardsData"
        }
      ],
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Achievement",
      "kind": "LinkedField",
      "name": "linkedAchievements",
      "plural": true,
      "selections": [
        {
          "args": null,
          "kind": "FragmentSpread",
          "name": "ReceivedAchievementsData"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "Quest",
  "abstractKey": null
};
(node as any).hash = '2de1bf1306a45c362e425241792d9c57';
export default node;
