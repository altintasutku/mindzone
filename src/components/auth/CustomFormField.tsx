import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../ui/form";
import { cn } from "@/lib/utils";

type Props = Readonly<{
  form: any;
  name: string;
  small?: boolean;
  children: ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues>;
  }) => React.ReactNode;
}>;

const CustomFormField = ({ form, name, small = false, children }: Props) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem
          className={cn("col-span-2 shadow rounded-md overflow-hidden", {
            "col-span-1": small,
          })}
        >
          <FormControl>{children({ field })}</FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
