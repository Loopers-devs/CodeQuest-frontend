"use client"

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, TrendingUp, Hash } from "lucide-react";
import { useState } from "react";

const categories = [
    { name: "Desarrollo", count: 45, color: "bg-blue-100 text-blue-800" },
    { name: "Diseño", count: 32, color: "bg-purple-100 text-purple-800" },
    { name: "Tecnología", count: 28, color: "bg-green-100 text-green-800" },
    { name: "Startups", count: 19, color: "bg-orange-100 text-orange-800" },
    { name: "Carrera", count: 15, color: "bg-pink-100 text-pink-800" },
    { name: "Tutoriales", count: 22, color: "bg-indigo-100 text-indigo-800" },
];

const trendingTags = [
    "React", "TypeScript", "AI", "Next.js", "Python", "Design System",
    "Machine Learning", "API", "DevOps", "UX/UI"
];

const Sidebar = () => {
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");

    const toggleCategory = (categoryName: string) => {
        setSelectedCategories(prev =>
            prev.includes(categoryName)
                ? prev.filter(cat => cat !== categoryName)
                : [...prev, categoryName]
        );
    };

    return (
        <aside className="w-80 h-fit sticky top-20 space-y-6 p-6 bg-card rounded-lg shadow-card">
            {/* Search */}
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-card-foreground">Buscar</h3>
                </div>
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                    <Input
                        placeholder="Buscar posts..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-10"
                    />
                </div>
            </div>

            {/* Categories */}
            <div className="space-y-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                        <Filter className="h-4 w-4 text-muted-foreground" />
                        <h3 className="font-semibold text-card-foreground">Categorías</h3>
                    </div>
                    {selectedCategories.length > 0 && (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => setSelectedCategories([])}
                            className="text-xs h-6 px-2"
                        >
                            Limpiar
                        </Button>
                    )}
                </div>

                <div className="space-y-2">
                    {categories.map((category) => (
                        <Button
                            key={category.name}
                            variant={selectedCategories.includes(category.name) ? "default" : "ghost"}
                            size="sm"
                            onClick={() => toggleCategory(category.name)}
                            className="w-full justify-between h-9 px-3"
                        >
                            <span>{category.name}</span>
                            <Badge variant="secondary" className="text-xs bg-muted">
                                {category.count}
                            </Badge>
                        </Button>
                    ))}
                </div>
            </div>

            {/* Trending Tags */}
            <div className="space-y-3">
                <div className="flex items-center space-x-2">
                    <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    <h3 className="font-semibold text-card-foreground">Tendencias</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                    {trendingTags.map((tag) => (
                        <Badge
                            key={tag}
                            variant="outline"
                            className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-smooth text-xs"
                        >
                            <Hash className="h-3 w-3 mr-1" />
                            {tag}
                        </Badge>
                    ))}
                </div>
            </div>

            {/* Newsletter */}
            <div className="rounded-lg bg-gradient-to-br from-primary/10 to-primary-glow/10 p-4 space-y-3">
                <h3 className="font-semibold text-card-foreground">Stay Updated</h3>
                <p className="text-sm text-muted-foreground">
                    Recibe los mejores artículos directamente en tu email.
                </p>
                <div className="space-y-2">
                    <Input placeholder="tu@email.com" className="bg-background/80" />
                    <Button size="sm" className="w-full gradient-hero border-0">
                        Suscribirse
                    </Button>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;