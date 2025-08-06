"use client";

import { useRef } from "react";
import { useRouter } from "next/navigation";
import { ToastContainer, toast } from "react-toastify";

const editTask = async (
  title: string | undefined,
  createdAt: Date | undefined
) => {
  const res = await fetch(`http://localhost:3000/api/task`, {
    method: "PUT",
    body: JSON.stringify({ title, done: false, createdAt }),
    headers: {
      "Content-Type": "application/json",
    },
  });
  return res.json();
};

const EditTask = () => {
  const router = useRouter();
  const titleRef = useRef<HTMLInputElement | null>(null);
  const dateRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const createdAtValue = dateRef.current?.value
      ? new Date(dateRef.current.value)
      : undefined;
    toast.loading("作成中です");
    await editTask(titleRef.current?.value, createdAtValue);
    router.push("/");
    router.refresh();
  };

  return (
    <>
      <ToastContainer />
      <div className="mx-auto mt-10 max-w-xl min-h-screen ">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="mb-1 block text-sm font-medium text-red-600-700">
              タイトル
            </label>
            <input
              ref={titleRef}
              type="text"
              id="title"
              className="px-2 py-2 block w-full rounded-md border-gray-800 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <div>
            <label className="mb-1 block text-sm font-medium text-gray-700">
              期限
            </label>
            <input
              ref={dateRef}
              type="datetime-local"
              id="deadline"
              className="px-2 py-2 block w-full rounded-md border-gray-800 shadow-sm focus:border-blue-400 focus:ring focus:ring-blue-200 focus:ring-opacity-50 disabled:cursor-not-allowed disabled:bg-gray-50 disabled:text-gray-500"
            />
          </div>
          <button className="rounded-lg border border-blue-500 bg-blue-500 px-5 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:border-blue-700 hover:bg-blue-700 focus:ring focus:ring-blue-200 disabled:cursor-not-allowed disabled:border-blue-300 disabled:bg-blue-300">
            作成
          </button>
        </form>
      </div>
    </>
  );
};

export default EditTask;
