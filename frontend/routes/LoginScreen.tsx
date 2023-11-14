import React, { useState } from "react"
import { View } from "react-native"

// Components
import styled from "styled-components/native"
import AuthHeader from "../components/AuthHeader"
import { Button } from "../components/elements"
import Input from "../components/elements/Input"
import { useAuth } from "../hooks/use-auth"

const LoginScreen = ({ navigation }: any) => {
  const [form, setForm] = useState<{ password?: string, email?: string }>({})
  const [success, setSuccess] = useState(false)

  const { authenticate } = useAuth()

  const handleOnLogin = async () => {
    if (!form?.email || !form?.password) return
    const result = await authenticate(form?.email, form?.password)

    if (!result?.error) {
      setSuccess(true)
      navigation.navigate("DashboardScreen")
    }
  }

  return (
    <>
      <SHeader>
        <AuthHeader />
      </SHeader>
      <SContainer>
        <SContent>
          <STitle>Sign in!</STitle>
          <SText>Let’s build some awesome surveys!</SText>
          <SForm>
            <SFormText>Fill out the form</SFormText>
            <SFormItem>
              <Input placeholder="E-mail..." variant="dark" textContentType="emailAddress" onChangeText={(v) => setForm({ ...form, email: v })} />
            </SFormItem>
            <SFormItem>
              <Input placeholder="Password..." variant="dark" value={form.password} secureTextEntry textContentType="password" onChangeText={(v) => setForm({ ...form, password: v })} />
            </SFormItem>
            <SFormItem>
              <Button variant="primary" title={"Sign in"} onPress={handleOnLogin} />
            </SFormItem>
          </SForm>
        </SContent>
        <SFooter>
          <SLogin>
            Don't have an account? <SLoginLink onPress={() => navigation.navigate("SignupScreen")}>Sign up</SLoginLink>
          </SLogin>
        </SFooter>
      </SContainer>
    </>
  )
}

export default LoginScreen

const SContainer = styled(View)`
    padding: 0 16px 20px 16px;
    height: 100%;
    background-color: ${props => props.theme["WHITE"]};
    justify-content: space-between;
`

const SHeader = styled(View)`
    background-color: ${props => props.theme["WHITE"]};
`

const SContent = styled(View)`
    flex: 1;
    justify-content: flex-start;
    margin-top: 32px;
    align-items: center;
`

const STitle = styled.Text`
    font-size: 42px;
    margin-bottom: 8px;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_700Bold";
`

const SText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_400Regular";
`

const SForm = styled.View`
    margin-top: 40px;
    width: 100%;
`

const SFormText = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_600SemiBold";
    margin-bottom: 16px;
`

const SFormItem = styled.View`
    margin-bottom: 16px;

    &:last-child {
        margin-bottom: 0;
    }
`

const SFooter = styled.View`
    width: 100%;
    flex: 1;
    align-items: center;
    justify-content: center;
`

const SLogin = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.theme["TEXT"]};
    font-family: "Nunito_400Regular";
`

const SLoginLink = styled.Text`
    font-size: 18px;
    font-weight: 400;
    color: ${props => props.theme["PRIMARY_COLOR"]};
    font-family: "Nunito_600SemiBold";
    text-decoration: underline;
`
