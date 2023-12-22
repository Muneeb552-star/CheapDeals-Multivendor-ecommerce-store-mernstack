import { Suspense } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const ProtectRoutes = ({ route, children }) => {
  const { role, userInfo } = useSelector(state => state.auth);

  if (!role) {
    return <Navigate to="/login" replace />;
  }

  if (!userInfo) {
    return null; // or handle accordingly
  }

  if (route.role && userInfo.role !== route.role) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (route.role || route.ability === 'seller') {
    return <Suspense fallback={null}>{children}</Suspense>;
  }

  if (route.status) {
    if (route.status !== userInfo.status) {
      return userInfo.status === 'pending'
        ? <Navigate to="/seller/account-pending" replace />
        : <Navigate to="/seller/account-deactive" replace />;
    }
  } else if (route.visibility && !route.visibility.some(r => r === userInfo.status)) {
    return <Navigate to="/seller/account-pending" replace />;
  }

  return <Suspense fallback={null}>{children}</Suspense>;
};

export default ProtectRoutes;
