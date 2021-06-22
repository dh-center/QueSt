/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type FriendsAddingQueryVariables = {
    username: string;
    needFetch: boolean;
};
export type FriendsAddingQueryResponse = {
    readonly usersSearch?: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"FriendButton_data">;
    }>;
    readonly me: {
        readonly friendPendingRequests: ReadonlyArray<{
            readonly id: string;
        }>;
    };
};
export type FriendsAddingQuery = {
    readonly response: FriendsAddingQueryResponse;
    readonly variables: FriendsAddingQueryVariables;
};



/*
query FriendsAddingQuery(
  $username: String!
  $needFetch: Boolean!
) {
  usersSearch(username: $username) @include(if: $needFetch) {
    id
    ...FriendButton_data
  }
  me {
    friendPendingRequests {
      id
    }
    id
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
var v0 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "needFetch"
},
v1 = {
  "defaultValue": null,
  "kind": "LocalArgument",
  "name": "username"
},
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
  "name": "friendPendingRequests",
  "plural": true,
  "selections": [
    (v2/*: any*/)
  ],
  "storageKey": null
},
v4 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
];
return {
  "fragment": {
    "argumentDefinitions": [
      (v0/*: any*/),
      (v1/*: any*/)
    ],
    "kind": "Fragment",
    "metadata": null,
    "name": "FriendsAddingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/)
        ],
        "storageKey": null
      },
      {
        "condition": "needFetch",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "usersSearch",
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
        ]
      }
    ],
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [
      (v1/*: any*/),
      (v0/*: any*/)
    ],
    "kind": "Operation",
    "name": "FriendsAddingQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          (v3/*: any*/),
          (v2/*: any*/)
        ],
        "storageKey": null
      },
      {
        "condition": "needFetch",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v4/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "usersSearch",
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
        ]
      }
    ]
  },
  "params": {
    "cacheID": "bb857570bb5b3e7c51f61754a3397a63",
    "id": null,
    "metadata": {},
    "name": "FriendsAddingQuery",
    "operationKind": "query",
    "text": "query FriendsAddingQuery(\n  $username: String!\n  $needFetch: Boolean!\n) {\n  usersSearch(username: $username) @include(if: $needFetch) {\n    id\n    ...FriendButton_data\n  }\n  me {\n    friendPendingRequests {\n      id\n    }\n    id\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n"
  }
};
})();
(node as any).hash = 'c3dd0749854adc688cff0ccf2feead16';
export default node;
