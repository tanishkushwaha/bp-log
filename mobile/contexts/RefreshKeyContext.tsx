import { createContext, ReactNode, useContext, useState } from "react";

type refreshKeyContextType = {
  refreshKey: number;
  updateRefreshKey: () => void;
};

const RefreshKeyContext = createContext<refreshKeyContextType | null>(null);

function RefreshKeyProvider({ children }: { children: ReactNode }) {
  const [refreshKey, setRefreshKey] = useState(0);

  const updateRefreshKey = () => setRefreshKey((prev) => prev + 1);

  return (
    <RefreshKeyContext.Provider value={{ refreshKey, updateRefreshKey }}>
      {children}
    </RefreshKeyContext.Provider>
  );
}

const useRefreshKey = () => {
  const context = useContext(RefreshKeyContext);

  if (!context)
    throw new Error(
      "useRefreshKey() should be used within the RefreshKeyProvider."
    );

  return context;
};

export { RefreshKeyProvider, useRefreshKey };
