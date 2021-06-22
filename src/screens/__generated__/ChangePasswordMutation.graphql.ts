/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangePasswordMutationVariables = {
    email: string;
    code: string;
    password: string;
};
export type ChangePasswordMutationResponse = {
    readonly user: {
        readonly resetPassword: {
            readonly record: {
                readonly id: string;
            };
        };
    };
};
export type ChangePasswordMutation = {
    readonly response: ChangePasswordMutationResponse;
    readonly variables: ChangePasswordMutationVariables;
};



/*
mutation ChangePasswordMutation(
  $email: String!
  $code: String!
  $password: String!
) {
  user {
    resetPassword(input: {email: $email, code: $code, newPassword: $password}) {
      record {
        id
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "code"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "email"
},
v2 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "password"
},
v3 = [
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
                "name": "code",
                "variableName": "code"
              },
              {
                "kind": "Variable",
                "name": "email",
                "variableName": "email"
              },
              {
                "kind": "Variable",
                "name": "newPassword",
                "variableName": "password"
              }
            ],
            "kind": "ObjectValue",
            "name": "input"
          }
        ],
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "resetPassword",
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
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "ChangePasswordMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/),
      (v2/*: any*/)
    ],
    "kind": "Operation",
    "name": "ChangePasswordMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "ef4bab9e04ddde4d12bfde38053c093e",
    "id": null,
    "metadata": {},
    "name": "ChangePasswordMutation",
    "operationKind": "mutation",
    "text": "mutation ChangePasswordMutation(\n  $email: String!\n  $code: String!\n  $password: String!\n) {\n  user {\n    resetPassword(input: {email: $email, code: $code, newPassword: $password}) {\n      record {\n        id\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6cb322d53d84e7803c90ea4147370f28';
export default node;
