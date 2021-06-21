/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ChangePasswordSendingMutationVariables = {
    email: string;
};
export type ChangePasswordSendingMutationResponse = {
    readonly user: {
        readonly sendCodeForPasswordReset: boolean;
    };
};
export type ChangePasswordSendingMutation = {
    readonly response: ChangePasswordSendingMutationResponse;
    readonly variables: ChangePasswordSendingMutationVariables;
};



/*
mutation ChangePasswordSendingMutation(
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
    "name": "ChangePasswordSendingMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "ChangePasswordSendingMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "11de84d46850c8fb29f24a16009280e3",
    "id": null,
    "metadata": {},
    "name": "ChangePasswordSendingMutation",
    "operationKind": "mutation",
    "text": "mutation ChangePasswordSendingMutation(\n  $email: String!\n) {\n  user {\n    sendCodeForPasswordReset(email: $email)\n  }\n}\n"
  }
};
})();
(node as any).hash = '37032129786cc5b5853eab0130871446';
export default node;
