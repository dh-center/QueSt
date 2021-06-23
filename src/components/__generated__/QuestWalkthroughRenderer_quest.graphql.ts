/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestWalkthroughRenderer_quest = {
    readonly id: string;
    readonly data: {
        readonly blocks: ReadonlyArray<unknown>;
    } | null;
    readonly " $fragmentRefs": FragmentRefs<"QuestEndingData">;
    readonly " $refType": "QuestWalkthroughRenderer_quest";
};
export type QuestWalkthroughRenderer_quest$data = QuestWalkthroughRenderer_quest;
export type QuestWalkthroughRenderer_quest$key = {
    readonly " $data"?: QuestWalkthroughRenderer_quest$data;
    readonly " $fragmentRefs": FragmentRefs<"QuestWalkthroughRenderer_quest">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "QuestWalkthroughRenderer_quest",
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
      "concreteType": "EditorData",
      "kind": "LinkedField",
      "name": "data",
      "plural": false,
      "selections": [
        {
          "alias": null,
          "args": null,
          "kind": "ScalarField",
          "name": "blocks",
          "storageKey": null
        }
      ],
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "QuestEndingData"
    }
  ],
  "type": "Quest",
  "abstractKey": null
};
(node as any).hash = '5942d2217981d333ee706525fa7fd241';
export default node;
