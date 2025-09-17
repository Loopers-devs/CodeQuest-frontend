import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";


type Props = React.ComponentPropsWithoutRef<typeof Button> & {
    label?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
};


export default function CustomButton({ label, isLoading, children, ...props }: Props) {
    return (
        <Button {...props} disabled={isLoading}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : (children ?? label)}
        </Button>
    );
}