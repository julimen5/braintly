import * as React from 'react';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import * as PropTypes from "prop-types";

const GenericDialog = ({open, setOpen, options}) => {
    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = async () => {
        try {
            await options.action()
        } catch (e) {
            console.log(e);
        } finally {
            setOpen(false);
        }
    };

    return (
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>{options.title}</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Are you sure you want to proceed?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
    );
};

export default GenericDialog;

GenericDialog.propTypes = {
    options: PropTypes.object,
    open: PropTypes.bool,
    setOpen: PropTypes.func
};
