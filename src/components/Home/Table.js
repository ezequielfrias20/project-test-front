import { useState } from 'react';
import {
  Box,
  Card,
  CardHeader,
  Checkbox,
  Divider,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Typography
} from '@material-ui/core';
import Scrollbar from '../Scrollbar';
import numeral from 'numeral';
import { format } from 'date-fns';
// import DotsHorizontalIcon from '../../../icons/DotsHorizontal';


const TableHome = (props) =>{
  const {data : bills, actionCell} = props;
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(10);

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleLimitChange = (event) => {
    setLimit(parseInt(event.target.value, 10));
  };
  const applyPagination = (bills, page, limit) => bills
  .slice(page * limit, page * limit + limit);

  const paginatedBills = applyPagination(bills, page, limit).sort((a, b) => new Date(b.date_bill) - new Date(a.date_bill));
  return (
    <Box
      sx={{
        backgroundColor: '#fff',
        p: 3,
        border:{
          md: `1px solid rgba(145, 158, 171, 0.24)`
        },
      }}
    >
      <Card>
        <CardHeader
          title="Movimientos"
        />
        <Divider />
        <Scrollbar>
          <Box sx={{ minWidth: 500, border:{
          md: `1px solid rgba(145, 158, 171, 0.24)`
        }, }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    Fecha
                  </TableCell>
                  <TableCell>
                    {'Observación'}
                  </TableCell>
                  <TableCell align="right">
                    Monto
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedBills && paginatedBills.map((bill) => (
                  <TableRow
                    hover
                    key={bill.id}
                    sx={{cursor: 'pointer'}}
                    onClick={ () => actionCell(bill.id) }
                  >
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        {format(new Date(bill.date_bill), 'dd/MM/yyyy | HH:mm')}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography
                        color="textPrimary"
                        variant="subtitle2"
                      >
                        {bill.observation}
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={ bill.type === "2" ? { color: "red"} : { color: "green"}}>
                    {`${ bill.type === "2" ? "-" : ""}`}
                    {numeral(bill.value)
                        .format(`$0,0.00`)}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        </Scrollbar>
        <TablePagination
          component="div"
          count={bills.length}
          onPageChange={handlePageChange}
          onRowsPerPageChange={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </Card>
    </Box>
  );
} 

export default TableHome;

