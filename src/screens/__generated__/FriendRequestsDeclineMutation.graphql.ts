/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type FriendRequestsDeclineMutationVariables = {
    userId: unknown;
};
export type FriendRequestsDeclineMutationResponse = {
    readonly user: {
        readonly rejectFriendRequest: {
            readonly record: {
                readonly id: string;
                readonly username: string;
                readonly friends: ReadonlyArray<{
                    readonly id: string;
                    readonly firstName: string | null;
                    readonly username: string;
                    readonly level: number;
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
        username
        friends {
          id
          firstName
          username
          level
        }
        friendRequests {
          id
        }
      }
    }
  }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "username",
  "storageKey": null
},
v3 = [
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
            "name": "id",
            "variableName": "userId"
          }
        ],
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
              (v1/*: any*/),
              (v2/*: any*/),
              {
                "alias": null,
                "args": null,
                "concreteType": "User",
                "kind": "LinkedField",
                "name": "friends",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "firstName",
                    "storageKey": null
                  },
                  (v2/*: any*/),
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "level",
                    "storageKey": null
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
                  (v1/*: any*/)
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
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendRequestsDeclineMutation",
    "selections": (v3/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendRequestsDeclineMutation",
    "selections": (v3/*: any*/)
  },
  "params": {
    "cacheID": "449152c27cb776f308a20f602fab3e00",
    "id": null,
    "metadata": {},
    "name": "FriendRequestsDeclineMutation",
    "operationKind": "mutation",
    "text": "mutation FriendRequestsDeclineMutation(\n  $userId: GlobalId!\n) {\n  user {\n    rejectFriendRequest(id: $userId) {\n      record {\n        id\n        username\n        friends {\n          id\n          firstName\n          username\n          level\n        }\n        friendRequests {\n          id\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '2197d2e3cfd3688223b3c6e0456a3b05';
export default node;
