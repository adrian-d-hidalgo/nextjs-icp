import { makeTestActor } from "../services/test";

export default function Page() {
  const testActor = makeTestActor();
  // testActor.greet("adrian");
  return <h1>Hello, Next.js!</h1>;
}
