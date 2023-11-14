import React from "react"
import { Button } from "../components/elements"
import { useAuth } from "../hooks/use-auth"

interface IDashboard { }

const DashboardScreen = (props: IDashboard) => {
  const { unauthenticate } = useAuth()
  return <Button title="Jada" variant="dark" onPress={unauthenticate} />
}

export default DashboardScreen
