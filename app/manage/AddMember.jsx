import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {  useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import { Button } from "@/components/ui/button";

export default function AddMember({setFullData}) {
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      name: '',
      discord: '',
      class: '',
      power: '',
    }
  });

  const onSubmit = async (values) => {
    const updateObj = {
      in_game_name: values.name,
      power: [values.power],
      discord: values.discord,
      class: values.class
    };
    // Add other fields as needed
    const supabase = createClient()
    supabase
      .from('members')
      .insert(updateObj)
      .then(({ error }) => {
        if (error) {
          console.error('Error adding record:', error.message);
        } else {
          setFullData(prev =>
            [...prev, updateObj]
          );
          setOpen(false);
        }
      });
  }

  return (
    <Dialog onOpenChange={o => { setOpen(o); }} open={open}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer mt-8 justify-self-center w-50 text-2xl h-15 mb-8">
          Add Member
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add Member
          </DialogTitle>
          <DialogDescription>
            Add members to the servers below. Click add when you are done.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-12">
            <fieldset >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discord"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Discord</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="class"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Class</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="power"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Power</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <DialogFooter>
                <Button className="my-2" type="submit">Add</Button>
              </DialogFooter>
            </fieldset>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  )
}