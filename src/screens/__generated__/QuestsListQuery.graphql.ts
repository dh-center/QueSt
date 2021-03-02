/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type TaskTypes = "QUIZ" | "ROUTE";
export type QuestsListQueryVariables = {
    userDontAuthorized?: boolean | null;
};
export type QuestsListQueryResponse = {
    readonly quests: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly description: string | null;
                readonly type: TaskTypes;
                readonly minLevel: number;
                readonly questProgressState?: QuestUserProgressStates;
            };
        }>;
    };
};
export type QuestsListQuery = {
    readonly response: QuestsListQueryResponse;
    readonly variables: QuestsListQueryVariables;
};



/*
query QuestsListQuery(
  $userDontAuthorized: Boolean = false
) {
  quests {
    edges {
      node {
        id
        name
        description
        type
        minLevel
        questProgressState @skip(if: $userDontAuthorized)
      }
    }
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "defaultValue": false,
    "kind": "LocalArgument",
    "name": "userDontAuthorized"
  }
],
v1 = [
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
                "name": "minLevel",
                "storageKey": null
              },
              {
                "condition": "userDontAuthorized",
                "kind": "Condition",
                "passingValue": false,
                "selections": [
                  {
                    "alias": null,
                    "args": null,
                    "kind": "ScalarField",
                    "name": "questProgressState",
                    "storageKey": null
                  }
                ]
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
    "name": "QuestsListQuery",
    "selections": (v1/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestsListQuery",
    "selections": (v1/*: any*/)
  },
  "params": {
    "cacheID": "936c7b7bf4041d3f84a800501eb36508",
    "id": null,
    "metadata": {},
    "name": "QuestsListQuery",
    "operationKind": "query",
    "text": "query QuestsListQuery(\n  $userDontAuthorized: Boolean = false\n) {\n  quests {\n    edges {\n      node {\n        id\n        name\n        description\n        type\n        minLevel\n        questProgressState @skip(if: $userDontAuthorized)\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '6aace9b74f2e9522bfaebb94aed4dac1';
export default node;
