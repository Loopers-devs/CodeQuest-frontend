import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import heroImage from "@/assets/hero-bg.jpg";
import { useTranslations } from "next-intl";

const Hero = () => {

    const t = useTranslations('HomePage')

    return (
        <section className="relative overflow-hidden bg-gradient-to-b from-background to-muted/30">
            <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
            {/* <div
                className="absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url(${heroImage})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            /> */}

            <div className="relative container mx-auto px-4 py-24 text-center">
                <div className="mx-auto max-w-4xl">
                    <div className="mb-6 inline-flex items-center rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                        <Sparkles className="mr-2 h-4 w-4" />
                        {t('span-up-title')}
                    </div>

                    <h1 className="mb-6 text-4xl font-bold tracking-tight sm:text-6xl lg:text-7xl">
                        <span className="bg-gradient-to-r from-foreground via-primary to-primary-glow bg-clip-text">
                            {t('title-eslogan')},
                        </span>
                        <br />
                        <span className="text-foreground">
                            {t('subtitle-eslogan')}
                        </span>
                    </h1>

                    <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground sm:text-xl">
                        {t('paragraph-title')}
                    </p>

                    <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
                        <Button size="lg" className="gradient-hero border-0 hover:opacity-90 transition-smooth shadow-elevated">
                            <span className="text-black font-medium">Comenzar a leer</span>
                            <ArrowRight className="ml-2 h-5 w-5 text-black" />
                        </Button>
                        <Button size="lg" variant="outline" className="bg-background/80 backdrop-blur">
                            Escribir mi historia
                        </Button>
                    </div>
                </div>
            </div>

            {/* Decorative elements */}
            {/* <div className="absolute -top-24 -right-24 h-96 w-96 rounded-full bg-primary/20 blur-3xl"></div> */}
            {/* <div className="absolute -bottom-24 -left-24 h-96 w-96 rounded-full bg-primary-glow/20 blur-3xl"></div> */}
        </section>
    );
};

export default Hero;