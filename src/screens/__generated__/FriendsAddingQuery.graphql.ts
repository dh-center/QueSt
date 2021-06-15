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
v2 = [
  {
    "kind": "Variable",
    "name": "username",
    "variableName": "username"
  }
],
v3 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
};
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
        "condition": "needFetch",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "usersSearch",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
        "condition": "needFetch",
        "kind": "Condition",
        "passingValue": true,
        "selections": [
          {
            "alias": null,
            "args": (v2/*: any*/),
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "usersSearch",
            "plural": true,
            "selections": [
              (v3/*: any*/),
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
    "cacheID": "2400273f146c5e9ffaaba1966c313ae4",
    "id": null,
    "metadata": {},
    "name": "FriendsAddingQuery",
    "operationKind": "query",
    "text": "query FriendsAddingQuery(\n  $username: String!\n  $needFetch: Boolean!\n) {\n  usersSearch(username: $username) @include(if: $needFetch) {\n    id\n    ...FriendButton_data\n  }\n}\n\nfragment FriendButton_data on User {\n  firstName\n  username\n  level\n  photo\n}\n"
  }
};
})();
(node as any).hash = 'cef60ddc6d150fde86400eb8932fe8ad';
export default node;
