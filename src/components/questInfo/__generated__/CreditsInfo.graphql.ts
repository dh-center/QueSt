/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ReaderFragment } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CreditsInfo = {
    readonly credits: {
        readonly blocks: ReadonlyArray<unknown>;
    } | null;
    readonly " $refType": "CreditsInfo";
};
export type CreditsInfo$data = CreditsInfo;
export type CreditsInfo$key = {
    readonly " $data"?: CreditsInfo$data;
    readonly " $fragmentRefs": FragmentRefs<"CreditsInfo">;
};



const node: ReaderFragment = {
  "argumentDefinitions": [],
  "kind": "Fragment",
  "metadata": null,
  "name": "CreditsInfo",
  "selections": [
    {
      "alias": null,
      "args": null,
      "concreteType": "EditorData",
      "kind": "LinkedField",
      "name": "credits",
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
    }
  ],
  "type": "Quest",
  "abstractKey": null
};
(node as any).hash = '63b253b053a2d4f9f8979b3882629a97';
export default node;
