import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, User, PenTool, Heart } from "lucide-react";
import logoDevTalles from "@/assets/png/LOGO B.png"
// import { Link } from "react-router-dom";

const Header = () => {
    return (
        <header className="flex justify-center sticky top-0 w-auto border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 px-3">
            <div className="container w-full flex h-16 items-center justify-between">
                {/* Logo */}
                <div className="flex items-center justify-center space-x-2">
                    <div className="flex h-40 w-40 items-center justify-center rounded-lg gradient-hero">
                        <img src={logoDevTalles.src} alt="" />
                    </div>
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
                    <Button variant="outline" size="sm">
                        <User className="h-4 w-4 mr-2" />
                        Acceder
                    </Button>
                    <Button size="sm" className="gradient-hero border-0 hover:opacity-90 transition-smooth">
                        Escribir
                    </Button>
                </nav>
            </div>
        </header>
    );
};

export default Header;