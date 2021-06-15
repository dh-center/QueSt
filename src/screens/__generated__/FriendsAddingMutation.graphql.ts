/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendsAddingMutationVariables = {
    userId: unknown;
};
export type FriendsAddingMutationResponse = {
    readonly user: {
        readonly sendFriendRequest: {
            readonly record: {
                readonly id: string;
                readonly friends: ReadonlyArray<{
                    readonly id: string;
                    readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
                }>;
            };
        };
    };
};
export type FriendsAddingMutation = {
    readonly response: FriendsAddingMutationResponse;
    readonly variables: FriendsAddingMutationVariables;
};



/*
mutation FriendsAddingMutation(
  $userId: GlobalId!
) {
  user {
    sendFriendRequest(id: $userId) {
      record {
        id
        friends {
          id
          ...FriendButton_data
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
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendsAddingMutation",
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
            "name": "sendFriendRequest",
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
    ],
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "FriendsAddingMutation",
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
            "name": "sendFriendRequest",
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
    ]
  },
  "params": {
    "cacheID": "ce10ba356e90213d52db3674c233e874",
    "id": null,
    "metadata": {},
    "name": "FriendsAddingMutation",
    "operationKind": "mutation",
    "text": "mutation FriendsAddingMutation(\n  $userId: GlobalId!\n) {\n  user {\n    sendFriendRequest(id: $userId) {\n      record {\n        id\n        friends {\n          id\n          ...FriendButton_data\n        }\n      }\n    }\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n"
  }
};
})();
(node as any).hash = 'b8ac4a1101d123ed738cfe6f631bebc3';
export default node;
