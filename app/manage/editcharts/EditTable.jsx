"use client"

import * as React from "react"

import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  useReactTable,
  getSortedRowModel
} from "@tanstack/react-table"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { Input } from "@/components/ui/input"

export default function EditTable({ columns, data: initialData, onRefresh }) {
  const [data, setData] = React.useState(initialData);
  React.useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const [sorting, setSorting] = React.useState([])
  const [columnFilters, setColumnFilters] = React.useState([])
  const [open, setOpen] = React.useState(false)
  const [editRow, setEditRow] = React.useState(null)

  const form = useForm({
    defaultValues: {
      power: ''
    }
  })

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    }
  })

  // Reset form when dialog opens for a new row
  React.useEffect(() => {
    if (open && editRow) {
      form.reset({ power: '' })
    }
  }, [open, editRow, form])

  const onRowButtonClick = async (values) => {
    if (!editRow) return;
    // Get the original row data
    const rawData = editRow.original;
    // Clone the power array and add the new value
    const newPowerArr = Array.isArray(rawData.power)
      ? [...rawData.power, Number(values.power)]
      : [Number(values.power)];
    const updateObj = {
      in_game_name: rawData.in_game_name,
      power: newPowerArr,
      discord: rawData.discord,
      class: rawData.class
    };
    const supabase = await createClient();
    await supabase
      .from('members')
      .update(updateObj)
      .eq('id', rawData.id);
    // Update the local data immediately for UI feedback
    setData(prev =>
      prev.map(rowObj =>
        rowObj.id === rawData.id
          ? { ...rowObj, power: newPowerArr }
          : rowObj
      )
    );
    if (typeof onRefresh === 'function') {
      onRefresh(
        data.map(rowObj =>
          rowObj.id === rawData.id
            ? { ...rowObj, power: newPowerArr }
            : rowObj
        )
      );
    }
    setOpen(false);
    setEditRow(null);
  }

  return (
    <div>
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter names..."
          value={(table.getColumn("in_game_name")?.getFilterValue()) ?? ""}
          onChange={(event) =>
            table.getColumn("in_game_name")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map(headerGroup => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map(header => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map(row => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                  <TableCell>
                    <Dialog onOpenChange={o => { setOpen(o); setEditRow(o ? row : null); }} open={open && editRow?.id === row.id}>
                      <DialogTrigger asChild>
                        <Button className="cursor-pointer">
                          Add
                        </Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogHeader>
                          <DialogTitle>
                            Add Power
                          </DialogTitle>
                          <DialogDescription>
                            Enter a new power value for {row.original.in_game_name}.
                          </DialogDescription>
                        </DialogHeader>
                        <Form {...form}>
                          <form onSubmit={form.handleSubmit(onRowButtonClick)} className="space-y-12">
                            <fieldset >
                              <FormField
                                control={form.control}
                                name="power"
                                render={({ field }) => (
                                  <FormItem>
                                    <FormLabel>Power</FormLabel>
                                    <FormControl>
                                      <Input {...field} type="number" />
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
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={(columns?.length ?? 0) + 1} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
