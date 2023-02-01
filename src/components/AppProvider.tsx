import React, { createContext, useContext, useState } from "react";
import { SlideType } from "../types";

type AppContextType = {
  slides: SlideType[];
};

type AppContextDispatchType = {
  setSlides: React.Dispatch<React.SetStateAction<SlideType[]>>;
};

const AppContext = createContext<AppContextType>({
  slides: [],
});

const AppContextDispatch = createContext<AppContextDispatchType>({
  setSlides: () => console.warn("No AppProvider"),
});

type AppProviderProps = {
  children: React.ReactNode;
};

export function AppProvider({ children }: AppProviderProps) {
  const [slides, setSlides] = useState<SlideType[]>([]);
  return (
    <AppContextDispatch.Provider value={{ setSlides }}>
      <AppContext.Provider value={{ slides }}>{children}</AppContext.Provider>
    </AppContextDispatch.Provider>
  );
}

export function useAppContext() {
  return useContext(AppContext);
}

export function useAppContextDispatch() {
  return useContext(AppContextDispatch);
}

export default AppContext;
