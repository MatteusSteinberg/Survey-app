import { Octicons } from "@expo/vector-icons"
import React, { useRef } from "react"
import { Animated, Easing, Modal, PanResponder, Pressable, Text, View } from "react-native"
import styled from "styled-components/native"
import Pattern from "../assets/Pattern"
import { Button } from "./elements"
import BackButton from "./elements/BackButton"

interface ISurveyCard {
    title: string
    replies?: number
    setScrollEnabled: React.Dispatch<React.SetStateAction<boolean>>
    isDragging: React.MutableRefObject<boolean>
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>
    modalActive: boolean
    navigation?: any
}

const SurveyCard = (props: ISurveyCard) => {
    const slideAnim = useRef(new Animated.Value(0)).current
    const touchStartX = useRef(0)

    const toggleModal = () => {
        props.setModalActive(!props.modalActive)
    }

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderGrant: (_, gesture) => {
                touchStartX.current = gesture.x0
            },
            onPanResponderMove: (_, gesture) => {
                const dx = gesture.moveX - touchStartX.current
                if (dx <= 0) {
                    slideAnim.setValue(dx)
                    props.setScrollEnabled(false) // Disable vertical scrolling
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -100) {
                    Animated.timing(slideAnim, {
                        toValue: -310,
                        duration: 500,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: false,
                    }).start(() => {
                        props.setScrollEnabled(true) // Enable vertical scrolling after animation
                    })
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        friction: 5,
                        useNativeDriver: false,
                    }).start(() => {
                        props.setScrollEnabled(true) // Enable vertical scrolling after animation
                    })
                }
            },
        })
    ).current
    return (
        <>
            <SSliderView
                style={{
                    transform: [{ translateX: slideAnim }],
                }}
                {...panResponder.panHandlers}
            >
                <SSurveyCard>
                    <STitle>{props.title}</STitle>
                    <SReplies>{props.replies} Replies</SReplies>
                    <Pressable onPress={() => props.navigation.navigate("AnswersScreen")}>
                        <SSurveyText>See replies</SSurveyText>
                    </Pressable>
                    <SPattern color="#274CEE" PatternWidth={240} PatternHeight={290} />
                </SSurveyCard>
                <SEditOption>
                    <Octicons name="pencil" size={28} color="white" />
                </SEditOption>
                <STrashOption onPress={toggleModal}>
                    <Octicons name="trash" size={28} color="white" />
                </STrashOption>
            </SSliderView>
            <Modal
                animationType="slide" // Change animation as per requirement
                transparent={true}
                visible={props.modalActive}
                onRequestClose={() => {
                    props.setModalActive(false)
                }}
            >
                <SModalInner>
                    <SModalContent>
                        <BackButton color="text" onPress={toggleModal} title="Delete this survey?" icon="x" />
                        <SModalWrapper>
                            <SModalText>Are you sure you want to proceed? This action is not reversible.</SModalText>
                            <Button title="Delete this survey" variant="error" onPress={() => {}} />
                        </SModalWrapper>
                    </SModalContent>
                </SModalInner>
            </Modal>
        </>
    )
}

export default SurveyCard

const SSliderView = styled(Animated.View)`
    width: 100%;
    position: relative;
    flex-direction: row;
`

const SSurveyCard = styled(View)`
    background-color: ${props => props.theme["PRIMARY_COLOR_LIGHT"]};
    width: 100%;
    border-radius: 26px;
    position: relative;
    padding: 30px 20px;
    overflow: hidden;
    margin-right: 16px;
`

const STitle = styled(Text)`
    font-size: 24px;
    font-family: "Nunito_800ExtraBold";
`

const SReplies = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_700Bold";
    color: ${props => props.theme["PRIMARY_COLOR_DARK"]};
    opacity: 0.7;
`

const SPattern = styled(Pattern)`
    position: absolute;
    top: -50%;
    right: -50%;
    transform-origin: center center;
    z-index: -1;
    transform: scale(1);
    opacity: 0.3;
`

const SEditOption = styled(Pressable)`
    background-color: ${props => props.theme["PRIMARY_COLOR"]};
    height: 145px;
    width: 145px;
    justify-content: center;
    align-items: center;
    border-radius: 26px;
    margin-right: 6px;
`

const STrashOption = styled(Pressable)`
    background-color: ${props => props.theme["ERROR"]};
    height: 145px;
    width: 145px;
    justify-content: center;
    align-items: center;
    border-radius: 26px;
    margin-right: 16px;
`

const SModalInner = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
`

const SModalContent = styled(View)`
    background-color: white;
    border-radius: 26px;
    padding: 20px;
    margin: 0 5px;
`

const SModalWrapper = styled(View)`
    margin-top: 36px;
`

const SModalText = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_700Bold";
    margin-bottom: 20px;
`

const SSurveyText = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_700Bold";
    color: ${props => props.theme["PRIMARY_COLOR_DARK"]};
    opacity: 0.7;
    margin-top: 8px;
`
