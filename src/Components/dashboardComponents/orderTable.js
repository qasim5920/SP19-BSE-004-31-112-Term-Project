import * as React from 'react';
import  axios from 'axios';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import {Button} from '@mui/material';





export default function OrderTable(probs) {

  const columns : GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'customer', headerName: 'Customer', width: 130 },
  { field: 'pq', headerName: 'Number of Products', width: 130 },
  {
    field: 'amount',
    headerName: 'Amount',
    type: 'number',
    width: 90,
  },
  {
    field: 'status',
    headerName: 'Status',
    width: 160,
  },
   
  { 
    field: 'date',
    headerName: 'Order Date',
    type: 'date',
    width:200
  },
  {
  field: "Print",
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
