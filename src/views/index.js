import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import GetCookie from 'components/cookies'
import Discord from './discord'
import Home from './home'
import Units from './units'
import Journey from './journey'

export default function Views(props = {}) {
  const opts = {...props,discordId: GetCookie('discordId') }
  sessionStorage.setItem('nav', window.location.pathname)
  return (
      <Router>
        <Routes>
          <Route path = '/discord/*' element={<Discord {...opts}/>}/>
          <Route path = '/units/*' element={<Units {...opts}/>}/>
          <Route path = '/journey/*' element={<Journey {...opts}/>}/>
          <Route path = '/*' element={<Home {...opts}/>}/>
        </Routes>
      </Router>
  )
}
