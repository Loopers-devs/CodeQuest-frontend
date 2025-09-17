import { Button } from "@/components/ui/button";
import DiscrodIcon from "@/components/icons/discord-icon";
import GoogleIcon from "@/components/icons/google-icon";
import { CardFooter } from "./ui/card";
import { Separator } from "./ui/separator";
import { useTranslations } from "next-intl";

export default function SocialAuth() {

  const t = useTranslations("socialAuth");  

  return (
    <CardFooter className="flex-col w-full gap-4">
      <Separator />
      <p className="text-sm text-muted-foreground">{t("orContinueWith")}</p>
      <div className="flex gap-2 items-center w-full justify-center">
        <Button variant="outline" size="icon">
          <DiscrodIcon />
        </Button>
        <Button variant="outline" size="icon">
          <GoogleIcon />
        </Button>
      </div>
    </CardFooter>
  );
}
