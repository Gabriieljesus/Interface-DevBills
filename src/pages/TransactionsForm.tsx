import { useEffect, useId, useState } from "react";
import { TransactionType } from "../types/transactions";
import { getCategories } from "../services/categoryServices";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
interface FormData {
  description: string;
  amount: number;
  date: string;
  categoryId: string;
  type: TransactionType;
}

const initialFormData: FormData = {
  description: "",
  amount: 0,
  date: "",
  categoryId: "",
  type: TransactionType.EXPENSE,
};

const TransactionsForm = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const formId = useId();

  useEffect(() => {
  const fetchCatgories = async () => {
    const response = await getCategories();
    setCategories(response);
  };

  fetchCatgories();
}, []);

const handleTransactionType = (itemType: TransactionType): void => {
  setFormData((prev) => ({...prev, type: itemType}));
};

const handleSubmit = () => {

};

  return (
    <div>
      <div>
        <h1>Nova Transação</h1>
        <Card>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor={formId}>Tipo de Transação</label>
              <TransactionTypeSelector 
                id={formId}
                value={formData.type}
                onChange={handleTransactionType}
                />
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
};

export default TransactionsForm;