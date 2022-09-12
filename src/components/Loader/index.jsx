import { Box } from '@material-ui/core'
import { Circles } from 'react-loader-spinner'

const Loader = ({visible}) => {
    return (
        <Box
          sx={{
            height: "100%",
            width: "100%",
            display: "flex",
            justifyContent: 'center',
            alignItems:'center',
            marginTop: 20   
          }}
        >
          <Circles
            height="80"
            width="80"
            color="#3f51b5"
            ariaLabel="circles-loading"
            wrapperStyle={{}}
            wrapperClass=""
            visible={visible}
          />
        </Box>
    )
}

export default Loader