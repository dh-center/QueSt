/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ResetPasswordCodeMutationVariables = {
    email: string;
};
export type ResetPasswordCodeMutationResponse = {
    readonly user: {
        readonly sendCodeForPasswordReset: boolean;
    };
};
export type ResetPasswordCodeMutation = {
    readonly response: ResetPasswordCodeMutationResponse;
    readonly variables: ResetPasswordCodeMutationVariables;
};



/*
mutation ResetPasswordCodeMutation(
  $email: String!
) {
  user {
    sendCodeForPasswordReset(email: $email)
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "email"
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
            "kind": "Variable",
            "name": "email",
            "variableName": "email"
          }
        ],
        "kind": "ScalarField",
        "name": "sendCodeForPasswordReset",
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
    "name": "ResetPasswordCodeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ResetPasswordCodeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "bff42488f05fdee836b19c8fc50c99fe",
    "id": null,
    "metadata": {},
    "name": "ResetPasswordCodeMutation",
    "operationKind": "mutation",
    "text": "mutation ResetPasswordCodeMutation(\n  $email: String!\n) {\n  user {\n    sendCodeForPasswordReset(email: $email)\n  }\n}\n"
  }
};
})();
(node as any).hash = '44843d5f42f567211910edcf5f067945';
export default node;
