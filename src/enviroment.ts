import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  RequestParameters,
} from 'relay-runtime';

/**
 * Function for make queries to GraphQL server
 *
 * @param operation - query to perform
 * @param variables - query variables
 */
function fetchQuery(
  operation: RequestParameters,
  variables: Variables,
): Promise<any> {
  return fetch('https://api.stage.st-retrospect.dh-center.ru/graphql', {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: operation.text,
      variables,
    }),
  }).then((response) => {
    return response.json();
  });
}

const network = Network.create(fetchQuery);

const source = new RecordSource();
const store = new Store(source);

const env = new Environment({
  network,
  store,
});

export default env;
