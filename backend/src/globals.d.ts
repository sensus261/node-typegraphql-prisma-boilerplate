import { ResolverData } from 'type-graphql';

declare module 'type-graphql' {
  export declare type AuthChecker<ContextType = {}, PayloadType = any> = (
    resolverData: ResolverData<ContextType>, 
    payload: PayloadType
  ) => boolean | Promise<boolean>;
}