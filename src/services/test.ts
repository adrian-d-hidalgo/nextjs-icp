import { createActor, canisterId } from "../declarations/test";

export function makeTestActor() {
  console.log({ canisterId }); //TODO: Fix undefined
  return createActor(canisterId, {
    agentOptions: {
      host: process.env.NEXT_PUBLIC_IC_HOST,
    },
  });
}
