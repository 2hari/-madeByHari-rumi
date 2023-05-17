export type User = {
  name: string
  occupation: string
}

export type ProductStat = {
  yearlySalesTotal: number
  yearlyTotalSoldUnits: number
}

export type MonthlyData = {
  month: string
  totalSales: number
  totalUnits: number
  _id: string
}

export type DailyData = {
  date: string
  totalSales: number
  totalUnits: number
  _id: string
}