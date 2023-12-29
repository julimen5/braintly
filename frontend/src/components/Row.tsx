import * as React from 'react';
import {useState} from 'react';
import * as PropTypes from 'prop-types';
import {Chip, IconButton, TableCell, TableRow} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DeleteIcon from '@mui/icons-material/Delete';
import GenericDialog from "./GenericDialog";
import {States} from "../option.types";
import {useTaskContext} from "../context/TaskContext";

const getChip = (state) => {
    const chip = {
        'pending': <Chip label={state} color="warning" />,
        'done': <Chip label={state} color="success" />,
        'overdue': <Chip label={state} color="error" />
    }
    return chip[state];
}


export default function Row({ row }) {
    // handling delete and confirm dialog separately to avoid componets collision.
    const [deleteDialog, setDeleteDialog] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);
    const { updateTask, deleteTask } = useTaskContext();
    const confirmAction = (row) => {
        return {
            action: () => updateTask(row),
            title: `Setting to done task ${row.id}`,
        }
    };
    const deleteAction = (row) => {
        return {
            action: () => deleteTask(row),
            title: `Deleting task ${row.id}`,
        }
    };
    return (
        <>
            <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
                <TableCell>{row.id}</TableCell>
                <TableCell align="left">{row.description}</TableCell>
                <TableCell align="left">{row.dueDate}</TableCell>
                <TableCell align="left">{getChip(row.state)}</TableCell>
                <TableCell  align="left">
                    <IconButton aria-label="check" disabled={row.state === States.done} onClick={() => setConfirmDialog(true)}>
                        <CheckIcon/>
                        {
                            confirmDialog && (<GenericDialog open={confirmDialog} setOpen={setConfirmDialog} options={confirmAction(row)}/>)
                        }
                    </IconButton>
                    <IconButton aria-label="delete" onClick={() => setDeleteDialog(true)}>
                        <DeleteIcon />
                        {
                            deleteDialog && (<GenericDialog open={deleteDialog} setOpen={setDeleteDialog} options={deleteAction(row)}/>)
                        }
                    </IconButton>
                </TableCell>
            </TableRow>
        </>
    );
}

Row.propTypes = {
    row: PropTypes.object
};
