import React from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import Navigation from "../components/Navigation"
import { Button } from "../components/elements"
import BackButton from "../components/elements/BackButton"
import Input from "../components/elements/Input"

interface IProfileScreen {
    navigation?: any
}

const ProfileScreen = (props: IProfileScreen) => {
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll bounces={false}>
                    <SHeader>
                        <SProfileHeader>
                            <BackButton color="white" title="Profile information" icon="chevron-left" onPress={() => props.navigation.navigate("DashboardScreen")} />
                        </SProfileHeader>
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <SForm>
                                <SFormItem>
                                    <SFormItemLabel>Full name</SFormItemLabel>
                                    <Input placeholder="Full name" variant="dark" />
                                </SFormItem>
                                <SFormItem>
                                    <SFormItemLabel>E-mail</SFormItemLabel>
                                    <Input placeholder="E-mail" variant="dark" />
                                </SFormItem>
                                <SFormItem>
                                    <SFormItemLabel>Password</SFormItemLabel>
                                    <Input placeholder="Password" variant="dark" />
                                </SFormItem>
                                <SFormItem>
                                    <SFormItemLabel>Confirm Password</SFormItemLabel>
                                    <Input placeholder="Confirm password" variant="dark" />
                                </SFormItem>
                                <Button variant="primary" title="Update information" />
                            </SForm>
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={props.navigation} />
        </>
    )
}

export default ProfileScreen

const SContainer = styled(View)`
    padding: 0 16px 120px 16px;
    height: 100%;
    background-color: ${(props) => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${(props) => props.theme["WHITE"]};
`

const SProfileHeader = styled(View)`
    position: relative;
    width: 100%;
    height: 160px;
    background-color: ${(props) => props.theme["PRIMARY_COLOR"]};
    align-items: flex-start;
    justify-content: flex-end;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 42px 16px;
`

const SContent = styled(View)`
    flex: 1;
    justify-content: center;
    margin-top: 32px;
    height: 100%;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`

const SForm = styled.View`
    margin-top: 40px;
    width: 100%;
    height: 100%;
`

const SFormItemLabel = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    margin-bottom: 16px;
`

const SFormItem = styled.View`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`
