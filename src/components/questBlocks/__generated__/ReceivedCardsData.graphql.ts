/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type ReceivedCardsData = ReadonlyArray<{
    readonly id: string;
    readonly " $fragmentRefs": FragmentRefs<"CollectionCardData">;
    readonly " $refType": "ReceivedCardsData";
}>;
export type ReceivedCardsData$data = ReceivedCardsData;
export type ReceivedCardsData$key = ReadonlyArray<{
    readonly " $data"?: ReceivedCardsData$data;
    readonly " $fragmentRefs": FragmentRefs<"ReceivedCardsData">;
}>;



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": {
    "plural": true
  },
  "name": "ReceivedCardsData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "id",
      "storageKey": null
    },
    {
      "args": null,
      "kind": "FragmentSpread",
      "name": "CollectionCardData"
    }
  ],
  "type": "Person",
  "abstractKey": null
};
(node as any).hash = '5249f9bb7f4973ed22f32c3c9143c072';
export default node;
