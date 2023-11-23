import { ParamListBase, RouteProp } from "@react-navigation/native"
import React, { useRef, useState } from "react"
import { Animated, Keyboard, ScrollView, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import { IForm } from "../../api/interfaces/form.interfaces"
import DashboardHeader from "../components/DashboardHeader"
import Navigation from "../components/Navigation"
import SurveyList from "../components/SurveyList"
import useAPI from "../hooks/use-api"

interface IDashboard {
    navigation?: any
    route?: RouteProp<ParamListBase>
}

const DashboardScreen = ({ navigation, route }: IDashboard) => {
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const isDragging = useRef(false)
    const slideAnim = useRef(new Animated.Value(0)).current
    const cardPressed = useRef(false)
    const [search, setSearch] = useState<string>("")

    const [modalVisible, setModalVisible] = useState(false)

    const newSurveyid = (route?.params as any)?.["result"]?.id

    const { data } = useAPI<IForm[]>({ url: "/form", params: { search, new: newSurveyid } }, { array: true })

    const handleScroll = (event: any) => {
        if (scrollEnabled) {
            setScrollEnabled(true)
        }
    }

    const handleBackgroundPress = () => {
        cardPressed.current = false
        Animated.spring(slideAnim, {
            toValue: 0,
            friction: 5,
            useNativeDriver: false,
        }).start(() => {
            setScrollEnabled(true) // Enable vertical scrolling after animation
        })
    }

    return (
        <>
            <SModalOverlay modalActive={modalVisible} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll scrollEnabled={scrollEnabled} onScroll={handleScroll} onMomentumScrollBegin={handleScroll} onMomentumScrollEnd={handleScroll} onStartShouldSetResponder={() => scrollEnabled} bounces={false}>
                    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                        <View>
                            <SHeader>
                                <DashboardHeader onSearchChange={(s) => setSearch(s)} />
                            </SHeader>
                            <SContainer>
                                <SContent>
                                    <SurveyList slideAnim={slideAnim} cardPressed={cardPressed} forms={data} navigation={navigation} setModalActive={setModalVisible} modalActive={modalVisible} isDragging={isDragging} setScrollEnabled={setScrollEnabled} />
                                </SContent>
                            </SContainer>
                        </View>
                    </TouchableWithoutFeedback>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={navigation} profileActive={false} dashboardActive={true} />
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
