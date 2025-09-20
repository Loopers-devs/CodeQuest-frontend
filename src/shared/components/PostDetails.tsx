import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent } from "@/components/ui/card";
import { Heart, MessageCircle, BookmarkPlus, Share2, ArrowLeft, Clock, Eye } from "lucide-react";
import Header from "@/components/Header";

// Mock data - conectarás tu servicio aquí
const mockPost = {
    id: "1",
    title: "The Future of Web Development: Trends to Watch in 2024",
    content: `
    <p>Web development continues to evolve at a rapid pace, with new technologies and frameworks emerging constantly. As we look ahead to 2024, several key trends are shaping the future of how we build and interact with web applications.</p>
    
    <h2>1. AI-Powered Development Tools</h2>
    <p>Artificial intelligence is revolutionizing the development process. From code completion to automated testing, AI tools are becoming indispensable for modern developers. These tools not only increase productivity but also help reduce errors and improve code quality.</p>
    
    <h2>2. WebAssembly (WASM) Adoption</h2>
    <p>WebAssembly is gaining traction as a way to run high-performance applications in the browser. With support for multiple programming languages, WASM opens up new possibilities for web applications that were previously limited to native apps.</p>
    
    <h2>3. Progressive Web Apps (PWAs)</h2>
    <p>PWAs continue to bridge the gap between web and native applications. With improved offline capabilities and native-like performance, they're becoming the preferred choice for many businesses looking to reach users across all platforms.</p>
    
    <h2>4. Serverless Architecture</h2>
    <p>The serverless paradigm is simplifying deployment and scaling. Developers can focus on writing code without worrying about server management, leading to faster development cycles and reduced operational costs.</p>
  `,
    category: "Technology",
    author: {
        name: "Sarah Johnson",
        avatar: "https://images.unsplash.com/photo-1494790108755-2616b332c371?w=400&h=400&fit=crop&crop=face",
        bio: "Senior Full-Stack Developer with 8+ years of experience in modern web technologies."
    },
    publishedAt: "2024-01-15",
    readTime: "8 min read",
    likes: 124,
    comments: 23,
    views: 1847,
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&h=600&fit=crop",
    tags: ["JavaScript", "React", "Web Development", "Technology"]
};

// Mock comments
const mockComments = [
    {
        id: "1",
        author: {
            name: "Alex Chen",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
        },
        content: "Great article! I'm particularly excited about the WebAssembly developments.",
        publishedAt: "2024-01-16",
        likes: 12
    },
    {
        id: "2",
        author: {
            name: "Maria Rodriguez",
            avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
        },
        content: "PWAs have been a game changer for our mobile strategy. Thanks for the insights!",
        publishedAt: "2024-01-16",
        likes: 8
    }
];

