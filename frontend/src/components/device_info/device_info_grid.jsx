import React from 'react';
import GridTable from '../shared/grid_table.jsx';
import Typography from '@mui/material/Typography';
import useFetchData from '../shared/fetch_data';

const Device_info_grid = ({ id }) => {
  const { data: events, loading, error } = useFetchData('devices/' + id + '/events');

  const columnDefs = [
      { field: "event_id", filter: "agTextColumnFilter", headerName: "ID", flex: 2 },
      { field: "user_id", filter: "agTextColumnFilter", headerName: "User", flex: 2 },
      { field: "move_time", filter: "agTextColumnFilter", headerName: "Date/Time", flex: 2.5 },
      { field: "loc", filter: "agTextColumnFilter", headerName: "Location", flex: 2.5 },
  ];

  if (loading) {
      return (
          <Typography sx={{ mt: 7, fontSize: 'clamp(1.5rem, 10vw, 2.4rem)' }}>
              Loading events...
          </Typography>
      );
  }

  if (error) {
      return (
          <Typography sx={{ mt: 7, fontSize: 'clamp(1.5rem, 9vw, 2.4rem)', color: 'red' }}>
              Failed to load events.<br />
              Please try again later.<br />
          </Typography>
      );
  }

  return (
      <GridTable 
          rowData={events.length > 0 ? events : []} 
          columnDefs={columnDefs}
      />
  );
};

export default Device_info_grid;