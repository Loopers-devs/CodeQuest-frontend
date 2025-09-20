import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Control, FieldPath, FieldValues } from "react-hook-form";

interface Props<T extends FieldValues> extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'name' | 'control'> {
    control: Control<T>
    name: FieldPath<T>
    label: string
}

export default function CustomInput<T extends FieldValues>({ control, name, label, ...rest }: Props<T>) {
    return (
        <FormField
          control={control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{label}</FormLabel>
              <FormControl>
                <Input {...field} {...rest} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
    )
}