import React from 'react';
import './AntList.scss';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function AntList(props) {
  const {ants} = props;
  ants.sort(function (a, b) {
    return (a.winLikelihood || a) - (b.winLikelihood || b);
  });

  const statusMessage = {
    default: 'Not Yet Run',
    start: 'In Progress',
    end: 'All Calculated'
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Length</TableCell>
            <TableCell align="right">Color</TableCell>
            <TableCell align="right">Weight</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {ants.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.length}</TableCell>
              <TableCell align="right">{row.color}</TableCell>
              <TableCell align="right">{row.weight}</TableCell>
              {/* <TableCell align="right">{row.winLikelihood || 'N/A'}%</TableCell> */}
              <TableCell align="right">
                {statusMessage[row.status] || statusMessage.start}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
