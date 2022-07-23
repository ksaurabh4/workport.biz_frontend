import React from 'react';
import { Redirect, Route } from 'react-router';

export default function SuperAdminRoute({ component: Component, ...rest }) {
  const user = JSON.parse(localStorage.getItem('user'));
  return (
    <Route
      {...rest}
      render= { props => ((user?.userRole === 'superadmin') ? (
        <Component {...props} />
      ) : (
        <Redirect to="/app" />
      ))}
    />
  );
}
