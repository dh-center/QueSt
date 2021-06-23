/* tslint:disable */
/* eslint-disable */
// @ts-nocheck

import { ConcreteRequest } from "relay-runtime";
export type AchievementUnits = "DISTANCE" | "QUANTITY";
export type AchievementsQueryVariables = {};
export type AchievementsQueryResponse = {
    readonly achievements: ReadonlyArray<{
        readonly id: string;
        readonly name: string;
        readonly unit: AchievementUnits;
        readonly currentValue: number;
        readonly requiredValue: number;
    }>;
};
export type AchievementsQuery = {
    readonly response: AchievementsQueryResponse;
    readonly variables: AchievementsQueryVariables;
};



/*
query AchievementsQuery {
  achievements {
    id
    name
    unit
    currentValue
    requiredValue
  }
}
*/

const node: ConcreteRequest = (function(){
var v0 = [
  {
    "alias": null,
    "args": null,
    "concreteType": "Achievement",
    "kind": "LinkedField",
    "name": "achievements",
    "plural": true,
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
        "name": "unit",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "currentValue",
        "storageKey": null
      },
      {
        "alias": null,
        "args": null,
        "kind": "ScalarField",
        "name": "requiredValue",
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
    "name": "AchievementsQuery",
    "selections": (v0/*: any*/),
    "type": "Query",
    "abstractKey": null
  },
  "kind": "Request",
  "operation": {
    "argumentDefinitions": [],
    "kind": "Operation",
    "name": "AchievementsQuery",
    "selections": (v0/*: any*/)
  },
  "params": {
    "cacheID": "2f9b99a974e41e796c2783bd31a9874b",
    "id": null,
    "metadata": {},
    "name": "AchievementsQuery",
    "operationKind": "query",
    "text": "query AchievementsQuery {\n  achievements {\n    id\n    name\n    unit\n    currentValue\n    requiredValue\n  }\n}\n"
  }
};
})();
(node as any).hash = '23b281c6256599022de0a5407df84cb5';
export default node;
