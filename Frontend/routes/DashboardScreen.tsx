import React, { useRef, useState } from "react"
import { Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import DashboardHeader from "../components/DashboardHeader"
import Navigation from "../components/Navigation"
import SurveyList from "../components/SurveyList"

interface IDashboard {
    navigation?: any
}

const DashboardScreen = (props: IDashboard) => {
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const isDragging = useRef(false)
    const touchStartTime = useRef(0)
    const [modalVisible, setModalVisible] = useState(false)

    const handleScroll = (event: any) => {
        if (scrollEnabled) {
            setScrollEnabled(true)
        }
    }

    return (
        <>
            <SModalOverlay modalActive={modalVisible} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll scrollEnabled={scrollEnabled} onScroll={handleScroll} onMomentumScrollBegin={handleScroll} onMomentumScrollEnd={handleScroll} onStartShouldSetResponder={() => scrollEnabled} bounces={false}>
                    <SHeader>
                        <DashboardHeader />
                    </SHeader>
                    <SContainer>
                        <SContent>
                            <SurveyList navigation={props.navigation} setModalActive={setModalVisible} modalActive={modalVisible} isDragging={isDragging} setScrollEnabled={setScrollEnabled} />
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={props.navigation} />
        </>
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

const SModalOverlay = styled(View)<{ modalActive: boolean }>`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    ${(props) =>
        props.modalActive &&
        `
        background-color: rgba(0,0,0,0.5);
        z-index: 999;
    `}
`
