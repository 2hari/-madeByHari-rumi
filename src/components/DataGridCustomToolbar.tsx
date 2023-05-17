import { useState } from "react"
import SearchIcon from "@mui/icons-material/Search"
import FilterListIcon from "@mui/icons-material/FilterList"
import {
  IconButton,
  TextField,
  InputAdornment,
  useMediaQuery,
} from "@mui/material"
import {
  GridToolbarDensitySelector,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarColumnsButton,
} from "@mui/x-data-grid"

import FlexBetween from "./FlexBetween"

type DataGridCustomToolbarProps = {
  searchInput: string
  setSearchInput: (arg: string) => void
  setSearch: (arg: string) => void
}

const DataGridCustomToolbar = ({
  searchInput,
  setSearchInput,
  setSearch,
}: DataGridCustomToolbarProps) => {
  const isNonMobile = useMediaQuery("(min-width: 600px)")
  const [showSearch, setShowSearch] = useState(false)
  return (
    <GridToolbarContainer>
      <FlexBetween width="100%">
        <FlexBetween
          sx={{
            display: showSearch ? "none" : "block",
            mt: "1rem",
            mb: "0.5rem",
          }}
        >
          <GridToolbarColumnsButton />
          <GridToolbarDensitySelector />
          <GridToolbarExport />
        </FlexBetween>
        <TextField
          label="Search..."
          sx={{
            display: isNonMobile || showSearch ? "block" : "none",
            mb: "0.5rem",
            width: "15rem",
          }}
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
          variant="standard"
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  onClick={() => {
                    setSearch(searchInput)
                    setSearchInput("")
                  }}
                >
                  <SearchIcon />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <IconButton
          sx={{
            display: isNonMobile ? "none" : "block",
            mt: "1rem",
          }}
          size="small"
          onClick={() => setShowSearch(!showSearch)}
        >
          {showSearch ? <FilterListIcon /> : <SearchIcon />}
        </IconButton>
      </FlexBetween>
    </GridToolbarContainer>
  )
}

export default DataGridCustomToolbar