const PostDetail = () => {
    const { id } = useParams();

    return (
        <div className="min-h-screen bg-background">
            <Header />

            <main className="container mx-auto px-4 py-8 max-w-4xl">
                {/* Navigation */}
                <div className="mb-6">
                    <Link to="/">
                        <Button variant="ghost" className="mb-4 hover:bg-muted">
                            <ArrowLeft className="h-4 w-4 mr-2" />
                            Volver al inicio
                        </Button>
                    </Link>
                </div>

                {/* Article Header */}
                <article className="mb-12">
                    <div className="mb-6">
                        <Badge variant="secondary" className="bg-primary/10 text-primary hover:bg-primary/20 mb-4">
                            {mockPost.category}
                        </Badge>

                        <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-6 text-foreground">
                            {mockPost.title}
                        </h1>

                        {/* Author and Meta Info */}
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
                            <div className="flex items-center space-x-4">
                                <Avatar className="h-12 w-12">
                                    <AvatarImage src={mockPost.author.avatar} alt={mockPost.author.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary">
                                        {mockPost.author.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>

                                <div>
                                    <p className="font-medium text-foreground">{mockPost.author.name}</p>
                                    <div className="flex items-center text-sm text-muted-foreground space-x-3">
                                        <span>{mockPost.publishedAt}</span>
                                        <span>•</span>
                                        <div className="flex items-center">
                                            <Clock className="h-3 w-3 mr-1" />
                                            {mockPost.readTime}
                                        </div>
                                        <span>•</span>
                                        <div className="flex items-center">
                                            <Eye className="h-3 w-3 mr-1" />
                                            {mockPost.views} vistas
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center space-x-2">
                                <Button variant="outline" size="sm" className="hover:bg-red-50 hover:text-red-600 hover:border-red-200">
                                    <Heart className="h-4 w-4 mr-2" />
                                    {mockPost.likes}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <MessageCircle className="h-4 w-4 mr-2" />
                                    {mockPost.comments}
                                </Button>
                                <Button variant="outline" size="sm">
                                    <BookmarkPlus className="h-4 w-4" />
                                </Button>
                                <Button variant="outline" size="sm">
                                    <Share2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>

                        {/* Featured Image */}
                        {mockPost.image && (
                            <div className="mb-8 rounded-lg overflow-hidden">
                                <img
                                    src={mockPost.image}
                                    alt={mockPost.title}
                                    className="w-full h-[400px] object-cover"
                                />
                            </div>
                        )}
                    </div>

                    {/* Article Content */}
                    <div className="prose prose-lg max-w-none mb-8">
                        <div
                            className="text-foreground leading-relaxed"
                            dangerouslySetInnerHTML={{ __html: mockPost.content }}
                        />
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-8">
                        {mockPost.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="hover:bg-muted">
                                #{tag}
                            </Badge>
                        ))}
                    </div>

                    <Separator className="mb-8" />

                    {/* Author Bio */}
                    <Card className="mb-12 bg-muted/30">
                        <CardContent className="p-6">
                            <div className="flex items-start space-x-4">
                                <Avatar className="h-16 w-16">
                                    <AvatarImage src={mockPost.author.avatar} alt={mockPost.author.name} />
                                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                                        {mockPost.author.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-xl font-semibold mb-2 text-foreground">
                                        Sobre {mockPost.author.name}
                                    </h3>
                                    <p className="text-muted-foreground leading-relaxed">
                                        {mockPost.author.bio}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                </article>

                {/* Comments Section */}
                <section>
                    <div className="mb-8">
                        <h2 className="text-2xl font-bold mb-6 text-foreground">
                            Comentarios ({mockComments.length})
                        </h2>

                        {/* Add Comment Form */}
                        <Card className="mb-8 bg-muted/20">
                            <CardContent className="p-6">
                                <div className="flex space-x-4">
                                    <Avatar className="h-10 w-10">
                                        <AvatarFallback className="bg-primary/10 text-primary">
                                            U
                                        </AvatarFallback>
                                    </Avatar>
                                    <div className="flex-1">
                                        <textarea
                                            placeholder="Escribe un comentario..."
                                            className="w-full p-3 border rounded-lg resize-none focus:ring-2 focus:ring-primary/20 focus:border-primary bg-background"
                                            rows={3}
                                        />
                                        <div className="flex justify-end mt-3">
                                            <Button size="sm">
                                                Publicar comentario
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Comments List */}
                        <div className="space-y-6">
                            {mockComments.map((comment) => (
                                <Card key={comment.id} className="bg-card">
                                    <CardContent className="p-6">
                                        <div className="flex space-x-4">
                                            <Avatar className="h-10 w-10">
                                                <AvatarImage src={comment.author.avatar} alt={comment.author.name} />
                                                <AvatarFallback className="bg-primary/10 text-primary">
                                                    {comment.author.name.charAt(0)}
                                                </AvatarFallback>
                                            </Avatar>
                                            <div className="flex-1">
                                                <div className="flex items-center space-x-2 mb-2">
                                                    <h4 className="font-medium text-foreground">
                                                        {comment.author.name}
                                                    </h4>
                                                    <span className="text-sm text-muted-foreground">
                                                        {comment.publishedAt}
                                                    </span>
                                                </div>
                                                <p className="text-muted-foreground mb-3 leading-relaxed">
                                                    {comment.content}
                                                </p>
                                                <Button variant="ghost" size="sm" className="hover:text-red-500">
                                                    <Heart className="h-4 w-4 mr-1" />
                                                    {comment.likes}
                                                </Button>
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default PostDetail;