import { Box } from "@mui/material"
import { styled } from "@mui/material/styles"

const WidgetWrapper = styled(Box)(({ theme }) => ({
  padding: "1.5rem 1.5rem 0.75rem 1.5rem",
  backgroundColor: theme.palette.background.paper,
  borderRadius: "0.45rem"

}))

export default WidgetWrapper