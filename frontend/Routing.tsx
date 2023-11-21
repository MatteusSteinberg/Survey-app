import { createNativeStackNavigator } from "@react-navigation/native-stack"

const Stack = createNativeStackNavigator()

import { useAuth } from "./hooks/use-auth"
import AnswersScreen from "./routes/Answers"
import CameraScreen from "./routes/Camera"
import CreateSurvey from "./routes/CreateSurvey"
import DashboardScreen from "./routes/DashboardScreen"
import LoginScreen from "./routes/LoginScreen"
import PinCodeScreen from "./routes/PinCodeScreen"
import ProfileScreen from "./routes/ProfileScreen"
import SignupScreen from "./routes/SignupScreen"
import SurveyScreen from "./routes/Survey"
import WelcomeScreen from "./routes/WelcomeScreen"

const Routing = () => {
  const { user } = useAuth()

  const isLoggedIn = !!user

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isLoggedIn && (
        <>
          <Stack.Screen name="DashboardScreen" component={DashboardScreen} />
          <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
          <Stack.Screen name="CreateScreen" component={CreateSurvey} />

          {/* @ts-expect-error */}
          <Stack.Screen name="AnswersScreen" component={AnswersScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        </>
      )}
      {!isLoggedIn && (
        <>
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="PinScreen" component={PinCodeScreen} />

          {/* @ts-expect-error */}
          <Stack.Screen name="AnswersScreen" component={AnswersScreen} />
          <Stack.Screen name="CameraScreen" component={CameraScreen} />
          <Stack.Screen name="SurveyScreen" component={SurveyScreen} />
        </>
      )}
    </Stack.Navigator>
  )
}

export default Routing
