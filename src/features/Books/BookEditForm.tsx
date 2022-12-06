import { useForm } from "react-hook-form";
import Button from "@/core/components/LoadingButton";
import { trpc } from "@/utils/trpc";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
// import { createSchema } from "@/types/zod/feed";
import { notify } from "@/utils/notify";
import { useModalStore } from "@/core/stores/modalStore";
import { AppRouterForOptions } from "@/server/trpc/router/_app";
import { createSchema, CreateSchemaType } from "@/types/zod/feed";
import { uploadFile } from "@/utils/uploadFile";
import EditFormFields from "@/core/components/Table/EditFormFields";
import { useRef } from "react";
import { deleteFile } from "@/utils/deleteFile";

// text of messages and labels
const title = "Edit Post";
const createMessage = "Successfuly created!";
const editMessage = "Successfuly updated!";
const submitButtonText = "SUBMIT";

// router and procedures
const router = "feed";
const getAllprocedure = "getAll";
const getProcedure = "get";
const createProcedure = "create";
const updateProcedure = "update";

const fields: {
  name: string;
  type: "text" | "textarea" | "file" | "select" | "date" | "checkbox";
  label: string;
  default: any;
  router?: AppRouterForOptions;
}[] = [
  { name: "title", type: "text", label: "Title", default: "" },
  { name: "body", type: "textarea", label: "Body", default: "" },
  {
    name: "categoryId",
    type: "select",
    label: "Category",
    default: "",
    router: "postCategory",
  },
  { name: "date", type: "date", label: "Date", default: new Date() || null },
  { name: "published", type: "checkbox", label: "Published", default: false },
  { name: "image", type: "file", label: "Image", default: "" },
];

interface Props {
  id?: number;
}

const EditForm = ({ id }: Props) => {
  

  const defaultValues: CreateSchemaType & { error: any } = {
    title: "",
    body: "",
    categoryId: "",
    date: null,
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

  const previousFileField = useRef<string | null>();

  const { closeModal } = useModalStore();

  const utils = trpc.useContext();

  const { mutate: create } = trpc[router][createProcedure].useMutation({
    onSuccess() {
      utils[router][getAllprocedure].invalidate();
      notify({ message: createMessage, type: "success" });
      closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const { mutate: update } = trpc[router][updateProcedure].useMutation({
    onSuccess() {
      utils[router][getAllprocedure].invalidate();
      utils[router][getProcedure].invalidate();
      notify({ message: editMessage, type: "success" });
      //   closeModal();
    },
    onError(error) {
      notify({ message: error.message, type: "error" });
    },
  });

  const onSubmit = async (values: CreateSchemaType) => {
    try {
      const fileField = fields.find((field: any) => field.type === "file");
      if (
        fileField &&
        fileField.name &&
        values.hasOwnProperty(fileField.name) &&
        typeof values[fileField.name as keyof CreateSchemaType] === "object"
      ) {
        const fileFieldName = fileField.name;
        const fileUrl = await uploadFile({ values, fileFieldName });
        if (previousFileField.current) {
          try {
            await deleteFile({filename: previousFileField.current});
          } catch (error: any) {
            notify({ message: error.message, type: "error" });
          }
        }
        if (id) {
          update({ ...values, id, [fileFieldName]: fileUrl });
        } else {
          create({ ...values, [fileFieldName]: fileUrl });
        }
      } else {
        if (id) {

          update({ ...values, id });
        } else {
          create({ ...values });
        }
      }
    } catch (error: any) {
      notify({ message: error.message, type: "error" });
    }
  };

  const { isLoading } = trpc[router][getProcedure].useQuery(
    { id: (id as number) ?? 0 },
    {
      enabled: !!id,
      refetchOnMount: false,
      refetchOnWindowFocus: false,
      refetchOnReconnect: false,        
      onSuccess: (data) => {
        const file = fields.find((field: any) => field.type === "file");
        if (data && file)
          previousFileField.current = data[
            file.name as keyof CreateSchemaType
          ] as string;
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
        <EditFormFields
          fields={fields}
          register={register}
          control={control}
          errors={errors}
          getValues={getValues}
          loading={loading}
        />

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