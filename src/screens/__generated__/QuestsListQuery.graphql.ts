/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type Languages = "EN" | "RU";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type TaskTypes = "QUEST" | "QUIZ" | "ROUTE" | "STORY";
export type WayToTravel = "ON_FOOT" | "WITH_TRANSPORT";
export type QuestsListQueryVariables = {};
export type QuestsListQueryResponse = {
    readonly quests: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly language: Languages;
                readonly name: string;
                readonly description: string | null;
                readonly type: TaskTypes;
                readonly minLevel: number;
                readonly questProgressState: QuestUserProgressStates;
                readonly earnedExp: number;
                readonly wayToTravel: WayToTravel;
                readonly distanceInKilometers: number;
                readonly durationInMinutes: number;
                readonly credits: {
                    readonly blocks: ReadonlyArray<unknown>;
                } | null;
            };
        }>;
    };
};
export type QuestsListQuery = {
    readonly response: QuestsListQueryResponse;
    readonly variables: QuestsListQueryVariables;
};



/*
query QuestsListQuery {
  quests {
    edges {
      node {
        id
        language
        name
        description
        type
        minLevel
        questProgressState
        earnedExp
        wayToTravel
        distanceInKilometers
        durationInMinutes
        credits {
          blocks
        }
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "QuestConnection",
    "kind": "LinkedField",
    "name": "quests",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": null,
        "concreteType": "QuestEdge",
        "kind": "LinkedField",
        "name": "edges",
        "plural": true,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "Quest",
            "kind": "LinkedField",
            "name": "node",
            "plural": false,
            "selections": [
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "id",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "language",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "name",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "description",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "type",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "minLevel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "questProgressState",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "earnedExp",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "wayToTravel",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "distanceInKilometers",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "durationInMinutes",
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
        ],
        "storageKey": null
      }
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": [],
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestsListQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QuestsListQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "df1da0c8627b496133a6e83836b7e732",
    "id": null,
    "metadata": {},
    "name": "QuestsListQuery",
    "operationKind": "query",
    "text": "query QuestsListQuery {\n  quests {\n    edges {\n      node {\n        id\n        language\n        name\n        description\n        type\n        minLevel\n        questProgressState\n        earnedExp\n        wayToTravel\n        distanceInKilometers\n        durationInMinutes\n        credits {\n          blocks\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '4c8bb77b83e960e3c259cbd359417569';
export default node;
