import React from "react";
import Checkbox from "@/core/components/Form/Checkbox";
import FileInput from "@/core/components/Form/FileInput";
import Select from "@/core/components/Form/Select";
import TextArea from "@/core/components/Form/TextArea";
import TextInput from "@/core/components/Form/TextInput";
import DateInput from "@/core/components/Form/DateInput";

interface Props {
  fields: any;
  getValues: any;
  register: any;
  loading: boolean;
  errors: any;
  control: any;
}

export default function EditFormFields({
  fields,
  getValues,
  register,
  loading,
  errors,
  control,
}: Props) {
  return fields.map((field: any) => {
    switch (field.type) {
      case "text":
        return (
          <>
            <TextInput
              {...register(field.name)}
              key={field.name}
              label={field.label}
              loading={loading}
              error={errors[field.name]?.message?.toString()}
            />
          </>
        );
        case "file":
          return (
            <FileInput
              {...register(field.name)}
              key={field.name}
              label={field.label}
              value={getValues(field.name)}
              loading={loading}
              error={errors[field.name]?.message?.toString()}
            />
          );

      case "textarea":
        return (
          <TextArea
            {...register(field.name)}
            key={field.name}
            label={field.label}
            loading={loading}
            error={errors[field.name]?.message?.toString()}
          />
        );
      case "select":
        return (
          <Select
            {...register(field.name)}
            router={field.router}
            key={field.name}
            label={field.label}
            loading={loading}
            error={errors[field.name]?.message?.toString()}
          />
        );
      case "checkbox":
        return (
          <Checkbox
            {...register(field.name)}
            key={field.name}
            label={field.label}
            error={errors[field.name]?.message?.toString()}
          />
        );
      case "date":
        return (
          <DateInput
            control={control}
            key={field.name}
            name={field.name}
            label={field.label}
            dateFormat="dd/MM/yyyy"
            loading={loading}
            error={errors[field.name]?.message?.toString()}
          />
        );
      default:
        return null;
    }
  });
}
