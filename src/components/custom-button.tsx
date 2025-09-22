import { Button } from "@/components/ui/button";
import { Loader2Icon } from "lucide-react";


type Props = React.ComponentPropsWithoutRef<typeof Button> & {
    label?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
    disabled?: boolean;
};


export default function CustomButton({ label, isLoading, children, disabled, ...props }: Props) {
    return (
        <Button {...props} disabled={isLoading || disabled}>
            {isLoading ? <Loader2Icon className="animate-spin" /> : (children ?? label)}
        </Button>
    );
}