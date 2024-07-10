import { Html, Button } from "@react-email/components";

type twoFactorEmailProps = {
    code: string
}

export function TwoFactorEmail({ code }: twoFactorEmailProps) {

  return (
    <Html lang="en">
        Your One Time Password: {code}
    </Html>
  );
}
