import React, { useState } from "react"
import { StyleSheet, Text, TextInput, View } from "react-native"

// Components
import { Button } from "../components/elements/index"
import useAPI from "../hooks/use-api"
import { useAuth } from "../hooks/use-auth"

export default function SignupScreen() {
    const { request, loading, error } = useAPI({ url: "/user/register" }, { autoGet: false })

    const { authenticate, refresh, user } = useAuth()

    const [registerSuccess, setRegisterSuccess] = useState(false)

    const [form, setForm] = useState({
        email: "",
        username: "",
        password: "",
        repeatPassword: "",
    })

    const handleOnRegister = async () => {
        if (form.password !== form.repeatPassword) {
            return
        }
        const register = await request({ method: "post", body: form })
        const auth = await authenticate(form.email || "", form.password || "")

        if (!register?.error && !auth?.error) {
            setRegisterSuccess(true)
        }
    }

    return (
        <View style={styles.welcomeOuter}>
            <View style={styles.welcomeLogo}>
                <View style={styles.loginContainer}>
                    <View style={styles.loginContainer}>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Email</Text>
                            <TextInput style={styles.textInput} textContentType="emailAddress" onChangeText={v => setForm({ ...form, email: v })} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Username</Text>
                            <TextInput style={styles.textInput} textContentType="username" onChangeText={v => setForm({ ...form, username: v })} />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Password</Text>
                            <TextInput secureTextEntry textContentType="password" style={styles.textInput} onChangeText={v => setForm({ ...form, password: v })} />
                        </View>
                        <View style={styles.inputContainer}>
                            <Text style={styles.inputLabel}>Repeat Password</Text>
                            <TextInput secureTextEntry textContentType="password" style={styles.textInput} onChangeText={v => setForm({ ...form, repeatPassword: v })} />
                        </View>
                    </View>

                    <View style={styles.registerButtonContainer}>
                        <Button variant="primary" full={true} onPress={handleOnRegister} title={"Register"} />
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    welcomeOuter: {
        backgroundColor: "#000",
        flex: 1,
        paddingRight: 15,
        paddingLeft: 15,
    },
    welcomeLogo: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    registerButtonContainer: {
        width: "100%",
        marginTop: 40,
    },
    loginContainer: {
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        width: "100%",
        gap: 8,
    },
    inputContainer: {
        width: "100%",
    },
    inputLabel: {
        color: "white",
        width: "100%",
    },
    textInput: {
        backgroundColor: "#9b9b9b3d",
        width: "100%",
        paddingTop: 8,
        color: "white",
        fontWeight: "700",
        paddingBottom: 8,
        paddingRight: 16,
        paddingLeft: 16,
        borderBottomColor: "#9b9b9b",
        borderWidth: 3,
    },
})
