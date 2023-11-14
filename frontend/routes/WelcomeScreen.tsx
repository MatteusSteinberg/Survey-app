import { Octicons } from "@expo/vector-icons"
import React, { useState } from "react"

// Components
import { Pressable, Text, View } from "react-native"
import styled from "styled-components/native"
import Logo from "../assets/Logo"
import Pattern from "../assets/Pattern"
import { Button } from "../components/elements/index"

const WelcomeScreen = ({ navigation }: any) => {
    const [pincode, setPincode] = useState("")

    return (
        <SContainer>
            <PatternTop PatternWidth={240} PatternHeight={290} />
            <SInner>
                <Logo LogoWidth={114} LogoHeight={114} />
                <SWelcomeText>Welcome</SWelcomeText>
                <SWelcomeSub>Create and share surveys effortlessly!</SWelcomeSub>
            </SInner>
            <SActions>
                <Button variant="dark" icon={<Octicons name="arrow-right" size={24} color="#fff" />} onPress={() => navigation.navigate("SignupScreen")} full={true} title={"Register"} />
                <SLogin onPress={() => navigation.navigate("LoginScreen")}>
                    <SLoginText>Already have an account?</SLoginText>
                </SLogin>
            </SActions>
            <PatternBottom PatternWidth={240} PatternHeight={290} />
        </SContainer>
    )
}

export default WelcomeScreen

const SContainer = styled(View)`
    flex: 1;
    justify-content: flex-end;
    align-items: center;
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
`

const PatternTop = styled(Pattern)`
    position: absolute;
    top: -30px;
    right: -80px;
    transform: rotate(-21deg) scale(1.4);
    opacity: 0.3;
`

const PatternBottom = styled(Pattern)`
    position: absolute;
    bottom: -50px;
    left: -30px;
    transform: rotate(-21deg) scale(1.4);
    z-index: -1;
    opacity: 0.3;
`

const SInner = styled(View)`
    position: absolute;
    top: 200px;
    display: flex;
    flex-direction: column;
    align-items: center;
`

const SWelcomeText = styled(Text)`
    font-size: 28px;
    color: ${props => props.theme["WHITE"]};
    font-family: "Nunito_800ExtraBold";
    margin-top: 24px;
`

const SWelcomeSub = styled(Text)`
    font-size: 20px;
    color: ${props => props.theme["WHITE"]};
    font-family: "Nunito_500Medium";
    max-width: 300px;
    text-align: center;
`

const SActions = styled(View)`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-bottom: 46px;
`

const SLogin = styled(Pressable)`
    text-align: center;
`

const SLoginText = styled(Text)`
    font-size: 16px;
    margin-top: 20px;
    color: ${props => props.theme["WHITE"]};
    opacity: 0.5;
    font-family: "Nunito_500Medium";
`

{
    /* <View style={styles.welcomeLogo}>
                <PinInput codeLength={6} onChange={p => setPincode(p)} currentValue={pincode} />
            </View> */
}
