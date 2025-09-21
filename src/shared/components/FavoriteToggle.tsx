import { Button } from "@/components/ui/button";
import {
  useAddPostToFavorites,
  useRemovePostFromFavorites,
} from "@/hooks/use-post";
import { cn } from "@/lib/utils";
import { useAuth } from "@/providers/AuthProvider";
import { BookmarkPlus } from "lucide-react";

interface Props {
  postId: string;
  isFavorite?: boolean;
}

export const FavoriteToggle = ({ postId, isFavorite }: Props) => {
  const { mutate: addToFavorites } = useAddPostToFavorites(postId);
  const { mutate: removeFromFavorites } = useRemovePostFromFavorites(postId);

  const session = useAuth();

  return (
    <Button
      variant="ghost"
      size="sm"
      disabled={!session?.user}
      className={cn(
        "h-8 w-8 p-0 opacity-0 group-hover:opacity-100 transition-smooth",
        { "text-primary opacity-100": isFavorite },
        { "hidden": !session?.user }
      )}
      onClick={() => (isFavorite ? removeFromFavorites() : addToFavorites())}
    >
      <BookmarkPlus className="h-4 w-4" />
    </Button>
  );
};
