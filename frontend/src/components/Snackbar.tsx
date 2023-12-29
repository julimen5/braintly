import * as React from 'react';
import Box from "@mui/material/Box";
import {Alert, Snackbar as MuiSnackbar} from "@mui/material";
import * as PropTypes from "prop-types";

export default function Snackbar({open, message, severity, handleOnClose}) {
    return (
        <Box>
            <MuiSnackbar onClose={handleOnClose} open={open} autoHideDuration={6000}>
                <Alert severity={severity} sx={{ width: '100%' }}>
                    {message}
                </Alert>
            </MuiSnackbar>
        </Box>
    )
}

Snackbar.propTypes = {
    message: PropTypes.string,
    severity: PropTypes.string,
    open: PropTypes.bool,
    handleOnClose: PropTypes.func
};
