import { useContext, useEffect, useState } from "react";

import { useCanister, IcpContext } from "@/libs/icp";

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

  const icpContext = useContext(IcpContext);

  const { isAuthenticated, logIn, logOut } = icpContext;

  const handleOnLogIn = async (event: React.MouseEvent<HTMLElement>) => {
    logIn();
  };

  const handleOnLogOut = async (event: React.MouseEvent<HTMLElement>) => {
    logOut();
  };

  return (
    <div>
      <h1>Hello, {name}!</h1>
      {!isAuthenticated && <button onClick={handleOnLogIn}>Log In</button>}
      {isAuthenticated && <button onClick={handleOnLogOut}>Log Out</button>}
    </div>
  );
}
