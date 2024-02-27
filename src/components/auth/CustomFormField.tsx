import { ControllerRenderProps, FieldValues } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../ui/form";
import { cn } from "@/lib/utils";

const CustomFormField = ({
  form,
  name,
  small = false,
  children,
}: {
  form: any;
  name: string;
  small?: boolean;
  children: ({
    field,
  }: {
    field: ControllerRenderProps<FieldValues>;
  }) => React.ReactNode;
}) => {
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
        </FormItem>
      )}
    />
  );
};

export default CustomFormField;
