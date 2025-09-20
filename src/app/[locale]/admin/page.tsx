"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Edit, Trash2, Eye } from "lucide-react";
// import { Link } from "react-router-dom";

// Mock data para demostración
const mockPosts = [
    {
        id: 1,
        title: "Introducción a React Hooks",
        excerpt: "Aprende los conceptos básicos de React Hooks y cómo utilizarlos en tus proyectos.",
        category: "programación",
        status: "published",
        author: "Juan Pérez",
        createdAt: "2024-01-15",
        likes: 45,
        comments: 12
    },
    {
        id: 2,
        title: "Guía de Tailwind CSS",
        excerpt: "Todo lo que necesitas saber sobre Tailwind CSS para crear interfaces modernas.",
        category: "diseño",
        status: "draft",
        author: "María García",
        createdAt: "2024-01-14",
        likes: 23,
        comments: 5
    },
    {
        id: 3,
        title: "Optimización de Rendimiento Web",
        excerpt: "Técnicas avanzadas para mejorar el rendimiento de tus aplicaciones web.",
        category: "tecnología",
        status: "published",
        author: "Carlos Rodríguez",
        createdAt: "2024-01-13",
        likes: 67,
        comments: 18
    }
];

const AdminPanel = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedTab, setSelectedTab] = useState("all");

    const filteredPosts = mockPosts.filter(post => {
        const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesTab = selectedTab === "all" || post.status === selectedTab;
        return matchesSearch && matchesTab;
    });

    const stats = {
        total: mockPosts.length,
        published: mockPosts.filter(p => p.status === "published").length,
        draft: mockPosts.filter(p => p.status === "draft").length,
        totalLikes: mockPosts.reduce((sum, p) => sum + p.likes, 0),
        totalComments: mockPosts.reduce((sum, p) => sum + p.comments, 0)
    };

    return (
        <div className="min-h-screen bg-background">
            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground">Panel Administrativo</h1>
                        <p className="text-muted-foreground">Gestiona todos tus posts desde aquí</p>
                    </div>
                    {/* <Link to="/admin/create-post"> */}
                    <div>
                        <Button className="gap-2">
                            <Plus className="h-4 w-4" />
                            Nuevo Post
                        </Button>
                    </div>
                    {/* </Link> */}
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-8">
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-primary">{stats.total}</div>
                            <p className="text-xs text-muted-foreground">Total Posts</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-green-600">{stats.published}</div>
                            <p className="text-xs text-muted-foreground">Publicados</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-yellow-600">{stats.draft}</div>
                            <p className="text-xs text-muted-foreground">Borradores</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-red-500">{stats.totalLikes}</div>
                            <p className="text-xs text-muted-foreground">Total Likes</p>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardContent className="pt-6">
                            <div className="text-2xl font-bold text-blue-500">{stats.totalComments}</div>
                            <p className="text-xs text-muted-foreground">Comentarios</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Filters and Search */}
                <Card className="mb-6">
                    <CardContent className="pt-6">
                        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                            <div className="relative flex-1 max-w-md">
                                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                                <Input
                                    placeholder="Buscar posts..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="pl-10"
                                />
                            </div>
                            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                                <TabsList>
                                    <TabsTrigger value="all">Todos</TabsTrigger>
                                    <TabsTrigger value="published">Publicados</TabsTrigger>
                                    <TabsTrigger value="draft">Borradores</TabsTrigger>
                                </TabsList>
                            </Tabs>
                        </div>
                    </CardContent>
                </Card>

                {/* Posts Table */}
                <Card>
                    <CardHeader>
                        <CardTitle>Posts ({filteredPosts.length})</CardTitle>
                        <CardDescription>
                            Gestiona todos tus posts desde esta tabla
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {filteredPosts.length === 0 ? (
                                <div className="text-center py-8 text-muted-foreground">
                                    No se encontraron posts que coincidan con tu búsqueda.
                                </div>
                            ) : (
                                filteredPosts.map((post) => (
                                    <div
                                        key={post.id}
                                        className="flex items-center justify-between p-4 border border-border rounded-lg hover:bg-accent/50 transition-colors"
                                    >
                                        <div className="flex-1 space-y-2">
                                            <div className="flex items-center gap-2">
                                                <h3 className="font-semibold text-foreground">{post.title}</h3>
                                                <Badge
                                                    variant={post.status === "published" ? "default" : "secondary"}
                                                    className="text-xs"
                                                >
                                                    {post.status === "published" ? "Publicado" : "Borrador"}
                                                </Badge>
                                                <Badge variant="outline" className="text-xs capitalize">
                                                    {post.category}
                                                </Badge>
                                            </div>
                                            <p className="text-sm text-muted-foreground line-clamp-2">
                                                {post.excerpt}
                                            </p>
                                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                                <span>Por {post.author}</span>
                                                <span>{post.createdAt}</span>
                                                <span>❤️ {post.likes}</span>
                                                <span>💬 {post.comments}</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Button variant="ghost" size="sm">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm">
                                                <Edit className="h-4 w-4" />
                                            </Button>
                                            <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                <Trash2 className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
};

export default AdminPanel;