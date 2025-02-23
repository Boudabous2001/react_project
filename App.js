import React from "react";
import { Provider } from "react-redux";
import { store } from "./store/store";
import { AuthProvider } from "./contexts/AuthContext";
import { NavigationContainer } from "@react-navigation/native";
import DrawerNavigator from "./navigation/DrawerNavigator";

const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        <NavigationContainer>
          <DrawerNavigator />
        </NavigationContainer>
      </AuthProvider>
    </Provider>
  );
};

export default App;