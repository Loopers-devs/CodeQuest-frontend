import { getAllPostsAction } from "@/actions/post.action";
import { Button } from "@/components/ui/button";
import Header from "@/shared/components/Header";
import Hero from "@/shared/components/Hero";
import PostCard from "@/shared/components/PostCard";
import Sidebar from "@/shared/components/Sidebar";
import { ArrowRight, Flame } from "lucide-react";
import { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { use } from "react";

interface Props {
  searchParams: Promise<{ paginate: string }>;
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('HomePage')

  return {
    title: t('meta-title'),
    description: t('meta-description'),
  }
}

export default async function Home({ searchParams }: Props) {
  const params = await searchParams;

  console.log(params);

  const t = await getTranslations('HomePage')

  const { items, nextCursor } = await getAllPostsAction({  take: 4, includes: ['author'] });

  return (
    <>
      {/* <div className="font-sans grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-4xl font-bold text-center">{t('welcome')}</h1>
    </div> */}


          <div className="flex gap-8">
            {/* Posts Grid */}
            <div className="flex-1">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <Flame className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold text-foreground">
                    {t('latest-posts')}
                  </h2>
                </div>
                <Button variant="outline" size="sm">
                  {t('view-all')}
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </div>

              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                {items.map((post) => (
                  <PostCard key={post.id} post={post} />
                ))}
              </div>

              {/* Load more */}
              {nextCursor && (
                <div className="mt-12 text-center">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-background/80 backdrop-blur"
                  >
                    {t('load-more')}
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </div>
              )}
            </div>

            {/* Sidebar */}
            {/* <Sidebar /> */}
          </div>
    </>
  );
}
