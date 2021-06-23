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

fragment QuestWalkthroughRenderer_quest on Quest {
  id
  data {
    blocks
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
          }
        ],
        "storageKey": null
      }
    ]
  },
  "params": {
    "cacheID": "9026ff681707a96bf550ee2a370d2835",
    "id": null,
    "metadata": {},
    "name": "QuestWalkthroughRendererQuery",
    "operationKind": "query",
    "text": "query QuestWalkthroughRendererQuery(\n  $questId: GlobalId!\n) {\n  quest(id: $questId) {\n    id\n    ...QuestWalkthroughRenderer_quest\n  }\n}\n\nfragment QuestWalkthroughRenderer_quest on Quest {\n  id\n  data {\n    blocks\n  }\n}\n"
  }
};
})();
(node as any).hash = 'c5069826bf1998c38a440d6b5426d52f';
export default node;
