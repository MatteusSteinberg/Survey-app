import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, Text, View } from "react-native"
import styled from "styled-components/native"
import BackButton from "./elements/BackButton"
import FormText from "./fields/FormText" // Import custom TextInputField component

interface FormModalProps {
    addFormField: (fieldComponent: React.FC<any>) => void
    closeModal: () => void
    navigation?: any
}

const FormModal: React.FC<FormModalProps> = ({ addFormField, closeModal, navigation }) => {
    const handleAddField = (FieldComponent: React.FC<any>) => {
        addFormField(FieldComponent)
        closeModal()
    }

    return (
        <SModalInner>
            <SModalContent>
                <BackButton color="text" onPress={() => closeModal()} title="Add new field?" icon="x" />
                <SModalWrapper>
                    <SField onPress={() => handleAddField(FormText)}>
                        <SFieldIcon>
                            <Octicons name="typography" size={24} color="black" />
                        </SFieldIcon>
                        <SFieldText>Text Field</SFieldText>
                    </SField>
                </SModalWrapper>
            </SModalContent>
        </SModalInner>
    )
}

export default FormModal

const SModalInner = styled(View)`
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 0 16px;
`

const SModalContent = styled(View)`
    background-color: white;
    border-radius: 26px;
    padding: 20px;
    margin: 0 5px;
    width: 100%;
`

const SModalWrapper = styled(View)`
    margin-top: 36px;
`

const SField = styled(Pressable)`
    flex-direction: row;
    align-items: center;
    opacity: 0.4;
    border: 1px solid ${(props) => props.theme["TEXT"]};
    border-radius: 26px;
    padding: 16px;
`

const SFieldIcon = styled(View)`
    border: 1px solid ${(props) => props.theme["TEXT"]};
    border-radius: 16px;
    height: 50px;
    width: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
`

const SFieldText = styled(Text)`
    font-size: 20px;
    margin-left: 8px;
    font-family: "Nunito_500Medium";
    color: ${(props) => props.theme["TEXT"]};
`
