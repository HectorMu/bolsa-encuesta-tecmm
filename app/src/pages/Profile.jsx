import useSession from "@/hooks/useSession";
import Admin from "@/containers/Profile/Admin";
import Graduated from "@/containers/Profile/Graduated";
import Company from "@/containers/Profile/Company";

const Profile = () => {
  const { user } = useSession();
  return (
    <div className="container-fluid">
      {user.fk_rol === 1 && <Admin />}
      {user.fk_rol === 2 && <Graduated />}
      {user.fk_rol === 3 && <Company />}
    </div>
  );
};

export default Profile;
