import { PageMeta, SingInForm } from "../../components"
import { AuthPageLayout } from "../../layouts"

export const SignIn = () => {
  return (
    <>
      <PageMeta
        title="React.js SignIn Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js SignIn Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <AuthPageLayout>
        <SingInForm/>
      </AuthPageLayout>
    </>
  )
}
