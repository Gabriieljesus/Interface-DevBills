import { useEffect, useId, useState, type ChangeEvent, type FormEvent } from "react";
import { TransactionType } from "../types/transactions";
import { getCategories } from "../services/categoryServices";
import type { Category } from "../types/category";
import Card from "../components/Card";
import TransactionTypeSelector from "../components/TransactionTypeSelector";
import Input from "../components/Input";
import { AlertCircle, Calendar, DollarSign, Save, Tag } from "lucide-react";
import Select from "../components/Select";
import Button from "../components/Button";
import { useNavigate } from "react-router"
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
  const [error, setError] = useState<string | null>(null)
  const [fieldErrors, setFieldErrors] = useState<Partial<Record<keyof FormData, string>>>({})
  const formId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCatgories = async () => {
      const response = await getCategories();
      setCategories(response);
    };

    fetchCatgories();
  }, []);

  const filteredCategories = categories.filter((category) => category.type === formData.type)

  const validedeForm = (): boolean => {
  // ✅ Valida um campo por vez, na ordem
  if (!formData.description) {
    setFieldErrors({ description: "Preencha a descrição" });
    setError("Preencha todos os campos corretamente");
    return false;
  }

  if (!formData.amount || formData.amount <= 0) {
    setFieldErrors({ amount: "Insira um valor válido" });
    setError("Preencha todos os campos corretamente");
    return false;
  }

  if (!formData.date) {
    setFieldErrors({ date: "Selecione uma data" });
    setError("Preencha todos os campos corretamente");
    return false;
  }

  if (!formData.categoryId) {
    setFieldErrors({ categoryId: "Selecione uma categoria" });
    setError("Preencha todos os campos corretamente");
    return false;
  }

  setFieldErrors({});
  setError(null);
  return true;
};

  const handleTransactionType = (itemType: TransactionType): void => {
    setFormData((prev) => ({ ...prev, type: itemType }));
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: undefined })); // ← limpa o erro do campo
  };

  const handleSubmit = async (event: FormEvent): Promise<void> => {
    event.preventDefault();

    try {
      if (!validedeForm()) {
        return;
      }

    } catch (error) {

    }

    console.log(event);
  };

  const handleCancel = () => {
    navigate("/transacoes")
  };

  return (
    <div className="container-app py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold mb-6">Nova Transação</h1>
        <Card>

          {error && (
            <div className="flex items-center bg-red-300 border-red-700 rounded-xl p-4 mb-6 gap-2">
              <AlertCircle className="w-5 h-5 text-red-700" />
              <p className="text-red-700">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-3 flex gap-2 flex-col">
              <label htmlFor={formId} className="mb-4">Tipo de Transação</label>
              <TransactionTypeSelector
                id={formId}
                value={formData.type}
                onChange={handleTransactionType}
              />
            </div>
            <Input
              label="Descrição"
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Ex: Supermercado, Salário, etc..."
              error={fieldErrors.description}
            />

            <Input
              label="Valor"
              name="amount"
              type="number"
              step="0.01"
              value={formData.amount}
              onChange={handleChange}
              placeholder="R$ 0,00"
              icon={<DollarSign className="w-4 h-4" />}
              error={fieldErrors.amount}
            />

            <Input
              label="Data"
              name="date"
              type="date"
              value={formData.date}
              onChange={handleChange}
              icon={<Calendar className="w-4 h-4" />}
              error={fieldErrors.date}
            />

            <Select
              label="Categoria"
              name="categoryId"
              value={formData.categoryId}
              onChange={handleChange}
              icon={<Tag className="w-4 h-4" />}
              error={fieldErrors.categoryId}
              options={[
                { value: "", label: "Selecione uma categoria" },
                ...filteredCategories.map((category) => ({
                  value: category.id,
                  label: category.name,
                }))
              ]}
            />

            <div className="flex justify-end space-x-3 mt-2 ">
              <Button variant="outline" onClick={handleCancel} type="button">Cancelar</Button>
              <Button type="submit" variant={formData.type === TransactionType.EXPENSE ? "danger" : "success"}>
                <Save className="w-4 h-4 mr-2 " />
                Salvar
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
};

export default TransactionsForm;