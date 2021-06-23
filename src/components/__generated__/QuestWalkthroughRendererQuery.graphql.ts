/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
import { FragmentRefs } from "relay-runtime";
export type QuestWalkthroughRendererQueryVariables = {
    questId: unknown;
};
export type QuestWalkthroughRendererQueryResponse = {
    readonly quest: {
        readonly id: string;
        readonly " $fragmentRefs": FragmentRefs<"QuestWalkthroughRenderer_quest">;
    } | null;
};
export type QuestWalkthroughRendererQuery = {
    readonly response: QuestWalkthroughRendererQueryResponse;
    readonly variables: QuestWalkthroughRendererQueryVariables;
};



/*
query QuestWalkthroughRendererQuery(
  $questId: GlobalId!
) {
  quest(id: $questId) {
    id
    ...QuestWalkthroughRenderer_quest
  }
}

fragment CollectionCardData on Person {
  firstName
  lastName
  cardPhotoLink
  mainPhotoLink
}

fragment QuestEndingData on Quest {
  personsCards {
    ...ReceivedCardsData
    id
  }
  linkedAchievements {
    ...ReceivedAchievementsData
    id
  }
}

fragment QuestWalkthroughRenderer_quest on Quest {
  id
  data {
    blocks
  }
  ...QuestEndingData
}

fragment ReceivedAchievementsData on Achievement {
  id
  name
}

fragment ReceivedCardsData on Person {
  id
  ...CollectionCardData
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": null,
    "kind": "LocalArgument",
    "name": "questId"
  }
],
v1 = [
  {
    "kind": "Variable",
    "name": "id",
    "variableName": "questId"
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
    "name": "QuestWalkthroughRendererQuery",
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
          {
            "args": null,
            "kind": "FragmentSpread",
            "name": "QuestWalkthroughRenderer_quest"
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
    "name": "QuestWalkthroughRendererQuery",
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
          {
            "alias": null,
            "args": null,
            "concreteType": "EditorData",
            "kind": "LinkedField",
            "name": "data",
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
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
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
    "cacheID": "4bd116324bf642cdd3322956b2234751",
    "id": null,
    "metadata": {},
    "name": "QuestWalkthroughRendererQuery",
    "operationKind": "query",
    "text": "query QuestWalkthroughRendererQuery(\n  $questId: GlobalId!\n) {\n  quest(id: $questId) {\n    id\n    ...QuestWalkthroughRenderer_quest\n  }\n}\n\nfragment CollectionCardData on Person {\n  firstName\n  lastName\n  cardPhotoLink\n  mainPhotoLink\n}\n\nfragment QuestEndingData on Quest {\n  personsCards {\n    ...ReceivedCardsData\n    id\n  }\n  linkedAchievements {\n    ...ReceivedAchievementsData\n    id\n  }\n}\n\nfragment QuestWalkthroughRenderer_quest on Quest {\n  id\n  data {\n    blocks\n  }\n  ...QuestEndingData\n}\n\nfragment ReceivedAchievementsData on Achievement {\n  id\n  name\n}\n\nfragment ReceivedCardsData on Person {\n  id\n  ...CollectionCardData\n}\n"
  }
};
})();
(node as any).hash = 'c5069826bf1998c38a440d6b5426d52f';
export default node;
