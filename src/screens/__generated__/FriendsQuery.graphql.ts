/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FriendsQueryVariables = {};
export type FriendsQueryResponse = {
    readonly user: {
        readonly username: string;
        readonly friends: ReadonlyArray<{
            readonly id: string;
            readonly firstName: string | null;
            readonly username: string;
            readonly level: number;
            readonly photo: string | null;
        }>;
        readonly friendRequests: ReadonlyArray<{
            readonly id: string;
            readonly firstName: string | null;
            readonly username: string;
            readonly level: number;
            readonly photo: string | null;
        }>;
    };
};
export type FriendsQuery = {
    readonly response: FriendsQueryResponse;
    readonly variables: FriendsQueryVariables;
};



/*
query FriendsQuery {
  user: me {
    username
    friends {
      id
      firstName
      username
      level
      photo
    }
    friendRequests {
      id
      firstName
      username
      level
      photo
    }
    id
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  (v1/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "firstName",
    "storageKey": null
  },
  (v0/*: any*/),
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
    "name": "photo",
    "storageKey": null
  }
],
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "friends",
  "plural": true,
  "selections": (v2/*: any*/),
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "friendRequests",
  "plural": true,
  "selections": (v2/*: any*/),
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendsQuery",
    "selections": [
      {
        "alias": "user",
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/)
        ],
        "storageKey": null
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "FriendsQuery",
    "selections": [
      {
        "alias": "user",
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v0/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v1/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "cb23291622bbf19a1564074282716053",
    "id": null,
    "metadata": {},
    "name": "FriendsQuery",
    "operationKind": "query",
    "text": "query FriendsQuery {\n  user: me {\n    username\n    friends {\n      id\n      firstName\n      username\n      level\n      photo\n    }\n    friendRequests {\n      id\n      firstName\n      username\n      level\n      photo\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = '02edcb0a2a5f30a3747ead1afbaf7a89';
export default node;
