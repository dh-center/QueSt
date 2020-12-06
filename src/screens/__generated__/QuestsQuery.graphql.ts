/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestsQueryVariables = {};
export type QuestsQueryResponse = {
    readonly quests: {
        readonly edges: ReadonlyArray<{
            readonly node: {
                readonly id: string;
                readonly name: string;
                readonly description: string | null;
            };
        }>;
    };
};
export type QuestsQuery = {
    readonly response: QuestsQueryResponse;
    readonly variables: QuestsQueryVariables;
};



/*
query QuestsQuery {
  quests {
    edges {
      node {
        id
        name
        description
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
    "name": "QuestsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "QuestsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "a73cc8c97b8dd2b63ac45f3c7aff7c23",
    "id": null,
    "metadata": {},
    "name": "QuestsQuery",
    "operationKind": "query",
    "text": "query QuestsQuery {\n  quests {\n    edges {\n      node {\n        id\n        name\n        description\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = 'd9b01503035d33fa3e32c309c40b3c14';
export default node;
