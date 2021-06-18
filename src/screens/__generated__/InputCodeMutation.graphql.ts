/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type InputCodeMutationVariables = {
    email: string;
};
export type InputCodeMutationResponse = {
    readonly user: {
        readonly sendCodeForPasswordReset: boolean;
    };
};
export type InputCodeMutation = {
    readonly response: InputCodeMutationResponse;
    readonly variables: InputCodeMutationVariables;
};



/*
mutation InputCodeMutation(
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
    "name": "InputCodeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "InputCodeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "f63ca93f1e08be7c62bddc0649419d96",
    "id": null,
    "metadata": {},
    "name": "InputCodeMutation",
    "operationKind": "mutation",
    "text": "mutation InputCodeMutation(\n  $email: String!\n) {\n  user {\n    sendCodeForPasswordReset(email: $email)\n  }\n}\n"
  }
};
})();
(node as any).hash = '7ce724ad595b8412878f3d0a292b4d91';
export default node;
