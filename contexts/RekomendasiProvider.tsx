import { createContext, useState, ReactNode, FC, useContext } from "react";

interface IRekomendasiContext {
  recItem: any;
  changeRecItem: (item: any) => void;
}

const RekomendasiContext = createContext<IRekomendasiContext>({
  recItem: null,
  changeRecItem: () => {},
});

export const useRekomendasi = () => {
  return useContext(RekomendasiContext);
};

const RekomendasiProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [recItem, setRecItem] = useState<any>(null);

  function changeRecItem(item: any) {
    setRecItem(item);
  }

  return (
    <RekomendasiContext.Provider value={{ recItem, changeRecItem }}>
      {children}
    </RekomendasiContext.Provider>
  );
};

export default RekomendasiProvider;
