/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestWalkthroughRendererQueryVariables = {
    questId: unknown;
};
export type QuestWalkthroughRendererQueryResponse = {
    readonly quest: {
        readonly data: {
            readonly blocks: ReadonlyArray<unknown>;
            readonly time: unknown | null;
            readonly version: string | null;
        } | null;
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
    data {
      blocks
      time
      version
    }
    id
  }
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
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "time",
      "storageKey": null
    },
    {
      "alias": null,
      "args": null,
      "kind": "ScalarField",
      "name": "version",
      "storageKey": null
    }
  ],
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
          (v2/*: any*/)
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
            "kind": "ScalarField",
            "name": "id",
            "storageKey": null
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "763ffb4fe4d06769eba836ed34fe3700",
    "id": null,
    "metadata": {},
    "name": "QuestWalkthroughRendererQuery",
    "operationKind": "query",
    "text": "query QuestWalkthroughRendererQuery(\n  $questId: GlobalId!\n) {\n  quest(id: $questId) {\n    data {\n      blocks\n      time\n      version\n    }\n    id\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e4c60452e7b032a3592dfa2e73b43f93';
export default node;
