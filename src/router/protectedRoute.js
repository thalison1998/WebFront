import { useAuthToken } from '../hooks/useAuthToken'; 

const ProtectedRoute = ({ element, redirect }) => {
  const { token } = useAuthToken();

  return token ? element : redirect;
};

export default ProtectedRoute;
