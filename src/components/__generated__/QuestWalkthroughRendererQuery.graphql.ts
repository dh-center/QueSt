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
    ...QuestWalkthroughRenderer_quest
    id
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
];
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
    "cacheID": "c0f32972c9cc4ad801086177c2773b98",
    "id": null,
    "metadata": {},
    "name": "QuestWalkthroughRendererQuery",
    "operationKind": "query",
    "text": "query QuestWalkthroughRendererQuery(\n  $questId: GlobalId!\n) {\n  quest(id: $questId) {\n    ...QuestWalkthroughRenderer_quest\n    id\n  }\n}\n\nfragment QuestWalkthroughRenderer_quest on Quest {\n  id\n  data {\n    blocks\n  }\n}\n"
  }
};
})();
(node as any).hash = 'e6a6bac6c3ac0679954d23fed305eb3c';
export default node;
