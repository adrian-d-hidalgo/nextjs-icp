import { useContext, useEffect, useState } from "react";
import { makeTestActor } from "@/services/test";
import { AuthContext } from "@/context/auth.context";

export default function Page() {
  const [name, setName] = useState("");

  async function fetchName() {
    const testActor = await makeTestActor();
    const name = await testActor.greet("test");
    setName(name);
  }

  useEffect(() => {
    fetchName();
  }, []);

  const authContext = useContext(AuthContext);

  const { isAuthenticated, logIn, logOut } = authContext;

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
