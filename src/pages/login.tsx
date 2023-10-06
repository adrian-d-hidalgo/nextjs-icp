import { useContext } from "react";
import { IcpContext } from "@/libs/icp";

export default function SignIn() {
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
      {!isAuthenticated && <button onClick={handleOnLogIn}>Log In</button>}
      {isAuthenticated && <button onClick={handleOnLogOut}>Log Out</button>}
    </div>
  );
}
