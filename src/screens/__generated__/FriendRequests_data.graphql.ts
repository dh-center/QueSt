/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendRequests_data = {
    readonly friendRequests: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
    }>;
    readonly " $refType": "FriendRequests_data";
};
export type FriendRequests_data$data = FriendRequests_data;
export type FriendRequests_data$key = {
    readonly " $data"?: FriendRequests_data$data;
    readonly " $fragmentRefs": FragmentRefs<"FriendRequests_data">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "FriendRequests_data",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "User",
      "kind": "LinkedField",
      "name": "friendRequests",
      "plural": true,
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
          "name": "FriendButton_data"
        }
      ],
      "storageKey": null
    }
  ],
  "type": "User",
  "abstractKey": null
};
(node as any).hash = '6e8c5ee2c15f905c478374340c5074bc';
export default node;
