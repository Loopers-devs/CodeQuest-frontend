"use client"

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { X, Plus, Upload, Eye } from "lucide-react";

const categories = [
    "Tecnología",
    "Programación",
    "Diseño",
    "Marketing",
    "Negocios",
    "Lifestyle",
    "Tutoriales",
    "Noticias"
];

export const CreatePostForm = () => {
    const [formData, setFormData] = useState({
        title: "",
        excerpt: "",
        content: "",
        category: "",
        tags: [] as string[],
        image: null as File | null,
        status: "draft" // draft, published
    });

    const [currentTag, setCurrentTag] = useState("");
    const [preview, setPreview] = useState(false);

    const handleTagAdd = () => {
        if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, currentTag.trim()]
            }));
            setCurrentTag("");
        }
    };

    const handleTagRemove = (tagToRemove: string) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setFormData(prev => ({ ...prev, image: file }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Aquí iría la lógica para enviar al servicio
        console.log("Datos del post:", formData);
    };

    return (
        <div className="max-w-4xl mx-auto p-6 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-foreground">Crear Nuevo Post</h1>
                    <p className="text-muted-foreground">Comparte tu conocimiento con la comunidad</p>
                </div>
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        onClick={() => setPreview(!preview)}
                        className="gap-2"
                    >
                        <Eye className="h-4 w-4" />
                        {preview ? "Editar" : "Vista Previa"}
                    </Button>
                    <Button onClick={handleSubmit} className="gap-2">
                        <Plus className="h-4 w-4" />
                        Publicar Post
                    </Button>
                </div>
            </div>

            {!preview ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Contenido Principal */}
                        <div className="lg:col-span-2 space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Información Básica</CardTitle>
                                    <CardDescription>
                                        Completa los datos principales de tu post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label htmlFor="title">Título del Post</Label>
                                        <Input
                                            id="title"
                                            placeholder="Escribe un título atractivo..."
                                            value={formData.title}
                                            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
                                            className="mt-2"
                                        />
                                    </div>

                                    <div>
                                        <Label htmlFor="excerpt">Extracto</Label>
                                        <Textarea
                                            id="excerpt"
                                            placeholder="Breve descripción del post (máximo 160 caracteres)..."
                                            value={formData.excerpt}
                                            onChange={(e) => setFormData(prev => ({ ...prev, excerpt: e.target.value }))}
                                            className="mt-2 min-h-[80px]"
                                            maxLength={160}
                                        />
                                        <p className="text-xs text-muted-foreground mt-1">
                                            {formData.excerpt.length}/160 caracteres
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Contenido</CardTitle>
                                    <CardDescription>
                                        Escribe el contenido completo de tu post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Textarea
                                        placeholder="Escribe tu post aquí... Puedes usar Markdown para formato."
                                        value={formData.content}
                                        onChange={(e) => setFormData(prev => ({ ...prev, content: e.target.value }))}
                                        className="min-h-[400px] resize-none"
                                    />
                                    <p className="text-xs text-muted-foreground mt-2">
                                        Soporta formato Markdown para texto enriquecido
                                    </p>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Panel Lateral */}
                        <div className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Configuración</CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <Label>Categoría</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, category: value }))}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue placeholder="Selecciona una categoría" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                {categories.map((category) => (
                                                    <SelectItem key={category} value={category.toLowerCase()}>
                                                        {category}
                                                    </SelectItem>
                                                ))}
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div>
                                        <Label>Estado</Label>
                                        <Select
                                            value={formData.status}
                                            onValueChange={(value) => setFormData(prev => ({ ...prev, status: value }))}
                                        >
                                            <SelectTrigger className="mt-2">
                                                <SelectValue />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="draft">Borrador</SelectItem>
                                                <SelectItem value="published">Publicado</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Imagen Destacada</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-6 text-center hover:border-muted-foreground/50 transition-colors">
                                        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Arrastra una imagen o haz clic para seleccionar
                                        </p>
                                        <input
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            id="image-upload"
                                        />
                                        <Button
                                            type="button"
                                            variant="outline"
                                            size="sm"
                                            onClick={() => document.getElementById('image-upload')?.click()}
                                        >
                                            Seleccionar Imagen
                                        </Button>
                                        {formData.image && (
                                            <p className="text-xs text-primary mt-2">
                                                {formData.image.name}
                                            </p>
                                        )}
                                    </div>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Tags</CardTitle>
                                    <CardDescription>
                                        Añade etiquetas relevantes para tu post
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="flex gap-2">
                                        <Input
                                            placeholder="Nueva etiqueta..."
                                            value={currentTag}
                                            onChange={(e) => setCurrentTag(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                                            className="flex-1"
                                        />
                                        <Button
                                            type="button"
                                            onClick={handleTagAdd}
                                            size="sm"
                                            variant="outline"
                                        >
                                            <Plus className="h-4 w-4" />
                                        </Button>
                                    </div>

                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag) => (
                                            <Badge
                                                key={tag}
                                                variant="secondary"
                                                className="gap-1 pr-1"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleTagRemove(tag)}
                                                    className="ml-1 hover:bg-muted-foreground/20 rounded-sm p-0.5"
                                                >
                                                    <X className="h-3 w-3" />
                                                </button>
                                            </Badge>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </form>
            ) : (
                <Card>
                    <CardHeader>
                        <CardTitle>Vista Previa del Post</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                        <div>
                            <h2 className="text-2xl font-bold mb-2">{formData.title || "Título del post"}</h2>
                            <p className="text-muted-foreground mb-4">{formData.excerpt || "Extracto del post..."}</p>
                            <div className="flex gap-2 mb-4">
                                {formData.category && (
                                    <Badge variant="outline">{formData.category}</Badge>
                                )}
                                {formData.tags.map(tag => (
                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                ))}
                            </div>
                            <div className="prose prose-neutral dark:prose-invert max-w-none">
                                <p className="whitespace-pre-wrap">{formData.content || "Contenido del post..."}</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    );
};