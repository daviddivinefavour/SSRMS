import Link from "next/link";
import Button from "../portal/_components/atoms/Button";
import Heading from "../portal/_components/atoms/Heading";
import Input from "../portal/_components/atoms/Input";

export default function Home() {
  return (
    <>
      <div className="mb-[40px]">
        <Heading
          type="h2"
          className="text-[#000] text-[20px] leading-[19.5px]"
          fontWeight="font-bold"
        >
          Welcome back
        </Heading>
        <p className="text-base text-[#898B8C] font-normal mb-[42px] leading-[19.5px] mt-3">
          Sign in to continue...
        </p>
      </div>
      <div>
        <Input
          label="Email"
          placeholder="student@example.com"
          type="email"
          className="mb-[20px]"
          name="email"
          id="email"
        />
        <Input
          label="Password"
          placeholder="!#@$ABcd!!1234"
          type="password"
          className="mb-[48px]"
          name="password"
          id="password"
        />
        <Link href="/portal">
          <Button
            type="submit"
            variant="default"
            size="lg"
            className="w-full bg-main-primary-main/95 hover:bg-main-primary-main"
          >
            Login
          </Button>
        </Link>
      </div>
    </>
  );
}
