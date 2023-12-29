import * as React from 'react';
import {Backdrop as MuiBackdrop, CircularProgress} from "@mui/material";
import * as PropTypes from "prop-types";

export default function Backdrop({ open }) {
    return (
        <MuiBackdrop
            sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, position: 'absolute' }}
            open={open}
        >
            <CircularProgress color="inherit" />
        </MuiBackdrop>
    )
}
Backdrop.propTypes = {
    open: PropTypes.bool
};
