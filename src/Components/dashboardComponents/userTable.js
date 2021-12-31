import * as React from 'react';
import  axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Button} from '@mui/material';





export default function userTable(probs) {

  const columns : GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'user', headerName: 'User Name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  {
    field: 'orders',
    headerName: 'Total',
    type: 'number',
    width: 90,
  },
   
  { 
    field: 'date',
    headerName: 'Signed In Date',
    type: 'date',
    width:200
  },
  {
  field: "delete",
  renderCell: (cellValues) => {
    return (
      <Button
        variant="contained"
        color="error"
        onClick={(event) => {
        }}
      >
        delete
      </Button>
    );
  }
}
];
  return (
    <div style={{ height: 400, width: '100%' ,marginTop:"2rem"}}>
      <DataGrid
        rows={probs.rows}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  );
}
