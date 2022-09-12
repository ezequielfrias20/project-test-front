import {
    Box,
    Button,
    Container,
    FormControl,
    FormControlLabel,
    FormHelperText,
    FormLabel,
    IconButton,
    Paper,
    Radio,
    RadioGroup,
    TextField,
    Typography
} from '@material-ui/core';
import * as Yup from "yup";
import { Formik } from "formik";
import Loader from '../../Loader';


const Modal = ({ onClose, bill, mdUp, create, remove, isLoadingModal }) => (
    <Box
        sx={{
            minHeight: '100%',
            minWidth: '100%',
            position: 'relative',
        }}
    >
        <Box
            sx={{
                maxHeight: '100%',
                maxWidth: mdUp ? '100%' : '50%',
                p: 3,
                position: 'fixed',
                top: 0,
                left: 0,
                zIndex: 2,
                inset: '0',
                margin: 'auto'
            }}
        >
            <Paper elevation={12}>
                <Box sx={{ px: 6, pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} >
                    <Typography
                        color="textPrimary"
                        variant="h6"
                    >
                        Registro de movimiento
                    </Typography>
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end'
                        }}
                    >
                        <IconButton onClick={onClose}>
                            x
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ p: 3 }}>

                    <Container maxWidth="md">
                        <Box
                            sx={{
                                alignItems: 'center',
                                display: 'flex'
                            }}
                        >
                            {!isLoadingModal &&
                                <Box
                                    sx={{
                                        flexGrow: 1,
                                        mt: 3,
                                    }}
                                >
                                    <Formik
                                        initialValues={{
                                            observation: bill ? bill.observation : "",
                                            value: bill ? bill.value : "",
                                            type: bill ? bill.type : "1"
                                        }}
                                        validationSchema={Yup.object().shape({
                                            observation: Yup.string()
                                                .max(255)
                                                .required("La observación es requerida"),
                                            value: Yup.number()
                                                .required("El monto es requerido"),
                                            type: Yup.string()
                                                .max(2)
                                        })}
                                        onSubmit={async (
                                            values,
                                            { setErrors, setStatus, setSubmitting }
                                        ) => {
                                            try {
                                                if (!bill) {
                                                    await create(values)
                                                } else {
                                                    await remove(bill.id)
                                                }
                                                setStatus({ success: true });
                                                setSubmitting(false);
                                            } catch (err) {
                                                console.error(err);
                                                setStatus({ success: false });
                                                setErrors({ submit: err.message });
                                                setSubmitting(false);
                                            }
                                        }}
                                    >
                                        {({
                                            errors,
                                            handleBlur,
                                            handleChange,
                                            handleSubmit,
                                            isSubmitting,
                                            touched,
                                            values,
                                        }) => (
                                            <form noValidate onSubmit={handleSubmit}>
                                                <TextField
                                                    autoFocus
                                                    error={Boolean(touched.observation && errors.observation)}
                                                    fullWidth
                                                    helperText={touched.observation && errors.observation}
                                                    label="Observación"
                                                    margin="normal"
                                                    name="observation"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="observation"
                                                    value={values.observation}
                                                    variant="outlined"
                                                    multiline
                                                    rows={4}
                                                    disabled={bill ? true : false}
                                                />
                                                <FormControl disabled={bill ? true : false} sx={{ marginY: 5, width: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                                    <FormLabel id="demo-radio-buttons-group-label">Tipo de movimiento</FormLabel>
                                                    <RadioGroup
                                                        aria-labelledby="demo-radio-buttons-group-label"
                                                        defaultValue={values.type}
                                                        name="type"
                                                        sx={{ width: '100%', display: 'flex', justifyContent: 'space-around', flexDirection: 'row' }}
                                                        onChange={(e) => handleChange(e)}

                                                    >
                                                        <FormControlLabel value="1" control={<Radio />} label="Ingreso" />
                                                        <FormControlLabel value="2" control={<Radio />} label="Gasto" />
                                                    </RadioGroup>
                                                </FormControl>
                                                <TextField
                                                    error={Boolean(touched.value && errors.value)}
                                                    fullWidth
                                                    helperText={touched.value && errors.value}
                                                    label="Monto"
                                                    margin="normal"
                                                    name="value"
                                                    onBlur={handleBlur}
                                                    onChange={handleChange}
                                                    type="number"
                                                    value={values.value}
                                                    variant="outlined"
                                                    disabled={bill ? true : false}

                                                />
                                                {errors.submit && (
                                                    <Box sx={{ mt: 3 }}>
                                                        <FormHelperText error>{errors.submit}</FormHelperText>
                                                    </Box>
                                                )}
                                                <Box sx={{ mt: 4 }}>

                                                    <Button
                                                        color="primary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        type="submit"
                                                        variant="contained"
                                                    >
                                                        {!bill ? "Registrar" : "Eliminar"}
                                                    </Button>
                                                    <Button
                                                        color="secondary"
                                                        disabled={isSubmitting}
                                                        fullWidth
                                                        size="large"
                                                        variant="contained"
                                                        sx={{ marginTop: 2 }}
                                                        onClick={onClose}
                                                    >
                                                        Cancelar
                                                    </Button>
                                                </Box>
                                            </form>
                                        )}
                                    </Formik>

                                </Box>}
                            {isLoadingModal &&
                                <Box
                                    sx={{
                                        alignItems: 'center',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        marginBottom: 20,
                                        width: '100%'
                                    }}
                                ><Loader visible={isLoadingModal} />
                                </Box>
                            }
                        </Box>

                    </Container>
                </Box>
            </Paper>
        </Box >
        <Box
            sx={{
                minHeight: '100%',
                minWidth: '100%',
                position: 'fixed',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.5,
                zIndex: 1,
                backgroundColor: 'gray'
            }}
            onClick={onClose}
        ></Box >
    </Box >
);

export default Modal;