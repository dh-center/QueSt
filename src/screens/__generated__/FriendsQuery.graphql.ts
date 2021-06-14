/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendsQueryVariables = {};
export type FriendsQueryResponse = {
    readonly user: {
        readonly id: string;
        readonly username: string;
        readonly friends: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
        }>;
        readonly friendRequests: ReadonlyArray<{
            readonly id: string;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"FriendRequests_data">;
    };
};
export type FriendsQuery = {
    readonly response: FriendsQueryResponse;
    readonly variables: FriendsQueryVariables;
};



/*
query FriendsQuery {
  user: me {
    id
    username
    friends {
      id
      ...FriendButton_data
    }
    friendRequests {
      id
    }
    ...FriendRequests_data
  }
}

fragment FriendButton_data on User {
  firstName
  username
  level
  photo
}

fragment FriendRequests_data on User {
  friendRequests {
    id
    ...FriendButton_data
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v2 = [
  (v0/*: any*/),
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "firstName",
    "storageKey": null
  },
  (v1/*: any*/),
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
];
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "friends",
            "plural": true,
            "selections": [
              (v0/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "FriendButton_data"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "friendRequests",
            "plural": true,
            "selections": [
              (v0/*: any*/)
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "FriendRequests_data"
          }
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
          (v1/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "friends",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "friendRequests",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "e1149d794f41859797b66a3654d1149a",
    "id": null,
    "metadata": {},
    "name": "FriendsQuery",
    "operationKind": "query",
    "text": "query FriendsQuery {\n  user: me {\n    id\n    username\n    friends {\n      id\n      ...FriendButton_data\n    }\n    friendRequests {\n      id\n    }\n    ...FriendRequests_data\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n\nfragment FriendRequests_data on User {\n  friendRequests {\n    id\n    ...FriendButton_data\n  }\n}\n"
  }
};
})();
(node as any).hash = '2d807e5bd9b6a66f4389068f6ad54f46';
export default node;
