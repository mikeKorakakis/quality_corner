import { FieldError, useForm } from "react-hook-form";
import TextInput from "../../core/components/Form/TextInput";
import Button from "../../core/components/LoadingButton";
import { trpc } from "../../utils/trpc";
const title = "Edit Post";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { createSchema } from "../../types/zod/feed";
import { notify } from "./../../utils/notify";
import { useModalStore } from "./../../core/stores/modalStore";
import Select from "../../core/components/Form/Select";
import Checkbox from "./../../core/components/Form/Checkbox";
import DateInput from "../../core/components/Form/DateInput";
import TextArea from "../../core/components/Form/TextArea";
import { AppRouterNames } from "../../server/trpc/router/_app";
import FileInput from "../../core/components/Form/FileInput";

const createMessageDefault = "Successfuly created!";
const editMessageDefault = "Successfuly updated!";
const submitButtonTextDefault = "SUBMIT";

interface Props {
  id?: any;
  router: AppRouterNames;
  createMessage?: string;
  editMessage?: string;
  submitButtonText?: string;
  createSchema: any;
  fields: any;
  defaultValues?: any;
}

const EditForm = ({
  id,
  router,
  createSchema,
  defaultValues,
  fields,
  submitButtonText = submitButtonTextDefault,
  createMessage = createMessageDefault,
  editMessage = editMessageDefault,
}: Props) => {
  const { closeModal } = useModalStore();
  type CreateSchemaType = z.infer<typeof createSchema>;
  //   const defaultValues: CreateSchemaType & { error: any }
  const {
    register,
    reset,
    control,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues });
  const utils = trpc.useContext();

  const { mutate: create } = trpc[router].create.useMutation({
    onSuccess() {
      utils.feed.getAll.invalidate();
      notify({ message: createMessage, type: "success" });
      closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const { mutate: update } = trpc[router].update.useMutation({
    onSuccess() {
      utils.feed.getAll.invalidate();
      notify({ message: editMessage, type: "success" });
      closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const onSubmit = async (values: CreateSchemaType) => {
    console.log("submitting", values);
    // use fetch to upload image
    // find first property with type file in fields
    const fileField = fields.find((field: any) => field.type === "file");
    if (fileField) {
        const file = values[fileField.name];
    }

    const formData = new FormData();
    formData.append("file", values.image[0]);
    const res = await fetch(process.env.UPLOAD_URL ?? "http://localhost:3000/api/upload", {
      method: "POST",
      body: formData,
    });
    console.log(await res.json());
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // if (id) {update({ ...values, id });} else {create({ ...values });}
  };

  const { isLoading } = trpc[router]["get"].useQuery(
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    { id: id ?? 0 },
    {
      enabled: !!id,
      onSuccess: (data) => {
        if (data) reset({ ...data });
      },
    }
  );
  const loading = isLoading && !!id;

  return (
    <div className="w-[28rem] py-10 px-5">
      <div className="mb-5 text-center">
        <h1 className="font-mono text-3xl font-bold text-neutral">{title}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <input type="text" className="hidden" autoFocus={true} />
        {fields.map((field: any) => {
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
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
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
        })}

        {/* <TextInput
          {...register("title")}
          label="Title"
          loading={loading}
          error={errors["title"]?.message?.toString()}
        />
        <DateInput
          control={control}
          name="date"
          label="Date"
          dateFormat="dd/MM/yyyy"
          loading={loading}
          error={errors["date"]?.message?.toString()}
        />
        <TextArea
          {...register("body")}
          label="Post Body"
          loading={loading}
          error={errors["body"]?.message?.toString()}
        />
        <Select
          {...register("categoryId")}
          label="Category"
          loading={loading}
          error={errors["categoryId"]?.message?.toString()}
        />

        <Checkbox
          {...register("published")}
          label="Published"
          error={errors["published"]?.message?.toString()}
        /> */}
        <div className="pt-4">
          <Button loading={isSubmitting} type="submit" disabled={isSubmitting}>
            {submitButtonText}
          </Button>
        </div>
        <div className="h-2"></div>
      </form>
    </div>
  );
};

export default EditForm;
