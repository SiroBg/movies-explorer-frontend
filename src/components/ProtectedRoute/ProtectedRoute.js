import { Route, Redirect } from 'react-router-dom';

function ProtectedRoute({ isLoggedIn, children }) {
  return <Route>{() => (isLoggedIn ? children : <Redirect to="/" />)}</Route>;
}

export default ProtectedRoute;
