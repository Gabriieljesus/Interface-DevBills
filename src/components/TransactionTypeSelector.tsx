import { TransactionType } from "../types/transactions";

interface TransactionTypeSelectionProps {
  value: TransactionType;
  id?: string;
  onChange: (type: TransactionType) => void;
};

const TransactionTypeSelector = ({value, onChange, id }: TransactionTypeSelectionProps) => {
  const transactionsTypeButton = [
    {
      type: TransactionType.EXPENSE,
      label: "Despesas",
      activeClasses: "bg-red-500 border-red-500 text-red-700 font-medium",
      inactiveClasses: "bg-transparent border-red-300 text-red-300 hover:bg-red-50",
    },
    {
      type: TransactionType.INCOME,
      label: "Receitas",
      activeClasses: "bg-green-500 border-green-500 text-green-700 font-medium",
      inactiveClasses: "bg-transparent border-green-300 text-green-300 hover:bg-green-50",
    }
  ];

  return (
    <fieldset id={id} className="grid grid-cols-2 gap-4">
      <legend>Tipo de Transação</legend>

      {transactionsTypeButton.map((item) => (
        <button 
          key={item.type} 
          type="button"
          className={`cursor-pointer flex items-center justify-center border rounded-md py-2 px-4 transation-all ${value === item.type ? item.activeClasses : item.inactiveClasses}`}
          onClick={() => onChange(item.type)}
        >
          {item.label}
        </button>
      ))}
    </fieldset>
  )
};

export default TransactionTypeSelector;