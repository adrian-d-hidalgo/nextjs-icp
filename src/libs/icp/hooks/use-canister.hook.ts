import { CanisterNamesType } from "@/declarations";
import * as test from "@/declarations/test";

import { DeclarationType } from "./use-canister.type";

export function createCanisterActors<T>(declarations: DeclarationType<T>[]) {
  const map = new Map(
    declarations.map((canister) => {
      const actor = canister.createActor(canister.canisterId, {
        agentOptions: {
          host: process.env.NEXT_PUBLIC_IC_HOST,
        },
      });
      return [canister.name, actor];
    })
  );

  return map;
}

const actors = createCanisterActors([
  { name: "test", canisterId: test.canisterId, createActor: test.createActor },
]);

export function useCanister(name: CanisterNamesType) {
  return actors.get(name);
}
