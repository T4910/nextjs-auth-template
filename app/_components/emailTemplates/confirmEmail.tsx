import { Html, Button } from "@react-email/components";

type confirmEmailProps = {
    url: string
}

export function ConfirmEmail({ url }: confirmEmailProps) {

  return (
    <Html lang="en">
      <Button href={url}>Click me</Button>
    </Html>
  );
}
