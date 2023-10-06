import { useEffect, useState } from "react";

import { useCanister } from "@/libs/icp";

export default function Page() {
  const [name, setName] = useState("");
  const test = useCanister("test");

  async function fetchName() {
    const name = (await test?.greet("test")) || "";
    setName(name);
  }

  useEffect(() => {
    fetchName();
  }, []);

  return (
    <div>
      <h1>Hello, {name}!</h1>
    </div>
  );
}
