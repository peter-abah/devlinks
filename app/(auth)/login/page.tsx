import DevlinksLogo from "@/components/icons/devlinks-logo";
import DevlinksLogoText from "@/components/icons/devlinks-logo-text";
import LoginForm from "@/components/login-form";

export default function Login({ searchParams }: { searchParams: { message: string } }) {
  return (
    <div className="min-h-screen bg-white sm:bg-background sm:grid sm:place-items-center">
      <div className="mx-auto sm:w-fit flex flex-col sm:items-center gap-16 p-8 sm:p-10 sm:gap-[51px]">
        <div className="flex items-center gap-2">
          <DevlinksLogo />
          <DevlinksLogoText />
          <span className="sr-only">devlinks</span>
        </div>

        <LoginForm />
      </div>
    </div>
  );
}
