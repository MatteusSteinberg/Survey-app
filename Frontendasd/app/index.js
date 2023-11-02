import React, { useState } from "react"
import { Link } from "expo-router"
import "expo-router/entry"
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Keyboard, TouchableWithoutFeedback } from "react-native"

const App = () => {
    const onPressLogin = () => {
        // Do something about login operation
    }
    const onPressForgotPassword = () => {
        // Do something about forgot password operation
    }
    const [state, setState] = useState({
        email: "",
        password: "",
    })
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View style={styles.container}>
                <Text style={styles.title}> Login Screen</Text>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} placeholder="Email" placeholderTextColor="#003f5c" onChangeText={(text) => setState({ email: text })} />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.inputText} secureTextEntry placeholder="Password" placeholderTextColor="#003f5c" onChangeText={(text) => setState({ password: text })} />
                </View>
                <TouchableOpacity onPress={onPressForgotPassword}>
                    <Text style={styles.forgotAndSignUpText}>Forgot Password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={onPressLogin} style={styles.loginBtn}>
                    <Text style={styles.loginText}>LOGIN </Text>
                </TouchableOpacity>
                <Link href="/pages/signup">
                    <Text style={styles.forgotAndSignUpText}>Signup</Text>
                </Link>
            </View>
        </TouchableWithoutFeedback>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#9b74c2",
        alignItems: "center",
        justifyContent: "center",
    },
    title: {
        fontWeight: "bold",
        fontSize: 50,
        color: "#000000",
        marginBottom: 40,
    },
    inputView: {
        width: "80%",
        backgroundColor: "#b89fd1",
        borderRadius: 25,
        height: 50,
        marginBottom: 20,
        justifyContent: "center",
        padding: 20,
    },
    inputText: {
        height: 50,
        color: "#000000",
    },
    forgotAndSignUpText: {
        color: "#000000",
        fontSize: 11,
    },
    loginBtn: {
        width: "80%",
        backgroundColor: "#b89fd1",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        marginBottom: 10,
    },
})
export default App
