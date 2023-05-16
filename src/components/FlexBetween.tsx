import { Box } from "@mui/material"
import { styled } from "@mui/system"

interface FlexBetweenProps {
  backgroundColor?: string
  // Add other props if needed
}

const FlexBetween = styled(Box)<FlexBetweenProps>({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
})

export default FlexBetween
