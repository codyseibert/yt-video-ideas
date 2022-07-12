import axios from "axios";
import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
// import { signOut, useSession } from "next-auth/react";

type Props = {};

type Inputs = {
  title: string;
  description: string;
};

const CreateIdeaForm = (props: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>();

  // const { status } = useSession({ required: true });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const res = await axios.post("/api/ideas/create-idea", { data });
    reset();
  };

  return (
    <>
      <div>{/* <button onClick={() => signOut()}>Sign Out</button> */}</div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        >
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Title:
            </label>
            <input
              className="border border-gray-300 w-full p-2 rounded-md"
              {...register("title", { required: "Field is required" })}
            />
            {errors.title && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="username"
            >
              Description:
            </label>
            <textarea
              {...register("description", { required: "Field is required" })}
              className="border border-gray-300 w-full p-4 rounded-md"
            ></textarea>
            {errors.description && (
              <span className="text-red-400">This field is required</span>
            )}
          </div>

          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default CreateIdeaForm;
