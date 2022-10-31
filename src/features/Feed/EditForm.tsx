import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import TextInput from "../../core/components/Form/TextInput";
import Button from "../../core/components/LoadingButton";
import { trpc } from "../../utils/trpc";
const title = "Edit Post";

interface Props {
  id?: number;
}
const EditForm = ({ id }: Props) => {
  console.log(id);
  const defaultValues = {
    title: "",
    body: "",
    error: null,
  };
  const {
    register,
    reset,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues });

  const onSubmit = async (values: typeof defaultValues) => {
    try {
      console.log("edit");
      //   redirect: false

      //   await userStore.login(values);
    } catch (error: any) {
      toast.error(error.message);
    }
  };
  if (id) {
    const { data, isLoading } = trpc.feed.get.useQuery(
      { id },
      {
        onSuccess: (data) => {
          if (data) reset(data);
        },
      }
    );
  }

  return (
    <div className="w-[28rem] py-10 px-5 md:px-10">
      <div className="mb-5 text-center">
        <h1 className="font-mono text-3xl font-bold text-gray-900">{title}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <TextInput
          label="Post Title"
          {...register("title", {
            required: true,
          })}
          name="title"
          type="title"
          autoComplete="title"
          error={errors.title && "Το όνομα χρήστη είναι απαραίτητο"}
        />

        <TextInput
          label="Post Body"
          {...register("body", {
            required: true,
          })}
          name="body"
          type="body"
          autoComplete="body"
          error={errors.body && "Το όνομα χρήστη είναι απαραίτητο"}
        />

        <div className="pt-8">
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
