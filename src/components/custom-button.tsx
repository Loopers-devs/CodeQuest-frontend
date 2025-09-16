import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";

type Props = React.ComponentPropsWithoutRef<typeof Button> & {
    label: string;
    isLoading?: boolean;
}


export default function CustomButton({ label, isLoading, ...props }: Props) {
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : label}
        </Button>
    );
}