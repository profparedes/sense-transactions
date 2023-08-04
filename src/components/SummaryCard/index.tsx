import { Card } from "./styles";

interface SummaryCardProps {
  title: string;
  icon?: React.ReactNode;
  amount: number;
  textStyle?: string;
  isTotal?: boolean;
}

export const SummaryCard = ({ title, icon, amount, textStyle="text-white", isTotal=false }: SummaryCardProps) => {
  const isPositive = amount >= 0;
  const background = isPositive ? "#33cc95" : "#f37474";

  return (
  <Card style={isTotal ? { background } : undefined}>
    <header className={isTotal ? "text-white" : undefined}>
      <p className="me-1">{title}</p>
      {icon || <p className="fs-5">R$</p>}
    </header>
    <strong className={textStyle}>
      {new Intl.NumberFormat("pt-BR", {
        style: "currency",
        currency: "BRL",
      }).format(amount)}
    </strong>
  </Card>
)};
