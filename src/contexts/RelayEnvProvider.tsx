import { RelayEnvironmentProvider } from 'react-relay/hooks';
import {
  Environment,
  Network,
  RecordSource,
  Store,
  Variables,
  RequestParameters
} from 'relay-runtime';
import { API_ENDPOINT } from '@env';
import { AuthContextValue, useAuthContext } from './AuthProvider';
import React, { PropsWithChildren, useEffect, useMemo } from 'react';
import storageController from '../controllers/storageController';

/**
 * Client for performing GraphQL requests
 */
class GraphQLClient {
  /**
   * Application auth context
   */
  public authContext: AuthContextValue;

  /**
   * @param authContext - application auth context
   */
  constructor(authContext: AuthContextValue) {
    this.authContext = authContext;
  }

  /**
   * Function for making queries to GraphQL server
   *
   * @param operation - query to perform
   * @param variables - query variables
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public async fetchQuery(operation: RequestParameters, variables: Variables): Promise<any> {
    const response = await this.sendQuery(operation.text, variables);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const isTokenExpiredError = response.errors?.some((error: any) => error?.extensions?.code === 'EXPIRED_ACCESS_TOKEN');

    if (isTokenExpiredError) {
      try {
        await this.authContext.actions.refreshTokens();
      } catch {
        await this.authContext.actions.logout();
      }

      return this.sendQuery(operation.text, variables);
    }

    return response;
  }

  /**
   * Sends query to GraphQL server
   *
   * @param query - query to send
   * @param variables - query variables
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private async sendQuery(query: string | null | undefined, variables: Variables): Promise<any> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };

    if (storageController.accessToken) {
      headers.Authorization = 'Bearer ' + storageController.accessToken;
    }

    const response = await fetch(`${API_ENDPOINT}/graphql`, {
      method: 'POST',
      headers,
      body: JSON.stringify({
        query,
        variables,
      }),
    });

    return response.json();
  }
}

/**
 * Relay environment provider to use it in hooks and other GraphQL requests
 *
 * @param props - props for component rendering
 */
export default function RelayEnvProvider(props: PropsWithChildren<unknown>): React.ReactElement {
  const authContext = useAuthContext();

  const client = useMemo(() => new GraphQLClient(authContext), []);

  useEffect(() => {
    client.authContext = authContext;
  }, [ authContext.state ]);

  const env = useMemo(() => {
    const network = Network.create(
      (request, variables) => client.fetchQuery(request, variables)
    );

    const source = new RecordSource();
    const store = new Store(source);

    return new Environment({
      network,
      store,
    });
  }, []);

  return (
    <RelayEnvironmentProvider environment={env} {...props}/>
  );
}
