import * as React from 'react';

// material-ui
import {
    Box,
    Paper,
    Skeleton,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TablePagination,
    TableRow
} from '@mui/material';
import Typography from '@mui/material/Typography';
import Row from "./Row";
import { useTaskContext } from "../context/TaskContext";

// This should be a generic table. It should receive all the information from the props to reuse this component
// Because of time and as this is an MVP I won't be able to do it BUT it should be very similar to the GenericDialog component
// where I'm trying to abstract as much as posible the component in order to reuse it
export default function TaskTable() {
    const { tasks, isLoading, setMetadata, metadata, setRefresh } = useTaskContext();
    const handleChangePage = (event, newPage) => {
        setMetadata({ ...metadata, currentPage: newPage + 1 });
        setRefresh(true)
    };

    const handleChangeRowsPerPage = (event) => {
        setMetadata({ ...metadata, itemsPerPage: event.target.value, currentPage: 1 });
        setRefresh(true)
    };

    return (
        <Paper>
            {!isLoading && tasks.length === 0 ? (
                <Box>
                    <Typography variant="h4">No tasks to show</Typography>
                </Box>
            ) : (
                <TableContainer>
                    <Table aria-label="collapsible table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Number</TableCell>
                                <TableCell align="left">Description</TableCell>
                                <TableCell align="left">Due Date</TableCell>
                                <TableCell align="left">State</TableCell>
                                <TableCell align="left">Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {isLoading ? (
                                <TableRow hover role="checkbox" aria-checked={false} tabIndex={-1} key={1} selected={false}>
                                    <TableCell component="th" scope="row" padding="none">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                    <TableCell align="right">
                                        <Skeleton variant="text" />
                                    </TableCell>
                                </TableRow>
                            ) : (
                                tasks.map((row) => {
                                    return <Row key={row.id} row={row} />;
                                })
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
            <TablePagination
                rowsPerPageOptions={[1, 5, 10]}
                component="div"
                count={metadata.totalItems}
                rowsPerPage={metadata.itemsPerPage}
                page={metadata.currentPage - 1}
                onPageChange={handleChangePage}
                onRowsPerPageChange={handleChangeRowsPerPage}
            />
        </Paper>
    );
}
