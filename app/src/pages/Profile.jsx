import useSession from "@/hooks/useSession";
import Graduated from "@/containers/Profile/Graduated";

const Profile = () => {
  const { user } = useSession();
  return (
    <div className="container-fluid">
      {user.fk_rol === 1 && <>Admin</>}
      {user.fk_rol === 2 && <Graduated />}
      {user.fk_rol === 3 && <>Empresa</>}
    </div>
  );
};

export default Profile;
