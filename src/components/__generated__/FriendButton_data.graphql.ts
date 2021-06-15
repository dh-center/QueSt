/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendButton_data = {
    readonly firstName: string | null;
    readonly username: string;
    readonly level: number;
    readonly photo: string | null;
    readonly " $refType": "FriendButton_data";
};
export type FriendButton_data$data = FriendButton_data;
export type FriendButton_data$key = {
    readonly " $data"?: FriendButton_data$data;
    readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendButton_data",
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
      "name": "username",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "level",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "photo",
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = 'f76af3f0e063c0c49fadb37ac9af4a8e';
export default node;
