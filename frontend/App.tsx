import { NavigationContainer } from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import React from "react"
import "react-native-gesture-handler"
import { ThemeProvider } from "styled-components/native"

const Stack = createNativeStackNavigator()

// Screens
import { Nunito_300Light, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts } from "@expo-google-fonts/nunito"
import { AuthProvider } from "./hooks/use-auth"
import SignupScreen from "./routes/SignupScreen"
import WelcomeScreen from "./routes/WelcomeScreen"
import { theme } from "./utils/Theme"

export default function App() {
    let [fontsLoaded, fontError] = useFonts({
        Nunito_300Light,
        Nunito_400Regular,
        Nunito_500Medium,
        Nunito_600SemiBold,
        Nunito_700Bold,
        Nunito_800ExtraBold,
    })

    if (!fontsLoaded && !fontError) {
        return null
    }

    return (
        <ThemeProvider theme={theme}>
            <NavigationContainer>
                <AuthProvider>
                    <Stack.Navigator screenOptions={{ headerShown: false }}>
                        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
                        <Stack.Screen name="SignupScreen" component={SignupScreen} />
                    </Stack.Navigator>
                </AuthProvider>
            </NavigationContainer>
        </ThemeProvider>
    )
}
