import { useParams, useLocation, useNavigate } from "react-router-dom";

const useRouterHooks = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = useParams();

  return {
    navigate,
    location,
    params,
  };
};

export default useRouterHooks;
