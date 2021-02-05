/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type TaskTypes = "QUIZ" | "ROUTE";
export type QuestsListQueryVariables = {};
export type QuestsListQueryResponse = {
    readonly quests: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly description: string | null;
                readonly type: TaskTypes;
                readonly questProgressState: QuestUserProgressStates;
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
        name
        description
        type
        questProgressState
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
                "name": "questProgressState",
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
    "cacheID": "f220d8a368e09febbce841a723524ccc",
    "id": null,
    "metadata": {},
    "name": "QuestsListQuery",
    "operationKind": "query",
    "text": "query QuestsListQuery {\n  quests {\n    edges {\n      node {\n        id\n        name\n        description\n        type\n        questProgressState\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '906b9da165853041b918ec1e2ce2da39';
export default node;
