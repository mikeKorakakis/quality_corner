import clsx from "clsx";
import * as React from "react";
import { useForm } from "react-hook-form";
import Checkbox from "../core/components/Form/Checkbox";
import ModalContainer from "../core/components/Layout/Modal/ModalContainer";
import EditForm from "./../features/Feed/EditForm";
import TextInput from "./../core/components/Form/TextInput";
import DateInput from "./../core/components/Form/DateInput";
import Select from "./../core/components/Form/Select";
import Button from "./../core/components/LoadingButton";
import TextArea from "./../core/components/Form/TextArea";
import { trpc } from "../utils/trpc";

export default function Index4() {
  const [open, setOpen] = React.useState(false);
  const handleChange = (evt: any) => {
    if (!evt.target.checked) setOpen(false);
  };

  const closeModal = () => {
    setOpen(false);
  };
  const id = "md-1";
  return (
    <>
      {/* <button className="bnt-primary btn" onClick={() => setOpen(true)}>
        open
      </button>
      <input
        type="checkbox"
        id={id}
        className="modal-toggle"
        checked={open}
        onChange={handleChange}
      />
      <label htmlFor={id} className="modal ">
        <label className={clsx("modal-box relative max-w-5xl ")}> */}
          <NewComp  />
          {/* <EditForm id={1001} /> */}
        {/* </label>
      </label>
    </> */}
    </>
  );
}

const Comp = () => {
    return <div>hello</div>
}

const NewComp = ({ id }: { id?: number }) => {
  const defaultValues = {
    title: "",
    body: "",
    categoryId: "cl9zkducr0000uzpcvhj1jezy",
    date: new Date() || null,
    published: false,
    image: "",
    error: "dfffd",
  };
  
// calculate first render

  const {
    register,
    reset,
    control,
    getValues,
    formState: { errors, isSubmitting },
    handleSubmit,
  } = useForm({ defaultValues, mode: "onBlur", reValidateMode: "onChange" });
  const onSubmit = (data: any) => {
    console.log(data);
  };


  const { isLoading } = trpc.feed.get.useQuery(
    { id: id ?? 0 },
    {
      enabled: !!id,
      refetchOnWindowFocus: false,
      onSuccess: (data) => {
        if (data) reset({ ...data });
      },
    }
  );


  if (isLoading && id  ) return <div>Loading...</div>;
  return (
    <div className="w-[28rem] py-10 px-5">
      <div className="mb-5 text-center">
        <h1 className="font-mono text-3xl font-bold text-neutral">{"title"}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-1">
        <input type="text" className="hidden"  autoFocus={true} />
        <TextInput
         autoFocus={true}
          label="Title"
          {...register("title")}
          //   error={errors.title?.message}
        />
        <DateInput
          name="date"
          label="Date"
          dateFormat="dd/MM/yyyy"
          control={control}
          // //   error={errors.date?.message}
        />
        <TextArea
          {...register("body")}
          label="Post Body"
          // //   error={errors.body?.message}
        />
        <Select
          {...register("categoryId")}
          label="Category"
          // //   error={errors.categoryId?.message}
        />

        <Checkbox
          label="Published"
          {...register("published")}
          value={"published"}
          // //   error={errors.published?.message}
        />
        {/* {<i>{JSON.stringify(getValues(), null, 2)}</i>} */}
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

NewComp.displayName = "NewComp";
