import { createContext, useState } from "react";

interface LoadingContextState {
  chatBoxIsLoading: boolean;
  setChatBoxIsLoading: (isLoading: boolean) => void;
}

const defaultLoadingContextValue = {
  chatBoxIsLoading: false,
  setChatBoxIsLoading: () => {}, // eslint-disable-line @typescript-eslint/no-empty-function
};

const LoadingContext = createContext<LoadingContextState>(defaultLoadingContextValue);

interface LoadingProviderProps {
  children: React.ReactNode;
}

const LoadingProvider = ({ children }: LoadingProviderProps) => {
  const [chatBoxIsLoading, setChatBoxIsLoading] = useState<boolean>(false);

  return (
    <LoadingContext.Provider value={{ chatBoxIsLoading, setChatBoxIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export { LoadingContext, LoadingProvider };
