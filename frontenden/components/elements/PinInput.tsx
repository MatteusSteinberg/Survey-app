import React, { useRef, useState } from "react"
import { NativeSyntheticEvent, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, View } from "react-native"
import styled from "styled-components/native"

interface IPinInput {
    onChange: (value: string) => void
    currentValue?: string
    codeLength: number
}

export default function PinInput({ codeLength, currentValue, onChange }: IPinInput) {
    const [inputValue, setInputValue] = useState<{ [key: number]: string }>((currentValue || "").split("").reduce((obj, current, index) => ({ ...obj, [index]: current }), {}))

    const inputs = useRef<Array<TextInput | null>>([])

    const handleInputChange = (input: NativeSyntheticEvent<TextInputChangeEventData>, index: number) => {
        const value = input.nativeEvent.text
        const jumped = value.length !== 0
        if (jumped) {
            if (!!inputs.current[index + 1]) {
                inputs.current[index + 1]?.focus()
            } else {
                inputs.current[index]?.blur()
            }
        }

        const newInputValue = { ...inputValue, [index]: value }
        if (!!newInputValue[index + 1] && jumped) {
            delete newInputValue[index + 1]
        }

        setInputValue(newInputValue)
        const changeText = Object.values(newInputValue).join("")
        onChange(changeText)
    }

    const handleKeyPress = (input: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
        if (input.nativeEvent.key === "Backspace" && (inputValue[index] || "").length === 0) {
            if (index === 0) {
                inputs.current[index]?.blur()
            } else {
                inputs.current[index - 1]?.focus()
                const newInputValue = { ...inputValue }
                delete newInputValue[index - 1]

                setInputValue(newInputValue)

                const changeText = Object.values(newInputValue).join("")
                onChange(changeText)
            }
        }
    }

    return (
        <SInput>
            {Array.apply(null, Array(codeLength)).map((_, i) => {
                return <SInputField ref={(r) => (inputs.current[i] = r)} maxLength={1} key={i} keyboardType="numeric" value={inputValue[i] || ""} onKeyPress={(e) => handleKeyPress(e, i)} onChange={(e) => handleInputChange(e, i)} />
            })}
        </SInput>
    )
}

const SInput = styled(View)`
    display: flex;
    justify-content: center;
    flex-direction: row;
    gap: 8px;
    margin-bottom: 32px;
`

const SInputField = styled(TextInput)`
    background-color: ${(props) => props.theme["WHITE"]};
    text-align: center;
    height: 75px;
    width: 50px;
    border-radius: 12px;
    border: 1px solid #e4e6e8;
    font-family: "Nunito_700Bold";
    font-size: 26px;
`
