import { Button } from "@/components/ui/button";
import Header from "@/shared/components/Header";
import Hero from "@/shared/components/Hero";
import PostCard from "@/shared/components/PostCard";
import Sidebar from "@/shared/components/Sidebar";
import { ArrowRight, Flame } from "lucide-react";
import { useTranslations } from "next-intl";

export default function Home() {

  const t = useTranslations('HomePage');

  const mockPosts = [
    {
      id: "1",
      title: "Guía completa de React Server Components: El futuro del desarrollo web",
      excerpt: "Descubre cómo los React Server Components están revolucionando la forma en que construimos aplicaciones web, mejorando el rendimiento y la experiencia del usuario.",
      category: "Desarrollo",
      author: {
        name: "María González",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "3 días",
      readTime: "8 min",
      likes: 124,
      comments: 28,
      image: "https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop"
    },
    {
      id: "2",
      title: "Design Systems que escalan: Lecciones aprendidas en equipos grandes",
      excerpt: "Aprende las mejores prácticas para crear y mantener design systems que funcionen a escala empresarial, basado en experiencias reales.",
      category: "Diseño",
      author: {
        name: "Carlos Ruiz",
        avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "1 semana",
      readTime: "12 min",
      likes: 89,
      comments: 15,
      image: "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=800&h=400&fit=crop"
    },
    {
      id: "3",
      title: "IA en el desarrollo: Cómo ChatGPT cambió mi flujo de trabajo",
      excerpt: "Mi experiencia personal usando herramientas de IA para programar más eficientemente, incluyendo prompts que realmente funcionan.",
      category: "Tecnología",
      author: {
        name: "Ana Martínez",
        avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "2 días",
      readTime: "6 min",
      likes: 203,
      comments: 42,
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=400&fit=crop"
    },
    {
      id: "4",
      title: "De junior a senior: Mi journey de 5 años en tech",
      excerpt: "Reflexiones sobre el crecimiento profesional en tecnología, errores cometidos y lecciones que me hubiera gustado aprender antes.",
      category: "Carrera",
      author: {
        name: "Diego López",
        avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "5 días",
      readTime: "15 min",
      likes: 167,
      comments: 34,
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=400&fit=crop"
    },
    {
      id: "5",
      title: "TypeScript avanzado: Tipos que harán tu código más robusto",
      excerpt: "Técnicas avanzadas de TypeScript que van más allá de lo básico: utility types, conditional types y mapped types explicados con ejemplos prácticos.",
      category: "Tutoriales",
      author: {
        name: "Laura Rodríguez",
        avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "1 día",
      readTime: "10 min",
      likes: 95,
      comments: 19,
      image: "https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&h=400&fit=crop"
    },
    {
      id: "6",
      title: "Startup fallida: Qué aprendí perdiendo $50k en 6 meses",
      excerpt: "La historia cruda de mi primer emprendimiento fallido, errores críticos que cometimos y por qué fracasar rápido puede ser la mejor estrategia.",
      category: "Startups",
      author: {
        name: "Roberto Silva",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=faces"
      },
      publishedAt: "1 semana",
      readTime: "13 min",
      likes: 312,
      comments: 67,
      image: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=400&fit=crop"
    }
  ];

  return (
    <>
      {/* <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center">{t('welcome')}</h1>
    </div> */}

      <div className="min-h-screen bg-background">
        <Header />
        <Hero />

        <main className="container mx-auto px-4 py-12">
          <div className="flex gap-8">
            {/* Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Flame className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">Posts Destacados</h2>
                </div>
                <Button variant="outline" size="sm">
                  Ver todos
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {mockPosts.map((post) => (
                  <PostCard key={post.id} {...post} />
                ))}
              </div>

              {/* Load more */}
              <div className="mt-12 text-center">
                <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur">
                  Cargar más posts
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            {/* <Sidebar /> */}
          </div>
        </main>
      </div>

    </>
  );
}
