import React from "react";
import styled from 'styled-components';

import { WoodAnoa } from "@nx17/library-october";
import DataGridDemo from "../components/DataGrid";
import { Context } from "./context";

const StyledApp = styled.div`
  // Your style here
`;

export function App(props: { ASSETS_ROOT?: string, TOKEN?: string }) {

  return (
    <Context.Provider value={{token: props.TOKEN }}>
      <StyledApp>
        <h1>Campaigns</h1>
        <DataGridDemo/>
      </StyledApp>
    </Context.Provider>
  );
}

export default App;
