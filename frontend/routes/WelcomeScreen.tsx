import React, { useState } from "react"
import { StyleSheet, View } from "react-native"

// Components
import { Button } from "../components/index"
import PinInput from "../components/PinInput"

export default function WelcomeScreen({ navigation }: any) {
  const [pincode, setPincode] = useState("")

  return (
    <View style={styles.welcomeOuter}>
      <View style={styles.welcomeLogo}>
        <PinInput codeLength={6} onChange={p => setPincode(p)} currentValue={pincode} />
      </View>
      <View style={styles.welcomeButtonContainer}>
        <Button onPress={() => navigation.navigate("SignupScreen")} full={true} title={"Register"} />
        <Button full={false} title={"Login"} />
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
    justifyContent: "flex-end",
    alignItems: "center",
  },
  welcomeButtonContainer: {
    width: "100%",
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 46,
  },
})
