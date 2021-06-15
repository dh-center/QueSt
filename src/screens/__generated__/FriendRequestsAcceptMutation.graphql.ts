/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendRequestsAcceptMutationVariables = {
    userId: unknown;
};
export type FriendRequestsAcceptMutationResponse = {
    readonly user: {
        readonly acceptFriendRequest: {
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
export type FriendRequestsAcceptMutation = {
    readonly response: FriendRequestsAcceptMutationResponse;
    readonly variables: FriendRequestsAcceptMutationVariables;
};



/*
mutation FriendRequestsAcceptMutation(
  $userId: GlobalId!
) {
  user {
    acceptFriendRequest(id: $userId) {
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
    "name": "FriendRequestsAcceptMutation",
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
            "name": "acceptFriendRequest",
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
    "name": "FriendRequestsAcceptMutation",
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
            "name": "acceptFriendRequest",
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
    "cacheID": "48ae5c8245766376ab3ea8cd1d60e2cf",
    "id": null,
    "metadata": {},
    "name": "FriendRequestsAcceptMutation",
    "operationKind": "mutation",
    "text": "mutation FriendRequestsAcceptMutation(\n  $userId: GlobalId!\n) {\n  user {\n    acceptFriendRequest(id: $userId) {\n      record {\n        id\n        friends {\n          id\n          ...FriendButton_data\n        }\n        friendRequests {\n          id\n        }\n      }\n    }\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n"
  }
};
})();
(node as any).hash = '1a6a374913d73b571b73ee8a7e3b1807';
export default node;
