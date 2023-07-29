import React from 'react'
import { HashRouter, Routes, Route } from 'react-router-dom'
import * as pages from '../pages';
import Public from './Public';
import Private from './Private';
import PageTransition from '../HOC/PageTransition';

const AppRouter = () => {
  return (
    <>
      <HashRouter>
        <PageTransition>
          <Route path='/login' exact={true} element={<Public><pages.Login /></Public>} />
          <Route path='/register' exact={true} element={<Public><pages.Register /></Public>} />
          <Route path='/change-password' exact={true} element={<Private><pages.ChangePassword /></Private>} />

          <Route path='/' exact={true} element={<Private><pages.Home /></Private>} />
          <Route path='/add-team' exact={true} element={<Private><pages.AddTeam /></Private>} />
          <Route path='/add-subadmin' exact={true} element={<Private><pages.AddSubadmin /></Private>} />
          <Route path='/edit-team/:id' exact={true} element={<Private><pages.AddTeam /></Private>} />
          <Route path='/team-details/:id' exact={true} element={<Private><pages.TeamDetails /></Private>} />
          <Route path='/user-details/:user_id' exact={true} element={<Private><pages.UserDetails /></Private>} />
        </PageTransition>
      </HashRouter>
    </>
  )
}

export default AppRouter