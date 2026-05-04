import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  registrations: Registration[];
  isAdmin?: boolean;
}

interface Registration {
  id: string;
  eventId: string;
  category: string;
  registrationDate: string;
  status: 'confirmed' | 'pending' | 'cancelled';
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  loginAdmin: (email: string, password: string) => Promise<void>;
  logout: () => void;
  addRegistration: (registration: Registration) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Carregar usuário do localStorage ao iniciar
  useEffect(() => {
    const storedUser = localStorage.getItem('authUser');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error('Erro ao carregar usuário:', error);
        localStorage.removeItem('authUser');
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validar credenciais (simulado)
      if (!email || !password) {
        throw new Error('Email e senha são obrigatórios');
      }

      // Buscar usuário do localStorage (simulado)
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find((u: any) => u.email === email);

      if (!foundUser || foundUser.password !== password) {
        throw new Error('Email ou senha incorretos');
      }

      const userData: User = {
        id: foundUser.id,
        email: foundUser.email,
        firstName: foundUser.firstName,
        lastName: foundUser.lastName,
        registrations: foundUser.registrations || [],
      };

      setUser(userData);
      localStorage.setItem('authUser', JSON.stringify(userData));
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (email: string, password: string, firstName: string, lastName: string) => {
    setIsLoading(true);
    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Validar entrada
      if (!email || !password || !firstName || !lastName) {
        throw new Error('Todos os campos são obrigatórios');
      }

      if (password.length < 6) {
        throw new Error('Senha deve ter no mínimo 6 caracteres');
      }

      // Validar email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
      if (!emailRegex.test(email)) {
        throw new Error('Email inválido');
      }

      // Verificar se usuário já existe
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      if (users.some((u: any) => u.email === email)) {
        throw new Error('Email já cadastrado');
      }

      // Criar novo usuário
      const newUser: User = {
        id: `user-${Date.now()}`,
        email,
        firstName,
        lastName,
        registrations: [],
      };

      users.push({
        id: newUser.id,
        email,
        password, // Em produção, isso seria hasheado
        firstName,
        lastName,
        registrations: [],
      });

      localStorage.setItem('users', JSON.stringify(users));
      setUser(newUser);
      localStorage.setItem('authUser', JSON.stringify(newUser));
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const loginAdmin = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simular delay de processamento
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Credenciais padrão do admin
      const adminEmail = 'admin@conect.com';
      const adminPassword = 'admin123';

      if (email !== adminEmail || password !== adminPassword) {
        throw new Error('Email ou senha de administrador incorretos');
      }

      const adminUser: User = {
        id: 'admin-001',
        email: adminEmail,
        firstName: 'Administrador',
        lastName: 'CONECT',
        registrations: [],
        isAdmin: true,
      };

      setUser(adminUser);
      localStorage.setItem('authUser', JSON.stringify(adminUser));
    } catch (error) {
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authUser');
  };

  const addRegistration = (registration: Registration) => {
    if (user) {
      const updatedUser = {
        ...user,
        registrations: [...user.registrations, registration],
      };
      setUser(updatedUser);
      localStorage.setItem('authUser', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, isAuthenticated: !!user, isAdmin: user?.isAdmin || false, login, register, loginAdmin, logout, addRegistration }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider');
  }
  return context;
}
