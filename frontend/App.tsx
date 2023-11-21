import { NavigationContainer } from "@react-navigation/native"
import React from "react"
import "react-native-gesture-handler"
import { ThemeProvider } from "styled-components/native"

// Screens
import { Nunito_300Light, Nunito_400Regular, Nunito_500Medium, Nunito_600SemiBold, Nunito_700Bold, Nunito_800ExtraBold, useFonts } from "@expo-google-fonts/nunito"
import Routing from "./Routing"
import { AuthProvider } from "./hooks/use-auth"
import { theme } from "./utils/Theme"

export default function App({ navigation }: any) {
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
                    <Routing />
                </AuthProvider>
            </NavigationContainer>
        </ThemeProvider>
    )
}
