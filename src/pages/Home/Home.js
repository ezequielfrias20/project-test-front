import { useEffect, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import { Box, Button, Container, Grid, Typography } from "@material-ui/core";
import TableHome from "../../components/Home/Table";
import ButtonFloating from "../../components/common/ButtonFloating";
import Modal from "../../components/common/Modal";
import useAuth from "../../hooks/useAuth";
import BillsRepository from "../../repositories/bills.repository";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import { Circles } from "react-loader-spinner";
import Loader from "../../components/Loader";

const Home = () => {
  const billsRepository = new BillsRepository();
  const mdUp = useMediaQuery("(max-width:800px)");
  const { logout, user } = useAuth();
  const [bills, setBills] = useState([]);
  const [open, setOpen] = useState(false);
  const [bill, setBill] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingModal, setIsLoadingModal] = useState(true);
  const [reload, setReload] = useState(true);

  const getBills = () => {
    setIsLoading(true)
    billsRepository
      .getAllBills(user)
      .then((res) => {
        setBills(res);
        setIsLoading(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false)
      });
  };

  const getBill = (id) => {
    setIsLoadingModal(true)
    setOpen(true);
    billsRepository
      .getBillById(user, id)
      .then((res) => {
        setBill(res);      
        setIsLoadingModal(false)
      })
      .catch((err) => {
        console.log(err);
        setIsLoadingModal(false)
      });
  };

  const handleCell = (id) => {
    getBill(id);
  };

  const onClose = () => {
    setBill(null)
    setOpen(false)
  };

  const createBill = (body) => {
    billsRepository.create(body, user).then((res) => {
      setBill(null)
      setReload(!reload)
      setOpen(false)
    });
  };
  const removeBill = (bill_id) => {
    billsRepository.remove(user, bill_id).then((res) => {
      setBill(null)
      setOpen(false)
      setReload(!reload)
    });
  };

  
  useEffect(() => {
    getBills();
  }, [reload]);

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#fff",
          minHeight: "100vh",
          py: 4,
          marginBottom: 10,
        }}
      >
        <Container maxWidth="xl">
          <Grid
            container
            justifyContent="space-between"
            spacing={3}
            sx={{
              marginBottom: 5,
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
            }}
          >
            <Grid item>
              <Typography color="textPrimary" variant="h3">
                Bienvenido
              </Typography>
            </Grid>
            <Grid item>
              <Button
                color="primary"
                sx={{ ml: 2 }}
                variant="contained"
                component={RouterLink}
                onClick={logout}
                to="/login"
              >
                cerrar sesión
              </Button>
            </Grid>
          </Grid>
          <Box>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                {!isLoading && <TableHome data={bills} actionCell={handleCell} />}
                {isLoading && <Loader visible ={isLoading}/> }        
              </Grid>
            </Grid>
          </Box>
        </Container>
        {!isLoading && <ButtonFloating onClick={() => setOpen(true)} />}

        {open && (
          <Modal
            onClose={onClose}
            bill={bill}
            mdUp={mdUp}
            create={createBill}
            remove={removeBill}
            isLoadingModal={isLoadingModal}
          />
        )}
      </Box>
    </>
  );
};

export default Home;
