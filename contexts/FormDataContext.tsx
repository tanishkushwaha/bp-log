import { createContext, useContext, useState } from "react";

type FormDataType = {
  sys: string;
  dia: string;
  pulse: string;
  date: Date;
  time: Date;
};

type FormDataContextType = {
  formData: FormDataType | null;
  updateFormData: (data: FormDataType) => void;
};
const FormDataContext = createContext<FormDataContextType | null>(null);

function FormDataProvider({ children }: { children: React.ReactNode }) {
  const [formData, setData] = useState<FormDataType | null>(null);

  const updateFormData = (data: FormDataType) => {
    setData(data);
  };

  return (
    <FormDataContext.Provider value={{ formData, updateFormData }}>
      {children}
    </FormDataContext.Provider>
  );
}

const useFormData = () => {
  const context = useContext(FormDataContext);
  if (!context)
    throw Error("useFormData() must be used within a FormDataProvider");
  return context;
};

export { FormDataProvider, useFormData, FormDataType };
