/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type QuestUserProgressStates = "AVAILABLE" | "LOCKED" | "PASSED";
export type QuestEndingMutationVariables = {
    questId: unknown;
};
export type QuestEndingMutationResponse = {
    readonly user: {
        readonly completeQuest: {
            readonly record: {
                readonly id: string;
                readonly username: string;
                readonly exp: number;
                readonly level: number;
                readonly completedQuests: ReadonlyArray<{
                    readonly id: string;
                    readonly questProgressState: QuestUserProgressStates;
                }>;
            };
        };
    };
};
export type QuestEndingMutation = {
    readonly response: QuestEndingMutationResponse;
    readonly variables: QuestEndingMutationVariables;
};



/*
mutation QuestEndingMutation(
  $questId: GlobalId!
) {
  user {
    completeQuest(questId: $questId) {
      record {
        id
        username
        exp
        level
        completedQuests {
          id
          questProgressState
        }
      }
    }
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
v1 = {
  "alias": null,
  "args": null,
  "kind": "ScalarField",
  "name": "id",
  "storageKey": null
},
v2 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "UserMutations",
    "kind": "LinkedField",
    "name": "user",
    "plural": false,
    "selections": [
      {
        "alias": null,
        "args": [
          {
            "kind": "Variable",
            "name": "questId",
            "variableName": "questId"
          }
        ],
        "concreteType": "UpdateUserPayload",
        "kind": "LinkedField",
        "name": "completeQuest",
        "plural": false,
        "selections": [
          {
            "alias": null,
            "args": null,
            "concreteType": "User",
            "kind": "LinkedField",
            "name": "record",
            "plural": false,
            "selections": [
              (v1/*: any*/),
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "username",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "exp",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "kind": "ScalarField",
                "name": "level",
                "storageKey": null
              },
              {
                "alias": null,
                "args": null,
                "concreteType": "Quest",
                "kind": "LinkedField",
                "name": "completedQuests",
                "plural": true,
                "selections": [
                  (v1/*: any*/),
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
    ],
    "storageKey": null
  }
];
return {
  "fragment": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Fragment",
    "metadata": null,
    "name": "QuestEndingMutation",
    "selections": (v2/*: any*/),
    "type": "Mutation",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": (v0/*: any*/),
    "kind": "Operation",
    "name": "QuestEndingMutation",
    "selections": (v2/*: any*/)
  },
  "params": {
    "cacheID": "8ca84d325019e2977a1dfbc78e70f66d",
    "id": null,
    "metadata": {},
    "name": "QuestEndingMutation",
    "operationKind": "mutation",
    "text": "mutation QuestEndingMutation(\n  $questId: GlobalId!\n) {\n  user {\n    completeQuest(questId: $questId) {\n      record {\n        id\n        username\n        exp\n        level\n        completedQuests {\n          id\n          questProgressState\n        }\n      }\n    }\n  }\n}\n"
  }
};
})();
(node as any).hash = '58a542da553145c4cde11231074b0cae';
export default node;
