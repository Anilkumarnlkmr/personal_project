import * as React from "react";
import Paper from "@mui/material/Paper";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TablePagination from "@mui/material/TablePagination";
import TableRow from "@mui/material/TableRow";

interface Data {
  name: string;
  code: string;
  population: number;
  size: number;
  density: number;
}

function createData(
  name: string,
  code: string,
  population: number,
  size: number
): Data {
  const density = population / size;
  return { name, code, population, size, density };
}


export default function ColumnGroupingTable(props) {    
  const [page, setPage] = React.useState(0);

  const [rows, setrows] = React.useState([]);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <Paper sx={{ width: "100%" }}>
        {/* <h4>{props.tableType ? props.tableType : ''} {'/'} {props.listType ? props.listType : ''}</h4> */}
      <TableContainer sx={{ maxHeight: '86vh' }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {props.columnProps && props.columnProps.map((column) => (                
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ top: 0, minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.data && props.data
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} >
                    {props && props.columnProps && props.columnProps.map((column) => {
                      const value = row[column.id];
                      
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : typeof value === "object" ? <>
                                <h5 style={{margin:'unset'}}>app-name : {'anil'}</h5>
                                <h5 style={{margin:'unset'}}>app-name :{'kumar'}</h5>
                                <h5 style={{margin:'unset'}}>app-name :{'kumar'}</h5>
                            </>
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                  
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={props.data.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}
