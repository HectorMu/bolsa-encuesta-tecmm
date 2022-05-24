import { useContext } from "react";
import { Session } from "@/context/SessionProvider";

const useSession = () => useContext(Session);

export default useSession;
