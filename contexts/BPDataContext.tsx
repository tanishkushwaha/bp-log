import { createContext, useContext, useState } from "react";

type BPDataType = {
  id: string;
  date: Date;
  bp_sys: number;
  bp_dia: number;
  pr: number;
};

type BPDataContextType = {
  data: BPDataType[];
  clearData: () => void;
  setData: React.Dispatch<React.SetStateAction<BPDataType[]>>;
};

const BPDataContext = createContext<BPDataContextType | null>(null);

const useBPData = () => {
  const context = useContext(BPDataContext);
  if (!context)
    throw new Error("useBPData() must be used within a BPDataProvider");
  return context;
};

const BPDataProvider = ({ children }: { children: React.ReactNode }) => {
  const [data, setData] = useState<BPDataType[]>([]);

  const clearData = () => setData([]);

  return (
    <BPDataContext.Provider value={{ data, clearData, setData }}>
      {children}
    </BPDataContext.Provider>
  );
};

export { BPDataProvider, useBPData, BPDataType };
