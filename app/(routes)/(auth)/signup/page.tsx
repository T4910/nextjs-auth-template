import { RegisterForm } from "@/components/auth/registerForm"
import { CardWrapper } from "@/components/cardWrapper";


export default function Signup() {
  return (
    <CardWrapper
      headerLabel="Register"
      backBtnLabel="Have an account? Login"
      backBtnHref="/login"
      showOtherAuth
    >
      <RegisterForm />
    </CardWrapper>
  )
}