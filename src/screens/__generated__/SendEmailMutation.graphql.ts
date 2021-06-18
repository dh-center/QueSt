/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type SendEmailMutationVariables = {
    email: string;
};
export type SendEmailMutationResponse = {
    readonly user: {
        readonly sendCodeForPasswordReset: boolean;
    };
};
export type SendEmailMutation = {
    readonly response: SendEmailMutationResponse;
    readonly variables: SendEmailMutationVariables;
};



/*
mutation SendEmailMutation(
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
    "name": "SendEmailMutation",
    "selections": (v1/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "SendEmailMutation",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "28a06521c9356cd545ebf9d0e691fdc2",
    "id": null,
    "metadata": {},
    "name": "SendEmailMutation",
    "operationKind": "mutation",
    "text": "mutation SendEmailMutation(\n  $email: String!\n) {\n  user {\n    sendCodeForPasswordReset(email: $email)\n  }\n}\n"
  }
};
})();
(node as any).hash = '76a5af3a9990d4896ba9b332fd141792';
export default node;
