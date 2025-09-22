import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import logoDevTalles from "@/assets/png/LOGO B.png";
import { getTranslations } from "next-intl/server";
import AuthMenu from "./AuthMenu";
import Link from "next/link";
import { routes } from "@/config/routes";

const Header = async () => {
  const t = await getTranslations('HomePage.header');

  return (
    <header className="flex justify-center sticky top-0 w-auto border-b backdrop-blur px-3 z-50 bg-gradient-to-r from-primary to-primary-glow supports-[backdrop-filter]:bg-background/60">
      <div className="container w-full flex h-16 items-center justify-between">
        {/* Logo */}
        <div className="flex items-center justify-center space-x-2">
          <Link href={routes.home} className="flex h-40 w-40 items-center justify-center rounded-lg gradient-hero">
            <img src={logoDevTalles.src} alt="" />
          </Link>
          {/* <span className="text-2xl font-normal bg-gradient-to-r from-primary to-primary-glow bg-clip-text">
                        BLog
                    </span> */}
        </div>

        {/* Search Bar - Hidden on mobile */}
        <div className="hidden md:flex flex-1 max-w-sm mx-8">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Buscar posts..."
              className="pl-10 bg-muted/50 border-none focus:bg-background transition-smooth"
            />
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex justify-center items-center space-x-4">
          {/* <Button variant="ghost" size="sm" className="hidden sm:flex">
                        Explorar
                    </Button>
                    <Button variant="ghost" size="sm" className="hidden sm:flex">
                        <Heart className="h-4 w-4 mr-2" />
                        Favoritos
                    </Button> */}
          {/* <Button variant="outline" size="sm" asChild>
            <Link href={routes.login}>
              <User className="h-4 w-4 mr-2" />
              {t('login')}
            </Link>
          </Button> */}
          <AuthMenu />
          <Button
            size="sm"
            className="gradient-hero border-0 hover:opacity-90 transition-smooth"
          >
            {t('write')}
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
