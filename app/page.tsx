import { Button } from "@/components/ui/button";
import { ShowLoginWrapper } from "@/components/auth/showLoginWrapper";

export default function Home() {
  return (
    <div>
      authentication template
      <ShowLoginWrapper>
        <Button>
          Click me
        </Button>
      </ShowLoginWrapper>
    </div>
  );
}
