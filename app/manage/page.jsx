"use client"

import { Protect } from "@clerk/nextjs"
import { calculatePowerGains } from "../utils/calculatePowerGains";
import { getType } from "../utils/getType";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardAction,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { useEffect, useState } from 'react';
import { createClient } from "@/lib/supabase/client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
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
import AddMember from "./AddMember";

export default function ManagePage() {
  const [fullData, setFullData] = useState([]);
  const [open, setOpen] = useState(false);
  const [editMember, setEditMember] = useState(null);

  // Controlled form setup
  const form = useForm({
    defaultValues: {
      name: '',
      discord: '',
      class: '',
      power: '',
    }
  });

  useEffect(() => {
    if (open && editMember) {
      form.reset({
        name: editMember.name || '',
        discord: editMember.discord || '',
        class: editMember.class || '',
        power: Array.isArray(editMember.power) ? editMember.power.join(',') : (editMember.power || '')
      });
    }
  }, [open, editMember, form]);

  useEffect(() => {
    // Fetch data initially
    async function fetchData() {
      const supabase = await createClient();
      const { data, error } = await supabase.from('members').select('*');
      if (error) console.error('Error fetching data:', error.message);
      else setFullData(data);
    }
    fetchData();
  }, []);

  const handleDelete = async (recordId) => {
    const supabase = await createClient()
    const { error } = await supabase
      .from('members')
      .delete()
      .eq('id', recordId);

    if (error) {
      console.error('Error deleting record:', error.message);
    } else {
      // Update the UI after deletion
      setFullData(prevData => prevData.filter(item => item.id !== recordId));
    }
  };

  const onSubmit = async (values) => {
    if (!editMember) return;
    // Example: update only name
    const updateObj = {
      in_game_name: values.name,
      power: values.power.split(","),
      discord: values.discord,
      class: values.class
    };
    // Add other fields as needed
    const supabase = createClient()
    supabase
      .from('members')
      .update(updateObj)
      .eq('id', editMember.id)
      .then(({ error }) => {
        if (error) {
          console.error('Error updating record:', error.message);
        } else {
          setFullData(prev =>
            prev.map(item =>
              item.id === editMember.id
                ? { ...item, ...updateObj }
                : item
            )
          );
          setOpen(false);
        }
      });
  }

  const completeData = fullData.map(item => {
    return {
      discord: item.discord,
      id: item.id,
      name: item.in_game_name,
      class: item.class,
      gains: calculatePowerGains(item.power),
      type: getType(item.class),
      power: item.power
    }}
  )

  const cards = completeData.map(item => {
    return (
      <Card className="w-[375px]" key={item.id}>
      <CardHeader>
        <CardTitle className="flex items-center gap-1">
          <Image src={`/${item.class.toLowerCase()}.webp`} width={30} height={30} alt="class icon"/>
          {item.name}
        </CardTitle>
        <CardDescription>
          <div>{item.type} • {item.class}</div>
          <div>Discord: {item.discord}</div>
        </CardDescription>
        <CardAction className="flex flex-col gap-4">

          <Dialog onOpenChange={o => { setOpen(o); setEditMember(o ? item : null); }} open={open && editMember?.id === item.id}>
            <DialogTrigger asChild>
              <Button>Edit</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Changes
                </DialogTitle>
                <DialogDescription>
                  Apply changes to this member below. Click save when you are done.
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
                      <Button className="my-2" type="submit">Save changes</Button>
                    </DialogFooter>
                  </fieldset>
                </form>
              </Form>
            </DialogContent>
          </Dialog>

          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive" className="cursor-pointer">Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete this member
                  and remove this data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction asChild>
                  <Button onClick={() => handleDelete(item.id)} className="cursor-pointer">Delete</Button>
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardAction>
      </CardHeader>
    </Card>
    )
  })

  return (
    <Protect>
      <main className="flex flex-wrap">
        {cards}
        <AddMember setFullData={setFullData} key="key"/>
      </main>
    </Protect>
  )
}