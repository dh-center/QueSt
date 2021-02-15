/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type ProfileQueryVariables = {};
export type ProfileQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly username: string;
        readonly photo: string | null;
        readonly firstName: string | null;
        readonly level: number;
        readonly exp: number;
    };
};
export type ProfileQuery = {
    readonly response: ProfileQueryResponse;
    readonly variables: ProfileQueryVariables;
};



/*
query ProfileQuery {
  user: me {
    id
    username
    photo
    firstName
    level
    exp
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": "user",
    "args": null,
    "concreteType": "User",
    "kind": "LinkedField",
    "name": "me",
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
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "firstName",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "level",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "exp",
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "ProfileQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "ProfileQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "6b9e6f2c462973a676a13facf991c9eb",
    "id": null,
    "metadata": {},
    "name": "ProfileQuery",
    "operationKind": "query",
    "text": "query ProfileQuery {\n  user: me {\n    id\n    username\n    photo\n    firstName\n    level\n    exp\n  }\n}\n"
  }
};
})();
(node as any).hash = 'f57a2fa39476e0afe48f191897d1938b';
export default node;
