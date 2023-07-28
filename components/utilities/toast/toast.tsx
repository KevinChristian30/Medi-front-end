import { Alert, Snackbar, AlertColor } from "@mui/material";

interface Props {
  isOpen: boolean;
  closeToast: () => void;

  severity?: AlertColor;
  message: string;
}

const Toast = (props: Props) => {
  const { isOpen, closeToast, message, severity } = props;

  return ( 
    <Snackbar
      open={isOpen}
      autoHideDuration={5000}
      onClose={closeToast}
      anchorOrigin={{vertical: 'top', horizontal: 'center'}}>
        <Alert 
          variant="standard"
          onClose={closeToast} 
          severity={severity ? severity : "success"} 
          >
          {message}
        </Alert>
    </Snackbar>
   );
}
 
export default Toast;