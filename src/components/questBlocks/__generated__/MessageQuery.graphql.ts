/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type MessageQueryVariables = {
    id: unknown;
    needFetch: boolean;
};
export type MessageQueryResponse = {
    readonly person?: {
        readonly id: string;
        readonly firstName: unknown | null;
        readonly lastName: unknown | null;
        readonly mainPhotoLink: string | null;
    } | null;
    readonly user?: {
        readonly id: string;
        readonly firstName: string | null;
        readonly photo: string | null;
    };
};
export type MessageQuery = {
    readonly response: MessageQueryResponse;
    readonly variables: MessageQueryVariables;
};



/*
query MessageQuery(
  $id: GlobalId!
  $needFetch: Boolean!
) {
  person(id: $id) @include(if: $needFetch) {
    id
    firstName
    lastName
    mainPhotoLink
  }
  user: me @skip(if: $needFetch) {
    id
    firstName
    photo
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  },
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "needFetch"
  }
],
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "firstName",
  "storageKey": null
},
v3 = [
  {
    "condition": "needFetch",
    "kind": "Condition",
    "passingValue": true,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "id",
            "variableName": "id"
          }
        ],
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "person",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
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
            "name": "mainPhotoLink",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  {
    "condition": "needFetch",
    "kind": "Condition",
    "passingValue": false,
    "selections": [
      {
        "alias": "user",
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v1/*: any*/),
          (v2/*: any*/),
          {
            "alias": null,
            "args": null,
            "kind": "ScalarField",
            "name": "photo",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "MessageQuery",
    "selections": (v3/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "MessageQuery",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "7f3de0059c335d94ca1837743f72b840",
    "id": null,
    "metadata": {},
    "name": "MessageQuery",
    "operationKind": "query",
    "text": "query MessageQuery(\n  $id: GlobalId!\n  $needFetch: Boolean!\n) {\n  person(id: $id) @include(if: $needFetch) {\n    id\n    firstName\n    lastName\n    mainPhotoLink\n  }\n  user: me @skip(if: $needFetch) {\n    id\n    firstName\n    photo\n  }\n}\n"
  }
};
})();
(node as any).hash = '976ea17c840971508d4c4b7492296b07';
export default node;
