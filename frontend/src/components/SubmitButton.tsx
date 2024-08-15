import { useFormStatus } from "react-dom";

const SubmitButton = () => {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className={`px-2 py-1 bg-teal-600 text-white ${
        pending ? "cursor-not-allowed bg-opacity-80" : ""
      } rounded-md w-full`}
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
};

export default SubmitButton;
