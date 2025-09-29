import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SplashScreen from "./SplashScreen";
import LoginScreen from "./auth/LoginScreen";
import RegisterScreen from "./auth/RegisterScreen";
import HomeScreen from "./main/HomeScreen";
import TestScreen from "./main/TestScreen";

export type AppNavigatorParamList = {
  Splash: undefined;
  Login: undefined;
  Register: undefined;
  Home: undefined;
  test: undefined;
};

const Stack = createNativeStackNavigator<AppNavigatorParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator

        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="test" component={TestScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

