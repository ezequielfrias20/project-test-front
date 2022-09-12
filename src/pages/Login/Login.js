import { Box, Container } from '@material-ui/core';
import { useNavigate } from "react-router-dom";

import ModalSignIn from '../../components/Modals/ModalSignIn';
import useAuth from '../../hooks/useAuth';

const Login = () => {
  const { login } = useAuth()
  const navigate = useNavigate();
  
  return (
    <>
        <Container maxWidth='xl'>
          <ModalSignIn login={login} navigate={navigate} />
        </Container>
    </>
  );
};

export default Login;