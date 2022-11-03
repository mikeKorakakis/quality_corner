import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextInput from "../../core/components/Form/TextInput";
import Button from "../../core/components/LoadingButton";
import { trpc } from "../../utils/trpc";
const title = "Edit Post";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createSchema } from "../../types/zod/feed";
import { notify } from "./../../utils/notify";
import { useModalStore } from "./../../core/stores/modalStore";
import Select from "../../core/components/Form/Select";
import Checkbox from "./../../core/components/Form/Checkbox";
import DateInput from "../../core/components/Form/DateInput";
import TextArea from "../../core/components/Form/TextArea";

interface Props {
  id?: number;
}

type CreateSchemaType = z.infer<typeof createSchema>;
const EditForm = ({ id }: Props) => {
  const { closeModal } = useModalStore();
  const defaultValues: CreateSchemaType & { error: any } = {
    title: "",
    body: "",
    categoryId: "cl9zkducr0000uzpcvhj1jezy",
    date: new Date() || null,
    published: false,
    image: "",
    error: null,
  };
  const {
    register,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues, resolver: zodResolver(createSchema) });

  const utils = trpc.useContext();

  const { mutate: create } = trpc.feed.create.useMutation({
    onSuccess() {
      utils.feed.getAll.invalidate();
      notify({ message: "Successfuly created post!", type: "success" });
      closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const { mutate: update } = trpc.feed.update.useMutation({
    onSuccess() {
      utils.feed.getAll.invalidate();
      notify({ message: "Successfuly updated post!", type: "success" });
      closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const onSubmit = async (values: CreateSchemaType) => {    
    if (id) {
      update({
        ...values,
        id,
      });
    } else {
      create({
        ...values,
      });
    }
  };


    const {isLoading} = trpc.feed.get.useQuery(
      { id: id ?? 0 },
      {
        enabled: !!id,
        onSuccess: (data) => {
          if (data) reset({ ...data });
        },
      }
    );

  if (isLoading && id) return <div>Loading...</div>

  return (
    <div className="w-[28rem] py-10 px-5">
      <div className="mb-5 text-center">
        <h1 className="font-mono text-3xl font-bold text-neutral">{title}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <TextInput
          label="Title"
          {...register("title")}
          error={errors.title?.message}
        />
        <DateInput
          name="date"
          label="Date"
          dateFormat="dd/MM/yyyy"
          control={control}
          error={errors.date?.message}
        />
        <TextArea
          {...register("body")}
          label="Post Body"
          error={errors.body?.message}
        />
        <Select
          {...register("categoryId")}
          label="Category"
          error={errors.categoryId?.message}
        />

        <Checkbox
          label="Published"
          {...register("published")}
          value={"published"}
          error={errors.published?.message}
        />
        {<i>{JSON.stringify(getValues(),null,2)}</i>}
        <div className="pt-4">
          <Button loading={isSubmitting} type="submit" disabled={isSubmitting}>
            SUBMIT
          </Button>
        </div>
        <div className="h-2"></div>
      </form>
    </div>
  );
};

export default EditForm;
