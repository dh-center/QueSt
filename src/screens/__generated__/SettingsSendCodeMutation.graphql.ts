/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SettingsSendCodeMutationVariables = {
    email: string;
};
export type SettingsSendCodeMutationResponse = {
    readonly user: {
        readonly sendCodeForPasswordReset: boolean;
    };
};
export type SettingsSendCodeMutation = {
    readonly response: SettingsSendCodeMutationResponse;
    readonly variables: SettingsSendCodeMutationVariables;
};



/*
mutation SettingsSendCodeMutation(
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
    "name": "SettingsSendCodeMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SettingsSendCodeMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "04016d43836c55ec77402abcc8ade9ef",
    "id": null,
    "metadata": {},
    "name": "SettingsSendCodeMutation",
    "operationKind": "mutation",
    "text": "mutation SettingsSendCodeMutation(\n  $email: String!\n) {\n  user {\n    sendCodeForPasswordReset(email: $email)\n  }\n}\n"
  }
};
})();
(node as any).hash = '81226ea752cfcddb9078b39dc552da4a';
export default node;
