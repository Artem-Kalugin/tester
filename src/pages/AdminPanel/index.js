import React from 'react';
import { useRouteMatch, Switch, Route } from 'react-router';
import Sessions from './Sessions';
import AddSession from './AddSession';
import ShowTest from './ShowTest';
import AdminSidebar from './AdminSidebar';
import AddTest from './AddTest';
import DeleteTest from './DeleteTest';
import AddStudents from './AddStudents';
import ShowStudents from './ShowStudents';

const AdminPanelContainer = props => {
  const { path, url } = useRouteMatch();
  return (
    <div style={{ display: 'flex', flexDirection: 'row', flex: '1' }}>
      <AdminSidebar matchUrl={url} {...props} />
      <Switch>
        <Route path="/about" />
        <Route path={`${path}/add-session`}>
          <AddSession />
        </Route>
        <Route path={`${path}/show-test`}>
          <ShowTest />
        </Route>
        <Route path={`${path}/add-test`}>
          <AddTest />
        </Route>
        <Route path={`${path}/delete-test`}>
          <DeleteTest />
        </Route>
        <Route path={`${path}/show-students`}>
          <ShowStudents />
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
