import { Octicons } from "@expo/vector-icons"
import { produce } from "immer"
import _set from "lodash/set"
import React, { useRef, useState } from "react"
import { Animated, Easing, Keyboard, Modal, Pressable, ScrollView, Text, TextInput, TouchableWithoutFeedback, View } from "react-native"
import styled from "styled-components/native"
import { FormFieldType, IForm, IFormField } from "../../api/interfaces/form.interfaces"
import FormModal from "../components/FormModal"
import Navigation from "../components/Navigation"
import { Button } from "../components/elements"
import BackButton from "../components/elements/BackButton"
import FormController from "../components/fields/FormController"
import useAPI from "../hooks/use-api"

interface ICreateSurvey {
    navigation?: any
    form?: IForm
    id?: string
}

const CreateSurvey = ({ form, id, navigation }: ICreateSurvey) => {
    const [formFields, setFormFields] = useState<IFormField[]>(form?.fields || [])
    const [surveyName, setSurveyName] = useState<string>(form?.name || "")
    const [showModal, setShowModal] = useState(false)
    const [scrollEnabled, setScrollEnabled] = useState(true)
    const slideAnim = useRef(new Animated.Value(0)).current
    const cardPressed = useRef(false)

    const { create, update } = useAPI<IForm>({ url: "/form", id }, { autoGet: false })

    const handleLongPress = () => {
        cardPressed.current = true
        Animated.timing(slideAnim, {
            toValue: -125,
            duration: 500,
            easing: Easing.out(Easing.quad),
            useNativeDriver: false,
        }).start(() => {
            setScrollEnabled(true) // Enable vertical scrolling after animation
        })
    }

    const handlePressOut = () => {
        if (!cardPressed.current) {
            Animated.spring(slideAnim, {
                toValue: 0,
                friction: 5,
                useNativeDriver: false,
            }).start(() => {
                setScrollEnabled(true) // Enable vertical scrolling after animation
            })
        }
    }

    const addFormField = (fieldType: FormFieldType) => {
        setFormFields([...formFields, { type: fieldType, order: formFields.length + 1 }])
    }

    const handleUpdateFormField = (path: string, value: any, order: number) => {
        setFormFields(
            produce((formFieldDraft) => {
                const index = formFieldDraft.findIndex((x) => x.order === order)

                formFieldDraft[index] = _set(formFieldDraft[index], path, value)
            })
        )
    }

    const handleUpdateFormOptionField = (path: string, value: any, order: number, optionOrder: number) => {
        setFormFields(
            produce((formFieldDraft) => {
                const index = formFieldDraft.findIndex((x) => x.order === order)
                formFieldDraft[index]
                const optionIndex = formFieldDraft[index].options?.findIndex((x) => x.order === optionOrder) || 0
                if (!formFieldDraft[index].options?.[optionIndex]) return

                formFieldDraft[index].options!![optionIndex] = _set(formFieldDraft[index].options!![optionIndex], path, value)
            })
        )
    }

    const removeFormField = (index: number) => {
        const updatedFields = formFields.filter((_, i) => i !== index)
        setFormFields(updatedFields)
    }

    const handleCreateSurvey = async () => {
        const apiMethod = id ? update : create
        const result = await apiMethod({
            body: {
                name: surveyName,
                fields: formFields,
            } as IForm,
        })

        if (!result.error) {
            navigation.navigate("DashboardScreen", { result: result?.data })
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
            <SModalOverlay modalActive={showModal} />
            <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <SScroll bounces={false}>
                    <SHeader>
                        <SCreateHeader>
                            <BackButton color="white" title="Create new survey" icon="chevron-left" onPress={() => navigation.navigate("DashboardScreen")} />
                            <SCreateHeaderSearch>
                                <SInput placeholderTextColor="#ffffff40" onChangeText={(t) => setSurveyName(t)} value={surveyName} placeholder="Name your survey..." />
                            </SCreateHeaderSearch>
                            <SCreateHeaderTip>Hold the field to delete it</SCreateHeaderTip>
                        </SCreateHeader>
                    </SHeader>
                    <TouchableWithoutFeedback onPress={handleBackgroundPress}>
                        <SContainer>
                            <SContent>
                                {formFields.map((formField, index) => {
                                    return (
                                        <SFieldSlide
                                            key={index}
                                            style={{
                                                transform: [{ translateX: slideAnim }],
                                            }}>
                                            <SField onLongPress={handleLongPress} onPressOut={handlePressOut}>
                                                <FormController isEditing={true} onOptionChange={(path, v, optionOrder) => handleUpdateFormOptionField(path, v, formField.order || 0, optionOrder)} formField={formField} onChange={(path, v) => handleUpdateFormField(path, v, formField.order || 0)} />
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
                                <Button variant="primary" title={id ? "Update survey" : "Create survey"} onPress={handleCreateSurvey} />
                            </SContent>
                        </SContainer>
                    </TouchableWithoutFeedback>
                </SScroll>
            </TouchableWithoutFeedback>
            <Navigation navigation={navigation} dashboardActive={false} profileActive={false} />
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
    padding: 0 16px 160px 16px;
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
    align-items: center;
    justify-content: flex-end;
    border-bottom-left-radius: 65px;
    border-bottom-right-radius: 65px;
    padding: 26px 16px;
`

const SCreateHeaderTip = styled(Text)`
    font-size: 16px;
    font-family: "Nunito_400Regular";
    color: ${(props) => props.theme["PRIMARY_COLOR_LIGHT"]};
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

const SField = styled(Pressable)`
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
