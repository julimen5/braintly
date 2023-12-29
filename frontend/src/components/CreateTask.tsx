import {Button, FormControl, FormHelperText, Grid, InputLabel, OutlinedInput} from '@mui/material';
import {Formik} from 'formik';
import * as Yup from 'yup';
import Box from '@mui/material/Box';
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {DatePicker} from '@mui/x-date-pickers/DatePicker';
import * as React from 'react';
import {useState} from 'react';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";
import Snackbar from "./Snackbar";
import Backdrop from "./Backdrop";
import {useTaskContext} from "../context/TaskContext";


const CreateTask = () => {
    const [snackbar, setSnackbar] = useState({open: false, severity: '', message: ''})
    const { createTask } = useTaskContext();
    return (
        <Formik
            initialValues={{
                description: '',
                dueDate: '',
            }}
            validationSchema={Yup.object().shape({
                description: Yup.string().min(3).max(1000).required('Description is required'),
                dueDate: Yup.date().min(new Date(), 'Date must after now'),
            })}
            onSubmit={async (values, {setStatus, setSubmitting }) => {
                setSubmitting(true)
                try {
                    const shallowValues = {...values};
                    if(shallowValues.dueDate === '') {
                        shallowValues.dueDate = null
                    }
                    await createTask(shallowValues);

                    setStatus({ success: true });
                    setSnackbar({open: true, severity: 'success', message: 'Task created'})
                } catch (err) {
                    setStatus({ success: false });
                    setSnackbar({open: true, severity: 'error', message: err.response?.data?.message || 'Something failed'})
                } finally {
                    setSubmitting(false);
                }
            }}
        >
            {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values, setFieldValue }) => (
                <form onSubmit={handleSubmit}>
                    <Grid container alignItems="center" spacing={3} direction="column" justifyContent="center">
                        <Grid item xs zeroMinWidth>
                            <FormControl fullWidth margin="normal" error={Boolean(touched.description && errors.description)}>
                                <InputLabel htmlFor="outlined-adornment-description">Description</InputLabel>
                                <OutlinedInput
                                    id="outlined-adornment-description"
                                    defaultValue={values.description}
                                    name="description"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    label="First name"
                                />
                                {touched.description && errors.description && (
                                    <FormHelperText error id="standard-weight-helper-text--create">
                                        {errors.description}
                                    </FormHelperText>
                                )}
                            </FormControl>
                            <FormControl fullWidth margin="normal" error={Boolean(touched.dueDate && errors.dueDate)}>
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DatePicker
                                    name="dueDate"
                                    onChange={(date, ...rest) => {
                                        setFieldValue('dueDate', dayjs(date as any).toDate())
                                    }}
                                    label="Due Date"
                                />
                                {touched.dueDate && errors.dueDate && (
                                    <FormHelperText error id="standard-weight-helper-text--dueDate">
                                        {errors.dueDate}
                                    </FormHelperText>
                                )}
                                </LocalizationProvider>
                            </FormControl>
                        </Grid>
                        <Grid item xs zeroMinWidth>
                            <Box sx={{ mt: 2 }}>
                                <Button disableElevation disabled={isSubmitting} type="submit" variant="contained" color="primary">
                                    Create
                                </Button>
                            </Box>
                        </Grid>
                        <Backdrop open={isSubmitting}/>
                        <Snackbar
                            open={snackbar.open}
                            handleOnClose={() => setSnackbar({...snackbar, open: false})}
                            message={snackbar.message}
                            severity={snackbar.severity}
                        />
                    </Grid>
                </form>
            )}
        </Formik>
    );
};
export default CreateTask;
