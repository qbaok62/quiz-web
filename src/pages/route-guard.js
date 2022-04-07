// import { Navigate, Outlet, useLocation } from "react-router-dom";

// export const RedirectRoute = ({ accessToken, role }) => {
//   if (accessToken && role === "user") {
//     return <Navigate to="/quiz" replace />;
//   }

//   if (accessToken && role === "admin") {
//     return <Navigate to="/admin" replace />;
//   }

//   return <Outlet />;
// };

// export const RequireAuth = ({ accessToken }) => {
//   const location = useLocation();

//   if (!accessToken) {
//     return <Navigate to="/login" state={{ from: location }} replace />;
//   }
//   return <Outlet />;
// };

// export const ProtectedRoute = ({ accessToken, role }) => {
//   let location = useLocation();

//   if (role === "user") {
//     return <Navigate to="/quiz" replace />;
//   } else if (role === "admin") {
//     return <Navigate to="/admin" replace />;
//   }
//   return <Outlet />;
// };
import { Navigate, Outlet } from "react-router-dom";

export const RedirectRoute = ({ accessToken, role }) => {
  if (accessToken && role === "user") {
    return <Navigate to="/quiz" replace />;
  }

  if (accessToken && role === "admin") {
    return <Navigate to="/admin" replace />;
  }

  return <Outlet />;
};

export const UserRoute = ({ accessToken, role }) => {
  if (!accessToken) {
    return <Navigate to="/auth/login" replace />;
  }

  if (accessToken && role === "admin") {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
};

export const AdminRoute = ({ accessToken, role }) => {
  if (!accessToken || role !== "admin") {
    return <Navigate to="/auth/login" replace />;
  }
  return <Outlet />;
};
