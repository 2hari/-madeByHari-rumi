import { useMemo } from "react"
import { ResponsiveLine } from "@nivo/line"
import { Box, CircularProgress, useTheme } from "@mui/material"

import { useGetSalesQuery } from "../state/api"
import { MonthlyData } from "../types"

type OverviewChartType = {
  isDashboard: boolean
  view: "sales" | "units"
}

type LineData = {
  id: string
  color: string
  data: { x: string; y: number }[]
}

const OverviewChart = ({ isDashboard = false, view }: OverviewChartType) => {
  const theme = useTheme()
  const { data, isLoading } = useGetSalesQuery(undefined)

  const [totalSalesLine, totalUnitsLine] = useMemo(() => {
    if (!data) return [undefined, undefined]

    const { monthlyData } = data

    const totalSalesLine: LineData = {
      id: "totalSales",
      color: theme.palette.secondary.main,
      data: [],
    }

    const totalUnitsLine: LineData = {
      id: "totalUnits",
      color: theme.palette.secondary[600],
      data: [],
    }

    Object.values<MonthlyData>(monthlyData).reduce(
      (acc, { month, totalSales, totalUnits }) => {
        const curSales = acc.sales + totalSales
        const curUnits = acc.units + totalUnits

        totalSalesLine.data.push({ x: month, y: curSales })
        totalUnitsLine.data.push({ x: month, y: curUnits })

        return { sales: curSales, units: curUnits }
      },
      { sales: 0, units: 0 }
    )

    return [totalSalesLine, totalUnitsLine]
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  const lineData: LineData[] =
    view === "sales" && totalSalesLine
      ? [totalSalesLine]
      : totalUnitsLine
      ? [totalUnitsLine]
      : []

  if (!data || isLoading)
    return (
      <Box
        sx={{
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          height: "100%",
        }}
      >
        <CircularProgress color="inherit" />
      </Box>
    )

  return (
    <ResponsiveLine
      data={lineData}
      theme={{
        axis: {
          domain: {
            line: {
              stroke: theme.palette.secondary[200],
            },
          },
          legend: {
            text: {
              fill: theme.palette.secondary[200],
            },
          },
          ticks: {
            line: {
              stroke: theme.palette.secondary[200],
              strokeWidth: 1,
            },
            text: {
              fill: theme.palette.secondary[200],
            },
          },
        },
        legends: {
          text: {
            fill: theme.palette.secondary[200],
          },
        },
        tooltip: {
          container: {
            color: theme.palette.primary.main,
          },
        },
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        format: (v) => {
          if (isDashboard) return v.slice(0, 3)
          return v
        },
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard ? "" : "Month",
        legendOffset: 36,
        legendPosition: "middle",
        tickValues: 5,
      }}
      axisLeft={{
        tickSize: 5,
        tickPadding: 5,
        tickRotation: 0,
        legend: isDashboard
          ? ""
          : `Total ${view === "sales" ? "Revenue" : "Units"} for Year`,
        legendOffset: -60,
        legendPosition: "middle",
        tickValues: 5,
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
                itemsSpacing: 0,
                itemDirection: "left-to-right",
                itemWidth: 80,
                itemHeight: 20,
                itemOpacity: 0.75,
                symbolSize: 12,
                symbolShape: "circle",
                symbolBorderColor: "rgba(0, 0, 0, .5)",
                effects: [
                  {
                    on: "hover",
                    style: {
                      itemBackground: "rgba(0, 0, 0, .03)",
                      itemOpacity: 1,
                    },
                  },
                ],
              },
            ]
          : undefined
      }
    />
  )
}

export default OverviewChart
