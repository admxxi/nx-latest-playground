import React, { lazy, Suspense } from 'react';
import styled from 'styled-components';

import { Context, EnvProps } from './context';
import Logo from '../assets/active-campaign.svg';
import './app.css';
import { Routes, Route, Link } from 'react-router-dom';
import CircularProgress from '@mui/material/CircularProgress';
import { WoodAnoa } from '@nx17/library-october';

const DataGridDemo = lazy(() => import('../components/DataGrid'));

const StyledApp = styled.div`
  // Your style here
`;

const RouterLinks = () => {
  return (
    <div>
      <Link to="/">Home</Link> | <Link to="/page-2">Another page</Link>
    </div>
  );
};

const Pages = () => {
  return (
    <Routes>
      <Route
        element={
          <div>
            <Suspense fallback={<CircularProgress />}>
              <DataGridDemo />
            </Suspense>
          </div>
        }
        path="/"
      />
      <Route
        element={
          <React.Suspense fallback={<>...</>}>
            <h2>Hello World</h2>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam
            </p>
          </React.Suspense>
        }
        path="/page-2"
      />
    </Routes>
  );
};

export function App(props: EnvProps) {
  const context = React.useContext(Context);
  const ASSETS_ROOT = context.ASSETS_ROOT;

  return (
    <StyledApp>
      <h2 style={{ marginTop: 0 }}>Campaigns 5</h2>
      <RouterLinks />
      <img src={`${ASSETS_ROOT}${Logo}`} alt="Active Campaign" height={40} />
      <Pages />
      <pre>
        <code>{JSON.stringify(context, null, 2)}</code>
      </pre>
      <WoodAnoa />
    </StyledApp>
  );
}

export default App;
