"use client";
import { Control, FieldPath, FieldValues } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select";

interface Props<T extends FieldValues>
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "name" | "defaultValue" | "dir" | "value"> {
  control: Control<T>;
  name: FieldPath<T>;
  label: string;
  items: { label: string; value: string }[];
  placeholder?: string;
}

export default function CustomSelect<T extends FieldValues>({
  control,
  name,
  label,
  items,
  placeholder,
  ...props
}: Props<T>) {
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel>{label}</FormLabel>
          <Select onValueChange={field.onChange} defaultValue={field.value} {...props}>
            <FormControl>
              <SelectTrigger className="w-full">
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {
                items.map((item) => (
                  <SelectItem key={item.value} value={item.value}>
                    {item.label}
                  </SelectItem>
                ))
              }
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
