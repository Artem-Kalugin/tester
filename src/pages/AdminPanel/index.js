import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router';
import Sessions from './Sessions';
import AddSession from './AddSession';
import AdminSidebar from './AdminSidebar';
import AddTest from './AddTest';
import DeleteTest from './DeleteTest';
import AddStudents from './AddStudents';

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
    <Route path={`${path}/delete-test`}>
      <DeleteTest />
    </Route>
    <Route path={`${path}/add-students`}>
      <AddStudents />
    </Route>
    <Route path="/active-sessions">
      <Sessions />
    </Route>
    <Route path="/">
      <Sessions />
    </Route>
  </Switch>
  </div>
  );
};

export default AdminPanelContainer;