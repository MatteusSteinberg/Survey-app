import { Keyboard, TouchableWithoutFeedback, View } from "react-native"


const AppScreen = ({ children }: any) => {
  return <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
    <View>
      {children}
    </View>
  </TouchableWithoutFeedback>
}

export default AppScreen