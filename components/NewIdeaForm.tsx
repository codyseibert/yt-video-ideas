import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { useForm, SubmitHandler } from "react-hook-form";
import axios from "axios";
import { RotateSpinner } from "react-spinners-kit";
import { categories, Category } from "../data/ideaCategory";
import { createIdea } from "../api/createIdea";

type Inputs = {
  title: string;
  description: string;
  category: Category
};

const NewIdeaForm = ({ onIdeaCreated, setShowModal }: {
  setShowModal: (args: boolean) => void;
  onIdeaCreated: () => void
}) => {
  const [loadingStatus, setLoadingStatus] = useState<boolean>(false);
  const { data: session } = useSession();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    setLoadingStatus(true);
    await createIdea({
      title: data?.title,
      description: data?.description,
      category: data?.category,
    }, {
      image: session?.user?.image,
      name: session?.user?.name,
    })
    reset();
    setLoadingStatus(false);
    setShowModal(false);
    onIdeaCreated();
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

        <div className="mt-4">
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

        <div className="mb-4  mt-2">
          <label htmlFor="category">Category:</label>
          <select
            {...register("category", { required: true })}
            className=" border border-gray-300 p-2 w-full rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((option, index) => (
              <option value={option?.value} key={index}>
                {option?.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <span className="text-red-300">This field is required</span>
          )}
        </div>

        <div className="flex justify-end gap-4">
          <button
            disabled={loadingStatus}
            onClick={() => setShowModal(false)}
            className="bg-red-400 disabled:hover:cursor-not-allowed disabled:bg-gray-300 hover:bg-red-500 text-white rounded-md py-2 px-8"
          >
            Cancel
          </button>

          <button
            disabled={loadingStatus}
            type="submit"
            className="bg-blue-400 disabled:hover:cursor-not-allowed disabled:bg-gray-300 hover:bg-blue-500 text-white rounded-md py-2 px-8"
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
