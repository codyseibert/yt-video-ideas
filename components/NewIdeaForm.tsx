import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { RotateSpinner } from "react-spinners-kit";

type Props = {
  setShowModal: (args: boolean) => void;
};

type Inputs = {
  title: string;
  description: string;
};

const NewIdeaForm = ({ setShowModal }: Props) => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const { data: session, status } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoadingStatus(true);
    const response = await axios.post("/api/create-idea", {
      title: data?.title,
      description: data?.description,
      authorImage: session?.user?.image,
      authorName: session?.user?.name,
    });
    reset();
    setLoadingStatus(false);
    setShowModal(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title:</label>
        <input
          type="text"
          placeholder="some great idea"
          className="border border-gray-300 p-2 w-full rounded-md"
          {...register("title", { required: true })}
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
            {...register("description", { required: true })}
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
            {loadingStatus ? (
              <RotateSpinner size={30} color="white" />
            ) : (
              <span>Create</span>
            )}
          </button>
        </div>
      </div>
    </form>
  );
};

export default NewIdeaForm;
