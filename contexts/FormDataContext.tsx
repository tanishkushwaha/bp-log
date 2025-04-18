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

function FormDataProvider({ children }: { children: React.ReactNode }) {
  // TODO: Add null state to formData type
  const [formData, setFormData] = useState<FormDataType>({
    sys: "",
    dia: "",
    pulse: "",
    date: new Date(),
    time: new Date(),
  });

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

export { FormDataProvider, useFormData, FormDataType };
