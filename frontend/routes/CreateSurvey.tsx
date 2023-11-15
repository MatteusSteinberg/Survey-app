import { Octicons } from "@expo/vector-icons"
import React, { useRef, useState } from "react"
import { Animated, Easing, Keyboard, Modal, PanResponder, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import FormModal from "../components/FormModal"
import Navigation from "../components/Navigation"
import { Button } from "../components/elements"
import BackButton from "../components/elements/BackButton"

interface ICreateSurvey {
    navigation?: any
}

type FormField = React.FC<ICreateSurvey> // Define a type for form field components

const CreateSurvey: React.FC = (props: ICreateSurvey) => {
    const [formFields, setFormFields] = useState<FormField[]>([])
    const [showModal, setShowModal] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const isDragging = useRef(false)
    const slideAnim = useRef(new Animated.Value(0)).current
    const touchStartX = useRef(0)

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
                    setScrollEnabled(false) // Disable vertical scrolling
                }
            },
            onPanResponderRelease: (_, gesture) => {
                if (gesture.dx < -100) {
                    Animated.timing(slideAnim, {
                        toValue: -125,
                        duration: 500,
                        easing: Easing.out(Easing.quad),
                        useNativeDriver: false,
                    }).start(() => {
                        setScrollEnabled(true) // Enable vertical scrolling after animation
                    })
                } else {
                    Animated.spring(slideAnim, {
                        toValue: 0,
                        friction: 5,
                        useNativeDriver: false,
                    }).start(() => {
                        setScrollEnabled(true) // Enable vertical scrolling after animation
                    })
                }
            },
        })
    ).current

    const addFormField = (fieldComponent: FormField) => {
        setFormFields([...formFields, fieldComponent])
    }

    const removeFormField = (index: number) => {
        const updatedFields = formFields.filter((_, i) => i !== index)
        setFormFields(updatedFields)
    }

    return (
        <>
            <SModalOverlay modalActive={showModal} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll bounces={false}>
                    <SHeader>
                        <SCreateHeader>
                            <BackButton color="white" title="Create new survey" icon="chevron-left" onPress={() => props.navigation.navigate("DashboardScreen")} />
                            <SCreateHeaderSearch>
                                <SInput placeholderTextColor="#ffffff40" placeholder="Name your survey..." />
                            </SCreateHeaderSearch>
                        </SCreateHeader>
                    </SHeader>
                    <SContainer>
                        <SContent>
                            {formFields.map((FieldComponent, index) => {
                                const FieldComponentElement = FieldComponent as React.ElementType
                                return (
                                    <SFieldSlide
                                        key={index}
                                        style={{
                                            transform: [{ translateX: slideAnim }],
                                        }}
                                        {...panResponder.panHandlers}>
                                        <SField>
                                            <FieldComponentElement />
                                        </SField>
                                        <SFieldRemove onPress={() => removeFormField(index)}>
                                            <Octicons name="trash" size={28} color="white" />
                                        </SFieldRemove>
                                    </SFieldSlide>
                                )
                            })}
                            <SAddField onPress={() => setShowModal(true)}>
                                <SAddFieldIcon>
                                    <Octicons name="plus" size={24} color="black" />
                                </SAddFieldIcon>
                                <SAddFieldText>Add new field</SAddFieldText>
                            </SAddField>
                            <Button variant="primary" title="Create survey" onPress={() => props.navigation.navigate("DashboardScreen")} />
                        </SContent>
                    </SContainer>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={props.navigation} />
            <Modal
                animationType="slide"
                transparent={true}
                visible={showModal}
                onRequestClose={() => {
                    setShowModal(false)
                }}>
                <FormModal addFormField={addFormField} closeModal={() => setShowModal(false)} />
            </Modal>
        </>
    )
}

export default CreateSurvey

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

const SContainer = styled(View)`
    padding: 0 16px 120px 16px;
    height: 100%;
    background-color: ${(props) => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${(props) => props.theme["WHITE"]};
`

const SCreateHeader = styled(View)`
    position: relative;
    width: 100%;
    height: 244px;
    background-color: ${(props) => props.theme["PRIMARY_COLOR"]};
    align-items: flex-start;
    justify-content: flex-end;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 42px 16px;
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    height: 100%;
    gap: 16px;
`

const SScroll = styled(ScrollView)`
    width: 100%;
    text-align: center;
    height: 100%;
`

const SCreateHeaderSearch = styled(View)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    z-index: 10;
    width: 100%;
    margin-top: 24px;
`
const SInput = styled(TextInput)`
    background-color: rgba(35, 35, 35, 0.3);
    width: 100%;
    font-size: 18px;
    font-family: "Nunito_600SemiBold";
    color: ${(props) => props.theme["WHITE"]};
    border-radius: 24px;
    padding: 12px 18px;
    margin-bottom: 10px;
    &::placeholder {
        font-size: 18px;
        font-family: "Nunito_600SemiBold";
        color: ${(props) => props.theme["WHITE"]} !important;
    }
`

const SField = styled(View)`
    width: 100%;
    position: relative;
`

const SFieldSlide = styled(Animated.View)`
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;
`

const SFieldRemove = styled(Pressable)`
    background-color: ${(props) => props.theme["ERROR"]};
    width: 115px;
    height: 115px;
    justify-content: center;
    align-items: center;
    border-radius: 26px;
    margin-right: 16px;
`

const SAddField = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    opacity: 0.4;
    border: 1px dashed ${(props) => props.theme["TEXT"]};
    border-radius: 26px;
    padding: 26px;
    width: 100%;
`

const SAddFieldIcon = styled(View)`
    border: 1px solid ${(props) => props.theme["TEXT"]};
    border-radius: 16px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SAddFieldText = styled(Text)`
    font-size: 20px;
    margin-left: 8px;
    font-family: "Nunito_500Medium";
    color: ${(props) => props.theme["TEXT"]};
`
