/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsMutationVariables = {
    avatar: string;
};
export type SettingsMutationResponse = {
    readonly user: {
        readonly update: {
            readonly record: {
                readonly id: string;
                readonly username: string;
                readonly photo: string | null;
            };
        };
    };
};
export type SettingsMutation = {
    readonly response: SettingsMutationResponse;
    readonly variables: SettingsMutationVariables;
};



/*
mutation SettingsMutation(
  $avatar: String!
) {
  user {
    update(input: {photo: $avatar}) {
      record {
        id
        username
        photo
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
    "name": "avatar"
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
                "name": "photo",
                "variableName": "avatar"
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
              },
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
    "name": "SettingsMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "7d1a790287e6784e1223c1529dea8c51",
    "id": null,
    "metadata": {},
    "name": "SettingsMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsMutation(\n  $avatar: String!\n) {\n  user {\n    update(input: {photo: $avatar}) {\n      record {\n        id\n        username\n        photo\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '72dc72cf46cd24ba657bb1eef6732536';
export default node;
