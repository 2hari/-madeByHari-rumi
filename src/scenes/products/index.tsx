import { useState } from "react"
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Collapse,
  Button,
  Typography,
  Rating,
  useTheme,
  useMediaQuery,
  CircularProgress,
} from "@mui/material"

import Header from "../../components/Header"
import { useGetProductsQuery } from "../../state/api"
import { ProductStat } from "../../types"

type ProductProps = {
  _id: string
  name: string
  description: string
  price: number
  rating: number
  category: string
  supply: number
  stat: ProductStat
}

const Product = ({
  _id,
  name,
  description,
  price,
  rating,
  category,
  supply,
  stat,
}: ProductProps) => {
  const theme = useTheme()
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <Card
      sx={{
        backgroundImage: "none",
        backgroundColor: theme.palette.background.alt,
        borderRadius: "0.55rem",
      }}
    >
      <CardContent>
        <Typography
          sx={{ fontSize: 14 }}
          color={theme.palette.secondary[700]}
          gutterBottom
        >
          {category}
        </Typography>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: "1.5rem" }} color={theme.palette.secondary[400]}>
          ${Number(price).toFixed(2)}
        </Typography>
        <Rating value={rating} readOnly />

        <Typography variant="body2">{description}</Typography>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          size="small"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          See More
        </Button>
      </CardActions>
      <Collapse
        in={isExpanded}
        timeout="auto"
        unmountOnExit
        sx={{
          color: theme.palette.neutral[300],
        }}
      >
        <CardContent>
          <Typography>id: {_id}</Typography>
          <Typography>Supply Left: {supply}</Typography>
          <Typography>
            Yearly Sales This Year: {stat.yearlySalesTotal}
          </Typography>
          <Typography>
            Yearly Units Sold This Year: {stat.yearlyTotalSoldUnits}
          </Typography>
        </CardContent>
      </Collapse>
    </Card>
  )
}

const Products = () => {
  const { data, isLoading } = useGetProductsQuery(undefined)
  const isDesktop = useMediaQuery("(min-width: 1500px)")
  const isLaptop = useMediaQuery("(min-width: 1200px) and (max-width: 1500px)")
  const isTablet = useMediaQuery("(min-width: 600px) and (max-width: 1200px)")
  const isMobile = useMediaQuery("(max-width: 600px)")

  const gridColumnSpan = () => {
    if (isDesktop) return "span 3"
    if (isLaptop) return "span 4"
    if (isTablet) return "span 6"
    if (isMobile) return "span 12"
  }

  return (
    <Box
      m="1.5rem 2.5rem"
      sx={{
        minHeight: "75vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
      }}
    >
      <Header title="PRODUCTS" subtitle="See your list of products." />

      {data || !isLoading ? (
        <Box
          mt="20px"
          display="grid"
          gridTemplateColumns="repeat(12, minmax(0, 1fr))"
          justifyContent="space-between"
          rowGap="20px"
          columnGap="1.33%"
          sx={{
            "& > div": { gridColumn: gridColumnSpan() },
          }}
        >
          {data.map(
            ({
              _id,
              name,
              description,
              price,
              rating,
              category,
              supply,
              stat,
            }: ProductProps) => (
              <Product
                key={_id}
                _id={_id}
                name={name}
                description={description}
                price={price}
                rating={rating}
                category={category}
                supply={supply}
                stat={stat}
              />
            )
          )}
        </Box>
      ) : (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <CircularProgress color="inherit" />
        </Box>
      )}
    </Box>
  )
}

export default Products
