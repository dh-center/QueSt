/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type CardsCollectionQueryVariables = {};
export type CardsCollectionQueryResponse = {
    readonly personsCards: ReadonlyArray<{
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"CollectionCardData">;
    }>;
    readonly me: {
        readonly receivedPersonsCards: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"CollectionCardData">;
        }>;
    };
};
export type CardsCollectionQuery = {
    readonly response: CardsCollectionQueryResponse;
    readonly variables: CardsCollectionQueryVariables;
};



/*
query CardsCollectionQuery {
  personsCards {
    id
    ...CollectionCardData
  }
  me {
    receivedPersonsCards {
      id
      ...CollectionCardData
    }
    id
  }
}

fragment CollectionCardData on Person {
  firstName
  lastName
  cardPhotoLink
  mainPhotoLink
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
v1 = [
  (v0/*: any*/),
  {
    "args": null,
    "kind": "FragmentSpread",
    "name": "CollectionCardData"
  }
],
v2 = [
  (v0/*: any*/),
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
    "name": "lastName",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "cardPhotoLink",
    "storageKey": null
  },
  {
    "alias": null,
    "args": null,
    "kind": "ScalarField",
    "name": "mainPhotoLink",
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "CardsCollectionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "personsCards",
        "plural": true,
        "selections": (v1/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "receivedPersonsCards",
            "plural": true,
            "selections": (v1/*: any*/),
            "storageKey": null
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
    "name": "CardsCollectionQuery",
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "Person",
        "kind": "LinkedField",
        "name": "personsCards",
        "plural": true,
        "selections": (v2/*: any*/),
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "concreteType": "User",
        "kind": "LinkedField",
        "name": "me",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "receivedPersonsCards",
            "plural": true,
            "selections": (v2/*: any*/),
            "storageKey": null
          },
          (v0/*: any*/)
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "23637d2a774f48c0733f738ad41cd4cc",
    "id": null,
    "metadata": {},
    "name": "CardsCollectionQuery",
    "operationKind": "query",
    "text": "query CardsCollectionQuery {\n  personsCards {\n    id\n    ...CollectionCardData\n  }\n  me {\n    receivedPersonsCards {\n      id\n      ...CollectionCardData\n    }\n    id\n  }\n}\n\nfragment CollectionCardData on Person {\n  firstName\n  lastName\n  cardPhotoLink\n  mainPhotoLink\n}\n"
  }
};
})();
(node as any).hash = '84c6d08795c5fa713c75f48252069899';
export default node;
