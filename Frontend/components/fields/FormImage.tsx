import { Octicons } from "@expo/vector-icons"
import React from "react"
import { Pressable, Text, TextInput, View } from "react-native"
import { launchImageLibrary } from "react-native-image-picker"
import styled from "styled-components/native"

interface IFormImage {
    readonly: boolean
    fieldTitle?: string
}

const FormImage = (props: IFormImage) => {
    const handlePicker = async () => {
        const result = await launchImageLibrary({ mediaType: "photo" })
        return result
    }

    return props.readonly ? (
        <SField>
            <SInput editable={false} placeholderTextColor="#232323" placeholder={props.fieldTitle || "Field name"} />
            <SInputHelp>Upload a image from your device</SInputHelp>
            <SUploadField onPress={handlePicker}>
                <Octicons name="upload" size={24} color="#23232320" />
                <SUploadText>Upload</SUploadText>
            </SUploadField>
        </SField>
    ) : (
        <SField>
            <SInput placeholderTextColor="#232323" placeholder="New field..." />
            <SInputHelp>Upload a image from your device</SInputHelp>
            <SUploadField onPress={handlePicker}>
                <Octicons name="upload" size={24} color="#23232320" />
                <SUploadText>Upload</SUploadText>
            </SUploadField>
        </SField>
    )
}

export default FormImage

const SField = styled(View)`
    border: 1px solid rgba(35, 35, 35, 0.2);
    border-radius: 26px;
    padding: 16px;
    margin-bottom: 8px;
`

const SInput = styled(TextInput)`
    border-radius: 8px;
    font-size: 24px;
    width: 100%;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    margin-bottom: 16px;
`

const SInputHelp = styled(Text)`
    margin-bottom: 4px;
    font-size: 14px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
`

const SUploadField = styled(Pressable)`
    flex-direction: column;
    align-items: center;
    gap: 8px;
    border: 1px dashed rgba(35, 35, 35, 0.2);
    border-radius: 12px;
    padding: 16px 0px;
`

const SUploadText = styled(Text)`
    font-size: 20px;
    font-family: "Nunito_600SemiBold";
    color: #23232320;
`
