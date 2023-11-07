import React, { useRef, useState } from "react"
import { NativeSyntheticEvent, StyleSheet, TextInput, TextInputChangeEventData, TextInputKeyPressEventData, View } from "react-native"

interface IPinInput {
  onChange: (value: string) => void,
  currentValue?: string,
  codeLength: number
}

export default function PinInput({ codeLength, currentValue, onChange }: IPinInput) {
  const [inputValue, setInputValue] = useState<{ [key: number]: string }>(
    (currentValue || '').split('').reduce((obj, current, index) => ({ ...obj, [index]: current }), {})
  )

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
    const changeText = Object.values(newInputValue).join('')
    onChange(changeText)
  }

  const handleKeyPress = (input: NativeSyntheticEvent<TextInputKeyPressEventData>, index: number) => {
    if (input.nativeEvent.key === "Backspace" && (inputValue[index] || '').length === 0) {
      if (index === 0) {
        inputs.current[index]?.blur()
      }
      else {
        inputs.current[index - 1]?.focus()
        const newInputValue = { ...inputValue }
        delete newInputValue[index - 1]

        setInputValue(newInputValue)

        const changeText = Object.values(newInputValue).join('')
        onChange(changeText)
      }
    }
  }

  return <View style={styles.pinInputContainer}>
    {Array.apply(null, Array(codeLength)).map((_, i) => {

      return <TextInput
        ref={r => inputs.current[i] = r}
        style={styles.pinInput}
        maxLength={1}
        key={i}
        keyboardType="numeric"
        value={inputValue[i] || ''}
        onKeyPress={(e) => handleKeyPress(e, i)}
        onChange={(e) => handleInputChange(e, i)}
      />
    })}
  </View>
}

const styles = StyleSheet.create({
  pinInput: {
    backgroundColor: "grey",
    textAlign: "center",
    height: 30,
    width: 30
  },
  pinInputContainer: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
    gap: 8
  }
})