"use client";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useForm } from "react-hook-form";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";

const searchSchema = z.object({
  search: z.string().min(1, "Please enter a search query."),
  genre: z.string().min(1, "Please select a genre."),
});

type SearchFormValues = z.infer<typeof searchSchema>;

interface SearchFormProps {
  onSearch: (searchParams: any) => void;
  mockData: (mock: any) => void;
  isLoading: boolean;
}

export function SearchForm({ onSearch, mockData, isLoading }: SearchFormProps) {
  const form = useForm<SearchFormValues>({
    defaultValues: { search: "", genre: "" },
    resolver: zodResolver(searchSchema),
    mode: "onChange",
  });

  const handleSubmit = (values: SearchFormValues) => {
    onSearch(values);
  };

  return (
    <Card className="rounded-2xl shadow-sm border border-black/5 bg-white w-full mx-auto p-4">
      <CardHeader className="-mb-5">
        <h1 className="font-semibold text-lg">Video Parameter</h1>
        <h1 className="text-sm text-slate-400">
          Search and analyse your preferences here
        </h1>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="search"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-sm text-slate-500">
                      Query
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter your search query"
                        className="bg-white rounded-lg px-4 py-2 text-sm font-normal"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="font-normal text-sm text-slate-500">
                      Genre
                    </FormLabel>
                    <FormControl>
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                        disabled={isLoading}
                      >
                        <SelectTrigger
                          id="genre"
                          className="bg-white rounded-lg px-4 py-2 text-sm font-normal"
                        >
                          <SelectValue placeholder="Select a genre" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="スキンケア">Skincare</SelectItem>
                          <SelectItem value="makeup">Makeup</SelectItem>
                          <SelectItem value="fashion">Fashion</SelectItem>
                          <SelectItem value="food">Food</SelectItem>
                          <SelectItem value="fitness">Fitness</SelectItem>
                          <SelectItem value="travel">Travel</SelectItem>
                          <SelectItem value="tech">Technology</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex justify-end gap-4">
              <Button
                type="submit"
                className="rounded-lg px-6 py-2 text-sm font-medium bg-black text-white hover:bg-blue-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Searching..." : "Search"}
              </Button>
              <Button
                onClick={mockData}
                className="rounded-lg px-6 py-2 text-sm font-medium bg-black text-white hover:bg-blue-900 transition"
                disabled={isLoading}
              >
                {isLoading ? "Mock data..." : "Mock"}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
