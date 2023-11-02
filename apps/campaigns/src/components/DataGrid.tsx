// src/components/DataGrid.js
import React from 'react';
import styled from 'styled-components';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useQuery } from '@tanstack/react-query';
import { fetchPerks } from '../api';
import { Context } from '../app/context';
import CircularProgress from '@mui/material/CircularProgress';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 300 },
  { field: 'name', headerName: 'Name', type: 'number', width: 300 },
  {
    field: 'partner_logo_url',
    headerName: 'Logo',
    width: 240,
    renderCell: (params) => <img src={params.value} height={32} />,
  },
  { field: 'spaces_left', headerName: 'Spaces Left', width: 100 },
  { field: 'event_start', headerName: 'Start', width: 40 },
  { field: 'event_end', headerName: 'End', width: 40 },
];

const SpacerDiv = styled.div`
  min-height: 400px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const DataGridDemo = () => {
  const fetchPerksBind = fetchPerks.bind(
    null,
    React.useContext(Context).TOKEN,
    React.useContext(Context).CAMPAIGNS_API_URL
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ['perks.all'],
    queryFn: fetchPerksBind,
  });

  if (isLoading) {
    return (
      <SpacerDiv>
        <CircularProgress />
      </SpacerDiv>
    );
  }

  if (error) {
    return <p>Error: {error.toString()}</p>;
  }

  return (
    <DataGrid
      rows={data}
      columns={columns}
      pageSizeOptions={[5, 10, 20]}
      checkboxSelection
      initialState={{
        pagination: {
          paginationModel: {
            pageSize: 20,
          },
        },
      }}
      rowHeight={48}
      autoHeight={true}
    />
  );
};

export default DataGridDemo;
