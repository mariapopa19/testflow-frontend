import PageMeta from "../../components/common/PageMeta";
import AuthLayout from "../../layout/AuthPageLayout";
import SignInForm from "../../components/Auth/SignInForm";

export default function SignIn() {
  return (
    <>
      <PageMeta
        title="TestFlow - SignIn"
        description=""
      />
      <AuthLayout>
        <SignInForm />
      </AuthLayout>
    </>
  );
}
