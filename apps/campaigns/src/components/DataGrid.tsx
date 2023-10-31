// src/components/DataGrid.js
import React from 'react';
import { DataGrid, GridColDef, GridRowsProp } from '@mui/x-data-grid';
import { useQuery } from 'react-query'
import { fetchPerks } from '../api'
import { Context } from '../app/context';


type PerkData = {
  id: number;
  name: string;
  partner_logo_url: string;
  spaces_left: number;
  event_start: string;
  event_end: string;
};

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 150 },
  { field: 'name', headerName: 'Name', type: 'number', width: 250 },
  { field: 'partner_logo_url', headerName: 'Logo', width: 150, renderCell: (params) => <img src={params.value} height={24} /> },
  { field: 'spaces_left', headerName: 'Spaces Left', width: 90 },
  { field: 'event_start', headerName: 'Start', width: 150 },
  { field: 'event_end', headerName: 'End', width: 150 },
]





function DataGridDemo() {
  console.log(React.useContext(Context))
  const fetchPerksBind = fetchPerks.bind(null, React.useContext(Context).token)
  const { data, error, isLoading } = useQuery('perks', fetchPerksBind);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.toString()}</p>;
  }

  return (
    <div>
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
        autoHeight={true}
      />
    </div>
  );
}

export default DataGridDemo;
