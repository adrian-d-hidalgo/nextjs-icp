import { CanisterNamesType } from "@/declarations";
import {
  ActorConfig,
  ActorSubclass,
  Agent,
  HttpAgentOptions,
} from "@dfinity/agent";
import { Principal } from "@dfinity/principal";

export interface CreateActorOptions {
  /**
   * @see {@link Agent}
   */
  agent?: Agent;
  /**
   * @see {@link HttpAgentOptions}
   */
  agentOptions?: HttpAgentOptions;
  /**
   * @see {@link ActorConfig}
   */
  actorOptions?: ActorConfig;
}

export type createActorType<T> = (
  canisterId: string | Principal,
  options?: CreateActorOptions
) => ActorSubclass<T>;

export type DeclarationType<T> = {
  name: CanisterNamesType;
  canisterId: string | Principal;
  createActor: createActorType<T>;
};
