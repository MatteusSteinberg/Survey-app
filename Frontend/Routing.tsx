import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

import { useAuth } from "./hooks/use-auth"
import DashboardScreen from "./routes/DashboardScreen"
import LoginScreen from "./routes/LoginScreen"
import SignupScreen from "./routes/SignupScreen"
import WelcomeScreen from "./routes/WelcomeScreen"

const Routing = () => {

  const { user } = useAuth()

  const isLoggedIn = !!user

  return <Stack.Navigator screenOptions={{ headerShown: false }}>
    {!isLoggedIn && <>
      <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
      <Stack.Screen name="SignupScreen" component={SignupScreen} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
    </>}
    {isLoggedIn && <>
      <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
    </>}
  </Stack.Navigator>
}

export default Routing