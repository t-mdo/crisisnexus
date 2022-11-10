import { Navigate } from 'react-router-dom';

const NoRouteMatch = () => <Navigate to="/" replace={true} />;

export default NoRouteMatch;
