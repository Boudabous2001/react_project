import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext'; // Importez useAuth
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Image,
  Pressable,
  Keyboard,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function RegisterScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  // Utilisez useAuth ici, à l'intérieur du composant fonctionnel
  const { register } = useAuth();

  const handleRegister = async () => {
    try {
      if (!name || !email || !password) {
        setError("Veuillez remplir tous les champs");
        return;
      }
  
      if (password.length < 4) {
        setError("Le mot de passe doit contenir au moins 4 caractères");
        return;
      }
  
      if (!email.includes("@")) {
        setError("Veuillez entrer un email valide");
        return;
      }
  
      const passwordRegex = /^[a-zA-Z0-9]+$/;
      if (!passwordRegex.test(password)) {
        setError("Le mot de passe ne doit contenir que des lettres et des chiffres");
        return;
      }
  
      await register(name, email, password);
      alert("Inscription réussie ! Vous pouvez maintenant vous connecter.");
      navigation.navigate("Login");
    } catch (error) {
      console.error("Erreur lors de l'inscription:", error);
      setError(error.message || "Erreur lors de l'inscription. Veuillez réessayer.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <Pressable
        style={styles.inner}
        onPress={() => Keyboard.dismiss()}
      >
        <Image
          source={require('../../assets/logo.png')}
          style={styles.logo}
        />
        <Text style={styles.title}>Créer un compte</Text>

        <TextInput
          placeholder="Nom complet"
          value={name}
          onChangeText={setName}
          style={styles.input}
          placeholderTextColor="#666"
        />

        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
          placeholderTextColor="#666"
          autoCapitalize="none"
          keyboardType="email-address"
        />

        <TextInput
          placeholder="Mot de passe"
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholderTextColor="#666"
          secureTextEntry
        />

        {error ? <Text style={styles.errorText}>{error}</Text> : null}

        <TouchableOpacity
          style={styles.registerButton}
          onPress={handleRegister}
        >
          <Text style={styles.registerButtonText}>S'inscrire</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.loginButtonText}>Retour à la connexion</Text>
        </TouchableOpacity>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  inner: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    color: '#ED7868'
  },
  input: {
    width: '100%',
    height: 50,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    fontSize: 16,
    color: '#333',
    borderWidth: 1,
    borderColor: '#A5BB80'
  },
  registerButton: {
    width: '100%',
    height: 50,
    backgroundColor: '#A5BB80',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20
  },
  registerButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold'
  },
  loginButton: {
    marginTop: 15,
    padding: 10
  },
  loginButtonText: {
    color: '#A5BB80',
    fontSize: 16
  },
  errorText: {
    color: '#ED7868',
    marginBottom: 10,
    textAlign: 'center'
  }
});