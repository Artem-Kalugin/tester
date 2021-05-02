import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router';
import ActiveSessions from './ActiveSessions';
import AddSession from './AddSession';
import AdminSidebar from './AdminSidebar';
import AddTest from './AddTest';

const AdminPanelContainer = props => {
  const {path, url} = useRouteMatch();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flex: '1'}}>
    <AdminSidebar matchUrl={url} {...props}>
    </AdminSidebar>
    <Switch>
    <Route path="/about">
    </Route>
    <Route path={`${path}/add-session`}>
      <AddSession />
    </Route>
    <Route path={`${path}/add-test`}>
      <AddTest />
    </Route>
    <Route path="/">
      <ActiveSessions />
    </Route>
  </Switch>
  </div>
  );
};

export default AdminPanelContainer;