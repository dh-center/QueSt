/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type AwardsAndStats = {
    readonly earnedExp: number;
    readonly personsCards: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly linkedAchievements: ReadonlyArray<{
        readonly id: string;
    }>;
    readonly questProgressState: QuestUserProgressStates;
    readonly distanceInKilometers: number;
    readonly " $refType": "AwardsAndStats";
};
export type AwardsAndStats$data = AwardsAndStats;
export type AwardsAndStats$key = {
    readonly " $data"?: AwardsAndStats$data;
    readonly " $fragmentRefs": FragmentRefs<"AwardsAndStats">;
};



const node: ReaderFragment = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "id",
    "storageKey": null
  }
];
return {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "AwardsAndStats",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "earnedExp",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Person",
      "kind": "LinkedField",
      "name": "personsCards",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "concreteType": "Achievement",
      "kind": "LinkedField",
      "name": "linkedAchievements",
      "plural": true,
      "selections": (v0/*: any*/),
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "questProgressState",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "distanceInKilometers",
      "storageKey": null
    }
  ],
  "type": "Quest",
  "abstractKey": null
};
})();
(node as any).hash = 'ee013f174f51115e67af82b8df667e97';
export default node;
