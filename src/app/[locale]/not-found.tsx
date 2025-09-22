import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { routes } from "@/config/routes";
import { getTranslations } from "next-intl/server";
import Link from "next/link";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <main className="min-h-screen flex items-center justify-center py-12">
      <section className="max-w-3xl w-full shadow-lg rounded-2xl p-8 md:p-12 text-center">
        <Card>
          <CardHeader>
            <h1 className="text-3xl font-bold mb-4">{t("title")}</h1>
          </CardHeader>
          <CardContent>
            <p className="mb-6 text-muted-foreground">
              {t("description")}
            </p>
            <Button asChild>
              <Link href={routes.home}>{t("backToHome")}</Link>
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  );
}
