import React from "react"
import { Keyboard, ScrollView, Text, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import { Button } from "../components/elements"
import { FormImage, FormMultiple, FormText } from "../components/fields"

interface IProfileScreen {
    navigation?: any
}

const SurveyScreen = (props: IProfileScreen) => {
    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll bounces={false}>
                    <SHeader>
                        <SSurveyHeader>
                            <SSurveyTitle>Survey name</SSurveyTitle>
                        </SSurveyHeader>
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <FormText readonly fieldTitle="Emil diller" />
                            <FormMultiple readonly fieldTitle="Emil diller" />
                            <FormImage readonly fieldTitle="Emil diller" />
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <SButton>
                <Button variant="primary" title="Submit survey" onPress={() => props.navigation.navigate("DashboardScreen")} />
            </SButton>
        </>
    )
}

export default SurveyScreen

const SContainer = styled(View)`
    padding: 0 16px 120px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
`

const SSurveyHeader = styled(View)`
    position: relative;
    width: 100%;
    height: 160px;
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    align-items: center;
    justify-content: flex-end;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 42px 16px;
`

const SSurveyTitle = styled(Text)`
    font-size: 28px;
    font-weight: bold;
    color: ${props => props.theme["WHITE"]};
    font-family: "Nunito_700Bold";
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    height: 100%;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`

const SButton = styled(View)`
    position: absolute;
    bottom: 0;
    width: 100%;
    padding: 0 16px 20px 16px;
    background-color: ${props => props.theme["WHITE"]};
`
