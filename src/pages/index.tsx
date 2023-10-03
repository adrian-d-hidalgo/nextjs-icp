import { useEffect, useState } from "react";
import { makeTestActor } from "../services/test";

export default function Page() {
  const [name, setName] = useState("");

  async function fetchName() {
    const testActor = makeTestActor();
    const name = await testActor.greet("test");
    setName(name);
  }

  useEffect(() => {
    fetchName();
  }, []);

  return <h1>Hello, {name}!</h1>;
}
