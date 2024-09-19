"use client";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { USER_CONST } from "@/constants/users";
import { IoMdArrowRoundBack } from "react-icons/io";
import React from "react";
import useFormCreateUser from "@/hook/query-users/useFormCreateUser";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { z } from "zod";
import { COMMONS_CONST } from "@/constants/commons";
import { AUTH_CONST } from "@/constants/login";
import { useCreateUser } from "@/hook/query-users/useCreateUser";
import Link from "next/link";
import ButtonBack from "@/components/button-back";

const CreatePage = () => {
  const { formSchema, form } = useFormCreateUser();
  const mutate = useCreateUser();

  const handleChange = (event: string) => {
    if (event === "USER" || event === "ADMIN") {
      form.setValue("roles", [event]);
    }
  };

  const handleCreate = (values: z.infer<typeof formSchema>) => {
    mutate.mutate(values);
  };

  return (
    <div className="flex w-full flex-col gap-4 p-4">
      <h1 className="text-2xl font-bold">{USER_CONST.CREATE_USER}</h1>

      <ButtonBack url="/admin/users" />
      <Card className="mx-auto max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">
            {AUTH_CONST.REGISTER}
          </CardTitle>
          <CardDescription>{USER_CONST.CREATE_DESCRIPTION}</CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleCreate)}>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>

                      <FormControl>
                        <Input
                          placeholder={COMMONS_CONST.ENTER_EMAIL}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder={COMMONS_CONST.ENTER_NAME}
                          {...field}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder={COMMONS_CONST.ENTER_PASSWORD}
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Trạng thái của người dùng</FormLabel>
                    </div>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="roles"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-center gap-4">
                    <FormLabel>Phân Quyền</FormLabel>
                    <Select onValueChange={handleChange} defaultValue={"USER"}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem key={"ADMIN"} value={"ADMIN"}>
                          ADMIN
                        </SelectItem>
                        <SelectItem key={"USER"} value={"USER"}>
                          USER
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter>
              <Button type="submit" className="w-full">
                {AUTH_CONST.REGISTER}
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  );
};

export default CreatePage;
