import { useContext } from "react";
import { Session } from "../context/SessionProvider";

const useSession = () => {
  return useContext(Session);
};

export default useSession;
