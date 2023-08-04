export const formatCurrency = (value: number): string => new Intl.NumberFormat("pt-BR", {
  style: "currency",
  currency: "BRL",
}).format(value)

export const formatDate = (date: string): string => new Intl.DateTimeFormat("pt-BR").format(
    new Date(date)
  )