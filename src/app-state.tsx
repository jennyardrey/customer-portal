import React, { createContext, useState, ReactNode, Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';

export interface User {
  username: string | null | undefined;
  role: string | null | undefined;
  id: number | null | undefined;
  email: string | null | undefined;
  incidents: [];
}

interface Incident {
  id: number;
  user_id: number;
  building_name: string;
  location_description: string;
  attending_staff: string;
  description: string;
  images: [];
  resolved: boolean;
  resolution: string;
  whatthreewords: string;
}

interface AppState {
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
  inputtedUsername: string | undefined;
  setInputtedUsername: Dispatch<SetStateAction<string | undefined>>;
  incidents: Incident[];
  setIncidents: Dispatch<SetStateAction<Incident[]>>
  loading: boolean;
  setLoading: Dispatch<SetStateAction<boolean>>;
  handleLogout: (navigate: NavigateFunction) => Promise<void>;
}

interface AppStateContextValue extends AppState {}

export const AppStateContext = createContext<AppStateContextValue | undefined>(undefined);

interface AppStateProviderProps {
  children: ReactNode;
}

export const AppStateProvider: React.FC<AppStateProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User>({
    username: null,
    role: null,
    id: null,
    email: null,
    incidents: []
  });
  const [inputtedUsername, setInputtedUsername] = useState<string | undefined>();
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState<boolean>(false)


  const handleLogout = async (navigate:NavigateFunction) => {
    try {
        localStorage.clear();
        setUser(prevState => ({
            username: null,
            role: null,
            id: null,
            email: null,
            incidents: []
          }));
          setIncidents([])
        alert('You have successfully logged out :)')
        navigate('/login')

    } catch (error) {
        console.error(error)
        alert('An error occurred')
        return
    }
  }

  const contextValue: AppStateContextValue = {
    user,
    setUser,
    inputtedUsername,
    setInputtedUsername,
    incidents,
    setIncidents,
    loading,
    setLoading, 
    handleLogout
  };

  

  return (
    <AppStateContext.Provider value={contextValue}>
      {children}
    </AppStateContext.Provider>
  );
};
