import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";

type Props = {
  setShowModal: (args: boolean) => void;
};

type Inputs = {
  title: string;
  description: string;
};

const NewIdeaForm = ({ setShowModal }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit = () => {};
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="some great idea"
          className="border border-gray-300 p-2 w-full rounded-md"
          {...register("title", { required: "Title is required" })}
        />
        {errors.title && (
          <span className="text-red-300">This field is required</span>
        )}

        <div className="my-4">
          <label htmlFor="description">Description:</label>
          <textarea
            placeholder="kindly describe your awesome idea which will probably take us to the moon 🚀🚀🚀"
            className="border border-gray-300 p-2 w-full rounded-md"
            rows={5}
            {...register("description", { required: "Title is required" })}
          ></textarea>
          {errors.description && (
            <span className="text-red-300">This field is required</span>
          )}
        </div>

        <div className="flex gap-4">
          <button
            onClick={() => setShowModal(false)}
            className="bg-red-400 hover:bg-red-500 text-white rounded-md py-2 px-8"
          >
            Cancel
          </button>

          <button
            type="submit"
            className="bg-blue-400 hover:bg-blue-500 text-white rounded-md py-2 px-8"
          >
            submit
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewIdeaForm;
