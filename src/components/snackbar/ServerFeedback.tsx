import { Alert, AlertProps, Snackbar } from "@mui/material"
import { forwardRef, useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { TAuthState } from "../../storage/state"

const FeedbackAlert = forwardRef<HTMLDivElement, AlertProps>((props, ref) => {
  return (
    <Alert
      elevation={2} 
      ref={ref} 
      variant="filled" 
      {...props}
    />
  )
})

export function ServerFeedback() {
  const [open, setOpen] = useState(true)
  const isPageLogin = useSelector((state: TAuthState) => state.pageLogin)

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  }
  
  useEffect(() => {
    setOpen(true)
  },[isPageLogin])

  return(
    <>
      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={open} 
        autoHideDuration={6000} 
        onClose={handleClose}      
      >
        <FeedbackAlert 
          onClose={handleClose} 
          severity="success" 
          sx={{
            color: '#e7e7e7',
            maxWidth: '20.5rem',
            minWidth: '14rem'
          }}
        >
          This is a success message!
        </FeedbackAlert>
      </Snackbar>
    </>
  )
}

export default ServerFeedback