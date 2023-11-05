import React from "react"
import { Pressable, StyleSheet, Text } from "react-native"

interface IButton {
    title: string
    onPress?: () => void
    full?: boolean
}

const Button = (props: IButton) => {
    return (
        <Pressable onPress={props.onPress} style={props.full === false ? styles.ButtonBorder : styles.ButtonFull}>
            <Text style={props.full === false ? styles.TextBorder : styles.TextFull}>{props.title}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    ButtonFull: {
        width: "100%",
        alignItems: "center",
        backgroundColor: "#fff",
        textAlign: "center",
        marginBottom: 14,
        borderRadius: 100,
        position: "relative",
    },
    TextFull: {
        fontWeight: "600",
        fontSize: 20,
        color: "#000",
        textAlign: "center",
        paddingBottom: 20,
        paddingTop: 20,
        fontFamily: "Nunito-SemiBold",
    },
    ButtonBorder: {
        width: "100%",
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "transparent",
        textAlign: "center",
        borderColor: "#fff",
        color: "#fff",
        borderWidth: 2,
        borderStyle: "solid",
        justifyContent: "center",
        marginBottom: 14,
        borderRadius: 100,
    },
    TextBorder: {
        fontWeight: "600",
        fontSize: 20,
        color: "#fff",
        textAlign: "center",
        paddingBottom: 20,
        paddingTop: 20,
        fontFamily: "Nunito-SemiBold",
    },
})

export default Button
