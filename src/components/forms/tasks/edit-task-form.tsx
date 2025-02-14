"use client"
 
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { toast } from "@/hooks/use-toast"
 
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { MultiSelect } from "@/components/multi-select"
 
const formSchema = z.object({
  title: z.string().min(2, { message: "Title is required" }),
  category: z.string(),
  isCompleted: z.boolean(),
  content: z.string(),
  tagIds: z.array(z.string()),
})

interface Props {
  task: z.infer<typeof formSchema>;
}
 
export function EditTaskForm({ task }: Props) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: undefined,
      category: undefined,
      isCompleted: false,
      content: "",
      tagIds: [],
    },
  })

  const tagList = [
    { value: "react", label: "React"},
    { value: "angular", label: "Angular"},
    { value: "vue", label: "Vue"},
    { value: "svelte", label: "Svelte"},
    { value: "ember", label: "Ember"},
  ];

 
  function onSubmit(data: z.infer<typeof formSchema>) {
    toast({
      title: "You submitted the following values:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    })

    form.reset();
  }
 
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          key="title"
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="shadcn" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="category"
          control={form.control}
          name="category"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Category</FormLabel>
              <FormControl>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select Category" className="text-sm text-muted-foreground" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Category 1</SelectItem>
                    <SelectItem value="2">Category 2</SelectItem>
                    <SelectItem value="3">Category 3</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              {/* <FormDescription>
                This is your public display name.
              </FormDescription> */}
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="isCompleted"
          control={form.control}
          name="isCompleted"
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
              
              <FormControl>
                <Checkbox 
                  checked={field.value}
                  onCheckedChange={field.onChange} 
                />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>Completed</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          key="tagIds"
          control={form.control}
          name="tagIds"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <MultiSelect
                  options={tagList}
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                  placeholder="Select Tags"
                  variant="inverted"
                  animation={0}
                  maxCount={5}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}