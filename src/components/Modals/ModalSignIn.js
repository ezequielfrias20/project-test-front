import React from "react";
import {
  Box,
  Button,
  Container,
  IconButton,
  InputAdornment,
  Paper,
  TextField,
  FormHelperText,
  Typography,
  Divider,
  Link,
  Card,
  CardContent
} from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";
import * as Yup from "yup";
import { Formik } from "formik";

const ModalSignIn = ({ login, navigate }) => (
  <Box
    sx={{
      backgroundColor: "background.default",
      minHeight: "100%",
      p: 3,
    }}
  >
    <Paper elevation={12}>
      <Box
        sx={{
          backgroundColor: "background.default",
          display: "flex",
          flexDirection: "column",
          minHeight: "100%",
        }}
      >
        <Container maxWidth="sm" sx={{ py: "80px" }}>
          <Card sx={{ boxShadow: "unset" }}>
            <CardContent
              sx={{
                display: "flex",
                flexDirection: "column",
                p: 4,
              }}
            >
              <Box
                sx={{
                  alignItems: "center",
                  display: "flex",
                  justifyContent: "space-between",
                  mb: 3,
                }}
              >
                <div>
                  <Typography color="textPrimary" gutterBottom variant="h4">
                    Sign In
                  </Typography>
                </div>
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  mt: 3,
                }}
              >
                <Formik
                  initialValues={{
                    user: "",
                    password: "",
                    submit: null,
                  }}
                  validationSchema={Yup.object().shape({
                    user: Yup.string()
                      .max(255)
                      .required("User is required"),
                    password: Yup.string()
                      .max(255)
                      .required("Password is required"),
                  })}
                  onSubmit={async (
                    values,
                    { setErrors, setStatus, setSubmitting }
                  ) => {
                    try {
                      const response = await login(values.user, values.password);
                      if (response.login) {
                        navigate("/", { replace: true })
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
                        error={Boolean(touched.user && errors.user)}
                        fullWidth
                        helperText={touched.user && errors.user}
                        label="User"
                        margin="normal"
                        name="user"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="user"
                        value={values.user}
                        variant="outlined"
                      />
                      <TextField
                        error={Boolean(touched.password && errors.password)}
                        fullWidth
                        helperText={touched.password && errors.password}
                        label="Password"
                        margin="normal"
                        name="password"
                        onBlur={handleBlur}
                        onChange={handleChange}
                        type="password"
                        value={values.password}
                        variant="outlined"
                      />
                      {errors.submit && (
                        <Box sx={{ mt: 3 }}>
                          <FormHelperText error>{errors.submit}</FormHelperText>
                        </Box>
                      )}
                      <Box sx={{ mt: 2 }}>
                        <Button
                          color="primary"
                          disabled={isSubmitting}
                          fullWidth
                          size="large"
                          type="submit"
                          variant="contained"
                        >
                          Log In
                        </Button>
                      </Box>
                    </form>
                  )}
                </Formik>
              </Box>
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Paper>
  </Box>
);

export default ModalSignIn;
