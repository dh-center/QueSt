/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type LocationInstanceQuestBlockQueryVariables = {
    id: unknown;
};
export type LocationInstanceQuestBlockQueryResponse = {
    readonly locationInstance: {
        readonly id: string;
        readonly location: {
            readonly id: string;
            readonly latitude: number | null;
            readonly longitude: number | null;
        };
    } | null;
};
export type LocationInstanceQuestBlockQuery = {
    readonly response: LocationInstanceQuestBlockQueryResponse;
    readonly variables: LocationInstanceQuestBlockQueryVariables;
};



/*
query LocationInstanceQuestBlockQuery(
  $id: GlobalId!
) {
  locationInstance(id: $id) {
    id
    location {
      id
      latitude
      longitude
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": [
      {
        "kind": "Variable",
        "name": "id",
        "variableName": "id"
      }
    ],
    "concreteType": "LocationInstance",
    "kind": "LinkedField",
    "name": "locationInstance",
    "plural": false,
    "selections": [
      (v1/*: any*/),
      {
        "alias": null,
        "args": null,
        "concreteType": "Location",
        "kind": "LinkedField",
        "name": "location",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "latitude",
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "longitude",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "LocationInstanceQuestBlockQuery",
    "selections": (v2/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "LocationInstanceQuestBlockQuery",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "e553fb7c424a2f944708c86a28bf189a",
    "id": null,
    "metadata": {},
    "name": "LocationInstanceQuestBlockQuery",
    "operationKind": "query",
    "text": "query LocationInstanceQuestBlockQuery(\n  $id: GlobalId!\n) {\n  locationInstance(id: $id) {\n    id\n    location {\n      id\n      latitude\n      longitude\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2685f2d878593167f2b080996c77860a';
export default node;
