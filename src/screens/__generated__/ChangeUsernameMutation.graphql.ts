/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangeUsernameMutationVariables = {
    username: string;
};
export type ChangeUsernameMutationResponse = {
    readonly user: {
        readonly update: {
            readonly record: {
                readonly id: string;
                readonly username: string;
            };
        };
    };
};
export type ChangeUsernameMutation = {
    readonly response: ChangeUsernameMutationResponse;
    readonly variables: ChangeUsernameMutationVariables;
};



/*
mutation ChangeUsernameMutation(
  $username: String!
) {
  user {
    update(input: {username: $username}) {
      record {
        id
        username
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "username"
  }
],
v1 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserMutations",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "fields": [
              {
                "kind": "Variable",
                "name": "username",
                "variableName": "username"
              }
            ],
            "kind": "ObjectValue",
            "name": "input"
          }
        ],
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "update",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "record",
            "plural": false,
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
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              }
            ],
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
    "name": "ChangeUsernameMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangeUsernameMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7a1a9594c335cc6787afb4e04ac082da",
    "id": null,
    "metadata": {},
    "name": "ChangeUsernameMutation",
    "operationKind": "mutation",
    "text": "mutation ChangeUsernameMutation(\n  $username: String!\n) {\n  user {\n    update(input: {username: $username}) {\n      record {\n        id\n        username\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e4d5129028eb1b70e62dec8bb9d1193b';
export default node;
