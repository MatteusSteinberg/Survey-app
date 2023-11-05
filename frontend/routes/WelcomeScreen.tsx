import React from "react"
import { StyleSheet, Text, View } from "react-native"

// Components
import { Button } from "../components/index"

export default function WelcomeScreen({ navigation }: any) {
    return (
        <View style={styles.WelcomeOuter}>
            <View style={styles.WelcomeLogo}>
                <Text>Diller</Text>
            </View>
            <View style={styles.WelcomeButtonContainer}>
                <Button onPress={() => navigation.navigate("SignupScreen")} full={true} title={"Register"} />
                <Button full={false} title={"Login"} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    WelcomeOuter: {
        backgroundColor: "#000",
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
    },
    WelcomeLogo: {
        flex: 1,
        justifyContent: "flex-end",
        alignItems: "center",
    },
    WelcomeButtonContainer: {
        width: "100%",
        flex: 1,
        justifyContent: "flex-end",
        marginBottom: 46,
    },
})
