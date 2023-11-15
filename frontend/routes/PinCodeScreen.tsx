import React, { useState } from "react"
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"

// Components
import styled from "styled-components/native"
import AuthHeader from "../components/AuthHeader"
import { Button } from "../components/elements"
import PinInput from "../components/elements/PinInput"

export default function PinCodeScreen({ navigation }: any) {
    const [pincode, setPincode] = useState("")

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View>
                    <SHeader>
                        <AuthHeader />
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <SScroll>
                                <STitle>Pin code</STitle>
                                <SText>Enter the pin code to join survey.</SText>
                                <SInput>
                                    <PinInput codeLength={6} onChange={(p) => setPincode(p)} currentValue={pincode} />
                                    <Button variant="primary" title={"Enter survey"} onPress={() => navigation.navigate("DashboardScreen")} />
                                </SInput>
                                <SFooter>
                                    <SLogin>
                                        Want to sign in instead? <SLoginLink onPress={() => navigation.navigate("LoginScreen")}>Sign in</SLoginLink>
                                    </SLogin>
                                </SFooter>
                            </SScroll>
                        </SContent>
                    </SContainer>
                </View>
            </TouchableWithoutFeedback>
        </>
    )
}

const SContainer = styled(View)`
    position: relative;
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${(props) => props.theme["WHITE"]};
`

const SHeader = styled(View)`
    background-color: ${(props) => props.theme["WHITE"]};
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
`

const SContent = styled(View)`
    flex: 1;
    height: 100%;
    justify-content: flex-start;
    margin-top: 32px;
    align-items: center;
`

const STitle = styled(Text)`
    text-align: center;
    font-size: 42px;
    margin-bottom: 8px;
    color: ${(props) => props.theme["TEXT"]};
    font-family: "Nunito_700Bold";
`

const SText = styled(Text)`
    text-align: center;
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme["TEXT"]};
    font-family: "Nunito_400Regular";
`

const SInput = styled(View)`
    margin-top: 32px;
    width: 100%;
    align-items: center;
`

const SFooter = styled(View)`
    width: 100%;
    align-items: center;
    margin-bottom: 100px;
    justify-content: flex-end;
    margin-top: 10px;
`

const SLogin = styled(Text)`
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme["TEXT"]};
    font-family: "Nunito_400Regular";
`

const SLoginLink = styled(Text)`
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme["PRIMARY_COLOR"]};
    font-family: "Nunito_600SemiBold";
    text-decoration: underline;
`
