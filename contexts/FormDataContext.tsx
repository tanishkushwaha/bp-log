import { createContext, useContext, useState } from "react";

type FormDataType = {
  sys: string;
  dia: string;
  pulse: string;
  date: Date;
  time: Date;
};

type FormDataContextType = {
  formData: FormDataType;
  setFormData: React.Dispatch<React.SetStateAction<FormDataType>>;
};
const FormDataContext = createContext<FormDataContextType | null>(null);

const defaultFormState: FormDataType = {
  sys: "",
  dia: "",
  pulse: "",
  date: new Date(),
  time: new Date(),
};

function FormDataProvider({ children }: { children: React.ReactNode }) {
  const [formData, setFormData] = useState<FormDataType>(defaultFormState);

  return (
    <FormDataContext.Provider value={{ formData, setFormData }}>
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

export { FormDataProvider, useFormData, FormDataType, defaultFormState };
