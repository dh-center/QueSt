/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type WayToTravel = "ON_FOOT" | "WITH_TRANSPORT";
export type QuestInfoQueryVariables = {
    id: unknown;
};
export type QuestInfoQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly name: string;
        readonly earnedExp: number;
        readonly description: string | null;
        readonly wayToTravel: WayToTravel;
        readonly distanceInKilometers: number;
        readonly durationInMinutes: number;
        readonly questProgressState: QuestUserProgressStates;
        readonly linkedAchievements: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"AchievementData">;
        }>;
        readonly personsCards: ReadonlyArray<{
            readonly id: string;
            readonly " $fragmentRefs": FragmentRefs<"CollectionCardData">;
        }>;
        readonly " $fragmentRefs": FragmentRefs<"AwardsAndStats" | "CreditsInfo">;
    } | null;
};
export type QuestInfoQuery = {
    readonly response: QuestInfoQueryResponse;
    readonly variables: QuestInfoQueryVariables;
};



/*
query QuestInfoQuery(
  $id: GlobalId!
) {
  quest(id: $id) {
    id
    name
    earnedExp
    description
    wayToTravel
    distanceInKilometers
    durationInMinutes
    questProgressState
    ...AwardsAndStats
    ...CreditsInfo
    linkedAchievements {
      id
      ...AchievementData
    }
    personsCards {
      id
      ...CollectionCardData
    }
  }
}

fragment AchievementData on Achievement {
  id
  name
}

fragment AwardsAndStats on Quest {
  earnedExp
  personsCards {
    id
  }
  linkedAchievements {
    id
  }
  questProgressState
  distanceInKilometers
}

fragment CollectionCardData on Person {
  firstName
  lastName
  cardPhotoLink
  mainPhotoLink
}

fragment CreditsInfo on Quest {
  credits {
    blocks
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "id"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "id"
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
  "kind": "ScalarField",
  "name": "name",
  "storageKey": null
},
v4 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "earnedExp",
  "storageKey": null
},
v5 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "description",
  "storageKey": null
},
v6 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "wayToTravel",
  "storageKey": null
},
v7 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "distanceInKilometers",
  "storageKey": null
},
v8 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "durationInMinutes",
  "storageKey": null
},
v9 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "questProgressState",
  "storageKey": null
};
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Quest",
        "kind": "LinkedField",
        "name": "quest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "linkedAchievements",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "AchievementData"
              }
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "personsCards",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              {
                "args": null,
                "kind": "FragmentSpread",
                "name": "CollectionCardData"
              }
            ],
            "storageKey": null
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "AwardsAndStats"
          },
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "CreditsInfo"
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
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestInfoQuery",
    "selections": [
      {
        "alias": null,
        "args": (v1/*: any*/),
        "concreteType": "Quest",
        "kind": "LinkedField",
        "name": "quest",
        "plural": false,
        "selections": [
          (v2/*: any*/),
          (v3/*: any*/),
          (v4/*: any*/),
          (v5/*: any*/),
          (v6/*: any*/),
          (v7/*: any*/),
          (v8/*: any*/),
          (v9/*: any*/),
          {
            "alias": null,
            "args": null,
            "concreteType": "Person",
            "kind": "LinkedField",
            "name": "personsCards",
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
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "Achievement",
            "kind": "LinkedField",
            "name": "linkedAchievements",
            "plural": true,
            "selections": [
              (v2/*: any*/),
              (v3/*: any*/)
            ],
            "storageKey": null
          },
          {
            "alias": null,
            "args": null,
            "concreteType": "EditorData",
            "kind": "LinkedField",
            "name": "credits",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "blocks",
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
    "cacheID": "d889d8936054f45c1ba2b98f6bedeb77",
    "id": null,
    "metadata": {},
    "name": "QuestInfoQuery",
    "operationKind": "query",
    "text": "query QuestInfoQuery(\n  $id: GlobalId!\n) {\n  quest(id: $id) {\n    id\n    name\n    earnedExp\n    description\n    wayToTravel\n    distanceInKilometers\n    durationInMinutes\n    questProgressState\n    ...AwardsAndStats\n    ...CreditsInfo\n    linkedAchievements {\n      id\n      ...AchievementData\n    }\n    personsCards {\n      id\n      ...CollectionCardData\n    }\n  }\n}\n\nfragment AchievementData on Achievement {\n  id\n  name\n}\n\nfragment AwardsAndStats on Quest {\n  earnedExp\n  personsCards {\n    id\n  }\n  linkedAchievements {\n    id\n  }\n  questProgressState\n  distanceInKilometers\n}\n\nfragment CollectionCardData on Person {\n  firstName\n  lastName\n  cardPhotoLink\n  mainPhotoLink\n}\n\nfragment CreditsInfo on Quest {\n  credits {\n    blocks\n  }\n}\n"
  }
};
})();
(node as any).hash = '425c4b1821c827aea4d26a5d9da1c5d3';
export default node;
