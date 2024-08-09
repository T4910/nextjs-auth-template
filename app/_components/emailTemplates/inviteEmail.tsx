import { Html } from "@react-email/components";

type inviteEmailProps = {
    username: string
    password: string
    url: string
}

export function InviteEmail({ username, password, url }: inviteEmailProps) {

  return (
    <Html lang="en">
        Your username: {username}.
        Your password: {password}
        <br />
        Click here to login: {url}
    </Html>
  );
}
