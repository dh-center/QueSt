/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CollectionCardData = {
    readonly firstName: unknown | null;
    readonly lastName: unknown | null;
    readonly cardPhotoLink: string | null;
    readonly mainPhotoLink: string | null;
    readonly " $refType": "CollectionCardData";
};
export type CollectionCardData$data = CollectionCardData;
export type CollectionCardData$key = {
    readonly " $data"?: CollectionCardData$data;
    readonly " $fragmentRefs": FragmentRefs<"CollectionCardData">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CollectionCardData",
  "selections": [
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "firstName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "lastName",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "cardPhotoLink",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "mainPhotoLink",
      "storageKey": null
    }
  ],
  "type": "Person",
  "abstractKey": null
};
(node as any).hash = '4b89e85d6c9417c8ce4e0b08b3db94e4';
export default node;
