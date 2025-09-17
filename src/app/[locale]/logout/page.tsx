"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useRouter } from "@/i18n/navigation";
import { Loader2Icon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { clientLogout } from "@/lib/auth-client";

export default function LogoutPage() {
	const t = useTranslations("logout");
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

		useEffect(() => {
			clientLogout()
				.then(() => setLoading(false))
				.catch(() => {
					setError(t("error"));
					setLoading(false);
				});
		}, [t]);

		if (loading) {
			return (
				<div
					className="flex flex-col items-center justify-center w-full h-svh min-h-svh bg-background text-center"
					style={{ minHeight: '100svh' }}
				>
					<Loader2Icon className="animate-spin mb-4 text-primary" style={{ width: 48, height: 48 }} />
					<span className="text-lg font-medium">{t("loggingOut")}</span>
				</div>
			);
		}

		if (error) {
			return (
				<div className="flex flex-col items-center justify-center w-full h-svh min-h-svh text-center">
					<span className="text-destructive text-lg font-medium">{error}</span>
				</div>
			);
		}

		return (
			<div className="flex flex-col items-center justify-center w-full h-svh min-h-svh text-center">
				<h1 className="text-2xl font-bold mb-2">{t("logoutSuccess")}</h1>
				<Button
                    size="lg"
					onClick={() => router.push("/auth/login")}
				>
					{t("goToLogin")}
				</Button>
			</div>
		);
}
