import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import RootTabNavigator from "./RootTabNavigator";
import CustomDrawerContent from "../components/CustomDrawerContent";
import { useNavigation, CommonActions } from "@react-navigation/native";
import SearchScreen from "../screens/SearchScreen";
import FavorisScreen from "../screens/FavorisScreen";
import CartScreen from "../screens/CartScreen";
import { useAuth } from "../contexts/AuthContext";
import AuthStackNavigator from "./AuthStackNavigator"; // Importez par défaut

const Drawer = createDrawerNavigator();

const CustomHeader = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
        <Ionicons name="menu" size={30} color="#fff" style={styles.menuIcon} />
      </TouchableOpacity>
      <Image
        source={require("../assets/logo.png")}
        style={styles.logo}
      />
      <Text style={styles.appName}>The Cocktail Bar</Text>
      <Text style={styles.subheaderTitle}>WMD React Native</Text>
    </SafeAreaView>
  );
};

const MenuButton = () => {
  const navigation = useNavigation();

  return (
    <Ionicons
      name="menu"
      size={30}
      color="black"
      style={{ marginLeft: 15 }}
      onPress={() => navigation.openDrawer()}
    />
  );
};

const DrawerNavigator = () => {
  const navigationRef = React.useRef(null);
  const { isAuthenticated } = useAuth();

  const navigateToTab = (tabName) => {
    if (navigationRef.current) {
      navigationRef.current.dispatch(
        CommonActions.navigate({
          name: "TabNavigator",
          params: {
            screen: tabName,
          },
        })
      );
    }
  };

  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerLeft: () => <MenuButton />,
        header: ({ navigation }) => <CustomHeader navigation={navigation} />,
        drawerActiveTintColor: "#A5BB80",
        drawerInactiveTintColor: "gray",
      }}
      screenListeners={({ navigation }) => ({
        state: (e) => {
          const currentRouteName = e.data.state?.routes[e.data.state?.index]?.name;

          const tabMapping = {
            TabNavigator: "Home",
            SearchScreen: "Search",
            FavorisScreen: "Favoris",
            CartScreen: "Cart",
          };

          if (currentRouteName && currentRouteName !== "TabNavigator") {
            navigateToTab(tabMapping[currentRouteName]);
          }
        },
      })}
    >
      <Drawer.Screen
        name="TabNavigator"
        component={RootTabNavigator}
        options={{
          title: "Accueil",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="home" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={{
          title: "Rechercher",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="search" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="FavorisScreen"
        component={FavorisScreen}
        options={{
          title: "Favoris",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="heart" size={size} color={color} />
          ),
        }}
      />
      <Drawer.Screen
        name="CartScreen"
        component={CartScreen}
        options={{
          title: "Panier",
          drawerIcon: ({ color, size }) => (
            <Ionicons name="cart" size={size} color={color} />
          ),
        }}
      />
      {!isAuthenticated && (
        <Drawer.Screen
          name="Profile"
          component={AuthStackNavigator} // Utilisez AuthStackNavigator ici
          options={{
            title: "Profil",
            drawerIcon: ({ color, size }) => (
              <Ionicons name="person" size={size} color={color} />
            ),
          }}
        />
      )}
    </Drawer.Navigator>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    backgroundColor: "#A5BB80",
  },
  menuIcon: {
    marginRight: 10,
  },
  logo: {
    width: 40,
    height: 40,
    marginRight: 10,
  },
  appName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ED7868",
  },
  subheaderTitle: {
    fontSize: 12,
    fontWeight: "bold",
    color: "gray",
    marginLeft: 10,
  },
});

export default DrawerNavigator;