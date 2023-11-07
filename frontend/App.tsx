import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import "react-native-gesture-handler"
const Stack = createNativeStackNavigator()

// Screens
import { useFonts } from "expo-font"
import { AuthProvider } from "./hooks/use-auth"
import SignupScreen from "./routes/SignupScreen"
import WelcomeScreen from "./routes/WelcomeScreen"

export default function App() {
  let [fontsLoaded] = useFonts({
    "Nunito-Black": require("./assets/fonts/NunitoSans-Black.ttf"),
    "Nunito-Bold": require("./assets/fonts/NunitoSans-Bold.ttf"),
    "Nunito-ExtraBold": require("./assets/fonts/NunitoSans-ExtraBold.ttf"),
    "Nunito-ExtraLight": require("./assets/fonts/NunitoSans-ExtraLight.ttf"),
    "Nunito-Light": require("./assets/fonts/NunitoSans-Light.ttf"),
    "Nunito-Regular": require("./assets/fonts/NunitoSans-Regular.ttf"),
    "Nunito-SemiBold": require("./assets/fonts/NunitoSans-SemiBold.ttf"),
  })

  return (
    <NavigationContainer>
      <AuthProvider>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
        </Stack.Navigator>
      </AuthProvider>
    </NavigationContainer>
  )
}
