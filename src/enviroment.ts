import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  RequestParameters
} from 'relay-runtime';
import { API_ENDPOINT } from '@env';
import authController from './controllers/authController';

/**
 * Function for make queries to GraphQL server
 *
 * @param operation - query to perform
 * @param variables - query variables
 */
function fetchQuery(
  operation: RequestParameters,
  variables: Variables
): Promise<any> {
  const headers: Record<string, string> = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  };

  if (authController.accessToken) {
    headers.Authorization = 'Bearer ' + authController.accessToken;
  }

  return fetch(`${API_ENDPOINT}/graphql`, {
    method: 'POST',
    headers,
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
