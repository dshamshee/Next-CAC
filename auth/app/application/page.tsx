"use client";
import {
  applicationSchema,
  ApplicationType,
} from "@/zod types/applicationType";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Form, useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from 'axios'
import { toast } from "sonner"

export default function ApplicationPage() {
  const form = useForm<ApplicationType>({
    resolver: zodResolver(applicationSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      status: "pending",
    },
  });

  const onSubmit = async (data: ApplicationType) => {
    console.log(data);
    const response = await axios.post('/api/application', data)
    console.log("response", response.data)
    if(response.status === 201){
      toast.success("Application submitted successfully")
    }else{
      toast.error("Application submission failed")
    }
  };

  return (
    <div className="mainContainer">
      <h1 className="text-2xl font-bold text-blue-500 mb-8 text-center">
        Application Form
      </h1>

      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-6 space-y-6 max-w-md mx-auto">
        <FieldSet>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="firstName">First Name</FieldLabel>
              <Input
                id="firstName"
                type="text"
                placeholder="Enter your first name"
                {...form.register("firstName")}
              />
              <FieldError errors={form.formState.errors.firstName?.message ? [{ message: form.formState.errors.firstName?.message }] : undefined}></FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="lastName">Last Name</FieldLabel>
              <Input
                id="lastName"
                type="text"
                placeholder="Enter your last name"
                {...form.register("lastName")}
              />
              <FieldError errors={form.formState.errors.lastName?.message ? [{ message: form.formState.errors.lastName?.message }] : undefined}></FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...form.register("email")}
              />
              <FieldError errors={form.formState.errors.email?.message ? [{ message: form.formState.errors.email?.message }] : undefined}></FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="phone">Phone</FieldLabel>
              <Input
                id="phone"
                type="text"
                placeholder="Enter your phone number"
                {...form.register("phone")}
              />
              <FieldError errors={form.formState.errors.phone?.message ? [{ message: form.formState.errors.phone?.message }] : undefined}></FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="status">Status</FieldLabel>
              <Select
                value={form.watch("status")}
                onValueChange={(value) =>
                  form.setValue(
                    "status",
                    value as "pending" | "shortlisted" | "rejected"
                  )
                }
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select a status" />
                </SelectTrigger>
                <SelectContent>
                    {/* <SelectItem value="selectStatus">Select Status...</SelectItem> */}
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="shortlisted">Shortlisted</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
              <FieldError errors={form.formState.errors.status?.message ? [{ message: form.formState.errors.status?.message }] : undefined}></FieldError>
            </Field>
          </FieldGroup>
        </FieldSet>

        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
}
