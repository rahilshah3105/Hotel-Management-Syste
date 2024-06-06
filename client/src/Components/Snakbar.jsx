import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { hideSnakbar } from "../store/slices/snakbar";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const SnackbarComponent = () => {
  const snackbarState = useSelector((state) => state.snakbar);
  const dispatch = useDispatch();

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    dispatch(hideSnakbar());
  };
  
  return (
    <Snackbar
      open={snackbarState.open}
      autoHideDuration={3000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert onClose={handleClose} severity={snackbarState.type}>
        {snackbarState.message}
      </Alert>
    </Snackbar>
  );
};

export default SnackbarComponent;
