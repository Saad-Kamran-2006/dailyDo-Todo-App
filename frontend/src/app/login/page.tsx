"use client";

// import { login_user } from "@/actions/auth_actions";
import { useForm, SubmitHandler } from "react-hook-form";
import { Inputs } from "../../../types";
// import toast from "react-hot-toast";
export default function ReactForm() {
  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  console.log(errors);

  const onSubmit: SubmitHandler<Inputs> = async (data: Inputs) => {
    // await new Promise((r) => setTimeout(r, 2000));
    console.log(data);
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({ username: data.name, password: data.password }),
    });
    // const response = await login_user(data.name, data.password);
    // if (response.status === "success") {
    //   // toast.success(response.message);
    // } else if (response.status === "error") {
    //   toast.error(response.message);
    // }
    reset();
    // send to server
  };

  return (
    <main className="flex justify-center items-center h-screen bg-gradient-to-r from-teal-400 to-blue-500">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white px-10 py-8 shadow-lg rounded-lg max-w-sm w-full flex flex-col space-y-6"
      >
        <h1 className="text-4xl font-extrabold text-gray-800 text-center">
          Sign Up
        </h1>

        {/* Name Field */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700"
          >
            Name
          </label>
          <input
            {...register("name", {
              minLength: { value: 3, message: "Minimum 3 characters" },
              required: true,
              maxLength: 20,
            })}
            type="text"
            id="name"
            placeholder="Your name"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-2"
          />
          {errors.name && (
            <p className="text-red-600 text-xs mt-1">{errors.name.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700"
          >
            Password
          </label>
          <input
            {...register("password", {
              required: true,
              // minLength: 8,
              // pattern: {
              //   value:
              //     /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              //   message:
              //     "must be 1 lowercase, 1 uppercase, 1 digit and 1 special character",
              // },
            })}
            type="password"
            id="password"
            placeholder="Your password"
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm p-2"
          />
          {errors.password && (
            <p className="text-red-600 text-xs mt-1">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-teal-500 text-white font-semibold p-2 rounded-md shadow-md hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50 transition-opacity duration-150 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : "opacity-100"
          }`}
        >
          Sign Up
        </button>
      </form>
    </main>
  );
}
