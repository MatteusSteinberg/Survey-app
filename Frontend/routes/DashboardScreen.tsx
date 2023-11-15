import React, { useRef, useState } from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import DashboardHeader from "../components/DashboardHeader"
import Navigation from "../components/Navigation"
import SurveyList from "../components/SurveyList"

interface IDashboard {}

const DashboardScreen = (props: IDashboard) => {
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const isDragging = useRef(false)
    const touchStartTime = useRef(0)

    const handleScroll = (event: any) => {
        if (scrollEnabled) {
            setScrollEnabled(true)
        }
    }

    return (
        <>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll scrollEnabled={scrollEnabled} onScroll={handleScroll} onMomentumScrollBegin={handleScroll} onMomentumScrollEnd={handleScroll} onStartShouldSetResponder={() => scrollEnabled} bounces={false}>
                    <SHeader>
                        <DashboardHeader />
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <SurveyList isDragging={isDragging} setScrollEnabled={setScrollEnabled} />
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation />
        </>
    )
}

export default DashboardScreen

const SContainer = styled(View)`
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
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
