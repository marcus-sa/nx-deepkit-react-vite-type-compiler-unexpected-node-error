import type { ReactNode } from 'react';
import { createContext, useContext, useMemo } from 'react';
import { RemoteController, ControllerDefinition } from '@deepkit/rpc';
import { RpcWebSocketClient } from '@deepkit/rpc';

interface DeepkitClientContextType {
  readonly client: RpcWebSocketClient;
  readonly controllers: WeakMap<
    ControllerDefinition<any>,
    RemoteController<any>
  >;
}

const DeepkitClientContext = createContext<DeepkitClientContextType | null>(
  null,
);

export const useClient = (): RpcWebSocketClient =>
  useContext(DeepkitClientContext)!.client;

export function useController<C>(
  definition: ControllerDefinition<C>,
): RemoteController<C> {
  const ctx = useContext(DeepkitClientContext);
  if (!ctx) {
    throw new Error('DeepkitClientContextProvider must be instantiated');
  }
  return useMemo(() => {
    let controller = ctx.controllers.get(definition);
    if (!controller) {
      controller = ctx.client.controller<C>(definition);
      ctx.controllers.set(definition, controller);
    }
    return controller;
  }, [ctx.client]);
}

export interface DeepkitClientContextProviderOptions<T> {
  readonly token: T;
  readonly endpoint: string;
  readonly children: ReactNode;
}

export function DeepkitClientContextProvider<T>({
  token,
  endpoint,
  children,
}: DeepkitClientContextProviderOptions<T>) {
  const controllers = useMemo(() => new WeakMap(), [token, endpoint]);

  const client = useMemo(() => {
    const client = new RpcWebSocketClient(endpoint);
    if (token) {
      client.token.set(token);
    }
    void client.connect();
    return client;
  }, [token, endpoint]);

  return (
    <DeepkitClientContext.Provider value={{ controllers, client }}>
      {children}
    </DeepkitClientContext.Provider>
  );
}
