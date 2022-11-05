import React from "react";
import Checkbox from "../Form/Checkbox";
import FileInput from "../Form/FileInput";
import Select from "../Form/Select";
import TextArea from "../Form/TextArea";
import TextInput from "../Form/TextInput";
import DateInput from './../Form/DateInput';

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
  control
}: Props) {
  return fields.map((field: any) => {
    switch (field.type) {
      case "text":
        return (
          <TextInput
            {...register(field.name)}
            key={field.name}
            label={field.label}
            loading={loading}
            error={errors[field.name]?.message?.toString()}
          />
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
