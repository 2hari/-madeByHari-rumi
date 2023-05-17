import {
  GridColumnMenuContainer,
  GridFilterMenuItem,
  HideGridColMenuItem,
  GridColDef,
} from "@mui/x-data-grid"

type CustomColumnMenuProps = {
  hideMenu: () => void
  currentColumn: GridColDef
  open: boolean
}

const CustomColumnMenu = (props: CustomColumnMenuProps) => {
  const { hideMenu, currentColumn, open } = props
  return (
    <GridColumnMenuContainer
      hideMenu={hideMenu}
      currentColumn={currentColumn}
      open={open}
    >
      <GridFilterMenuItem onClick={hideMenu} column={currentColumn} />
      <HideGridColMenuItem onClick={hideMenu} column={currentColumn} />
    </GridColumnMenuContainer>
  )
}

export default CustomColumnMenu
