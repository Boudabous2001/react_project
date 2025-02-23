import React, { createContext, useState, useContext } from "react";
import axios from "axios";
import * as SecureStore from "expo-secure-store";
import md5 from "md5";


const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password) => {
    try {
      const response = await axios.post("https://api.escuelajs.co/api/v1/auth/login", {
        email,
        password,
      });
  
      const { access_token } = response.data;
      await SecureStore.setItemAsync("access_token", access_token);
  
      const userProfile = await fetchUserProfile(access_token);
      setUser(userProfile);
  
      return true;
    } catch (error) {
      console.error("Erreur de connexion:", error);
      throw new Error("Email ou mot de passe incorrect");
    }
  };

  const register = async (name, email, password) => {
    try {
      if (password.length < 4) {
        throw new Error("Le mot de passe doit contenir au moins 4 caractères");
      }
  
      const passwordRegex = /^[a-zA-Z0-9]+$/;
      if (!passwordRegex.test(password)) {
        throw new Error("Le mot de passe ne doit contenir que des lettres et des chiffres");
      }
  
      const response = await axios.post("https://api.escuelajs.co/api/v1/users/", {
        name,
        email,
        password,
        avatar: "https://example.com/avatar.png", 
      });
  
      if (response.data) {
        console.log("Inscription réussie:", response.data);
        return response.data;
      }
    } catch (error) {
      console.error("Erreur d'inscription:", error.response?.data || error);
      if (error.response?.status === 400) {
        console.error("Détails de l'erreur:", error.response.data);
        throw new Error("Email déjà utilisé ou données invalides");
      }
      if (error.response?.status === 500) {
        throw new Error("Erreur serveur, veuillez réessayer");
      }
      throw error;
    }
  };

  const logout = async () => {
    try {
      await SecureStore.deleteItemAsync("access_token");
      setUser(null);
      // Retournez un succès pour indiquer que la déconnexion a réussi
      return true;
    } catch (error) {
      console.error("Erreur de déconnexion:", error);
      throw error;
    }
  };

  const value = {
    user,
    loading,
    login,
    logout,
    register,
    isAuthenticated: !!user, // Assurez-vous que isAuthenticated est correctement défini
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};