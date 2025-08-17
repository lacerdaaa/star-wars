import AsyncStorage from '@react-native-async-storage/async-storage';

export interface User {
  id: string;
  username: string;
  email: string;
  createdAt: string;
}

export class AuthService {
  private static readonly USERS_KEY = 'users';
  private static readonly CURRENT_USER_KEY = 'currentUser';

  static async register(username: string, email: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {

      const users = await this.getUsers();
      const existingUser = users.find(u => u.email === email || u.username === username);
      
      if (existingUser) {
        return { success: false, message: 'Usuário ou email já existe' };
      }

      const newUser: User = {
        id: Date.now().toString(),
        username,
        email,
        createdAt: new Date().toISOString()
      };

      users.push(newUser);
      await AsyncStorage.setItem(this.USERS_KEY, JSON.stringify(users));
      
      await AsyncStorage.setItem(`password_${newUser.id}`, password);

      return { success: true, message: 'Usuário criado com sucesso!', user: newUser };
    } catch (error) {
      return { success: false, message: 'Erro ao criar usuário' };
    }
  }

  static async login(emailOrUsername: string, password: string): Promise<{ success: boolean; message: string; user?: User }> {
    try {
      const users = await this.getUsers();
      const user = users.find(u => u.email === emailOrUsername || u.username === emailOrUsername);
      
      if (!user) {
        return { success: false, message: 'Usuário não encontrado' };
      }

      const storedPassword = await AsyncStorage.getItem(`password_${user.id}`);
      if (storedPassword !== password) {
        return { success: false, message: 'Senha incorreta' };
      }

      await AsyncStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
      
      return { success: true, message: 'Login realizado com sucesso!', user };
    } catch (error) {
      return { success: false, message: 'Erro ao fazer login' };
    }
  }

  static async logout(): Promise<void> {
    try {
      await AsyncStorage.removeItem(this.CURRENT_USER_KEY);
    } catch (error) {
      console.error('Erro ao fazer logout:', error);
    }
  }

  static async getCurrentUser(): Promise<User | null> {
    try {
      const userJson = await AsyncStorage.getItem(this.CURRENT_USER_KEY);
      return userJson ? JSON.parse(userJson) : null;
    } catch (error) {
      return null;
    }
  }

  private static async getUsers(): Promise<User[]> {
    try {
      const usersJson = await AsyncStorage.getItem(this.USERS_KEY);
      return usersJson ? JSON.parse(usersJson) : [];
    } catch (error) {
      return [];
    }
  }
}