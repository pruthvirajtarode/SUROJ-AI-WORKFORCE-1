import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AppLayout from './components/layout/AppLayout';

// Pages
import Dashboard from './pages/Dashboard';
import ProgrammeOverview from './pages/ProgrammeOverview';
import SessionsIndex from './pages/SessionsIndex';
import SessionDetail from './pages/SessionDetail';
import Schedule from './pages/Schedule';
import ProgressImpact from './pages/ProgressImpact';
import ResourceCentre from './pages/ResourceCentre';

function App() {
  return (
    <Routes>
      <Route path="/" element={<AppLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="programme" element={<ProgrammeOverview />} />
        <Route path="sessions" element={<SessionsIndex />} />
        <Route path="sessions/:id" element={<SessionDetail />} />
        <Route path="schedule" element={<Schedule />} />
        <Route path="progress" element={<ProgressImpact />} />
        <Route path="resources" element={<ResourceCentre />} />
      </Route>
    </Routes>
  );
}

export default App;
