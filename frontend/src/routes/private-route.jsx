import { Outlet, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoutes = () => {
  const { userId } = useSelector((state) => state.auth);
  return userId ? (
    <Outlet />
  ) : (
    <>
      <Navigate to="auth/login" replace={true} />
    </>
  );
};

export default PrivateRoutes;
