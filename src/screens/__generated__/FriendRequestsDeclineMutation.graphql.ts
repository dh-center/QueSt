/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendRequestsDeclineMutationVariables = {
    userId: unknown;
};
export type FriendRequestsDeclineMutationResponse = {
    readonly user: {
        readonly rejectFriendRequest: {
            readonly record: {
                readonly id: string;
                readonly friends: ReadonlyArray<{
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
                }>;
                readonly friendRequests: ReadonlyArray<{
                    readonly id: string;
                }>;
            };
        };
    };
};
export type FriendRequestsDeclineMutation = {
    readonly response: FriendRequestsDeclineMutationResponse;
    readonly variables: FriendRequestsDeclineMutationVariables;
};



/*
mutation FriendRequestsDeclineMutation(
  $userId: GlobalId!
) {
  user {
    rejectFriendRequest(id: $userId) {
      record {
        id
        friends {
          id
          ...FriendButton_data
        }
        friendRequests {
          id
        }
      }
    }
  }
}

fragment FriendButton_data on User {
  firstName
  username
  level
  photo
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "userId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "userId"
  }
],
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v3 = {
  "alias": null,
  "args": null,
  "concreteType": "User",
  "kind": "LinkedField",
  "name": "friendRequests",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendRequestsDeclineMutation",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "UpdateUserPayload",
            "kind": "LinkedField",
            "name": "rejectFriendRequest",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "friends",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
                      {
                        "args": null,
                        "kind": "FragmentSpread",
                        "name": "FriendButton_data"
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendRequestsDeclineMutation",
    "selections": [
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
            "args": (v1/*: any*/),
            "concreteType": "UpdateUserPayload",
            "kind": "LinkedField",
            "name": "rejectFriendRequest",
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
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "concreteType": "User",
                    "kind": "LinkedField",
                    "name": "friends",
                    "plural": true,
                    "selections": [
                      (v2/*: any*/),
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
                        "name": "username",
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
                        "name": "photo",
                        "storageKey": null
                      }
                    ],
                    "storageKey": null
                  },
                  (v3/*: any*/)
                ],
                "storageKey": null
              }
            ],
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "488824ae2363fb46615903ab55ac54c3",
    "id": null,
    "metadata": {},
    "name": "FriendRequestsDeclineMutation",
    "operationKind": "mutation",
    "text": "mutation FriendRequestsDeclineMutation(\n  $userId: GlobalId!\n) {\n  user {\n    rejectFriendRequest(id: $userId) {\n      record {\n        id\n        friends {\n          id\n          ...FriendButton_data\n        }\n        friendRequests {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n"
  }
};
})();
(node as any).hash = '163bd40e5f0d709f20af21c64def1671';
export default node;
