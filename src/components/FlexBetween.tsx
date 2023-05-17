import { Box } from "@mui/material"
import { styled } from "@mui/system"

interface FlexBetweenProps {
  backgroundColor?: string
  direction?: "row" | "column"
  // Add other props if needed
}

const FlexBetween = styled(Box)<FlexBetweenProps>`
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flex-direction: ${(props) => props.direction || "row"};
  background-color: ${(props) => props.backgroundColor};
`

export default FlexBetween
