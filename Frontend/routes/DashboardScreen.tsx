import React from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import DashboardHeader from "../components/DashboardHeader"
import SurveyList from "../components/SurveyList"

interface IDashboard {}

const DashboardScreen = (props: IDashboard) => {
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <SScroll bounces={false}>
                <SHeader>
                    <DashboardHeader />
                </SHeader>
                <SContainer>
                    <SContent>
                        <SurveyList />
                    </SContent>
                </SContainer>
            </SScroll>
        </TouchableWithoutFeedback>
    )
}

export default DashboardScreen

const SContainer = styled(View)`
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${(props) => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${(props) => props.theme["WHITE"]};
`

const SContent = styled(View)`
    flex: 1;
    justify-content: center;
    margin-top: 32px;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`
