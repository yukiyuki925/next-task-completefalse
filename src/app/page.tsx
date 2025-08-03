"use client";

import { useEffect, useState } from "react";
import { TaskType } from "@/types";

async function fetchAllTasks() {
  const res = await fetch(`http://localhost:3000/api/task`, {
    cache: "no-store",
  });
  const data = await res.json();
  return data.tasks;
}

const handleChange = async (
  task: TaskType,
  setTasks: (tasks: TaskType[]) => void
) => {
  await fetch(`http://localhost:3000/api/task/${task.id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ done: !task.done }),
  });
  const updated = await fetchAllTasks();
  setTasks(updated);
};

export default function Home() {
  const [tasks, setTasks] = useState<TaskType[]>([]);

  useEffect(() => {
    fetchAllTasks().then(setTasks);
  }, []);

  return (
    <>
      <div className="bg-white py-6 sm:py-8 lg:py-12">
        <div className="mx-auto max-w-screen-2xl px-4 md:px-8">
          <div className="mb-10 md:mb-16">
            <h2 className="mb-4 text-center text-2xl font-bold text-gray-800 md:mb-6 lg:text-3xl">
              Task
            </h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
            {tasks.map((task: TaskType) => (
              <div
                key={task.id}
                className="flex flex-col overflow-hidden rounded-lg border bg-white"
              >
                <div className="flex flex-1 flex-col p-4 sm:p-6">
                  <div className="flex items-center justify-between">
                    <h2 className="mb-2 text-lg font-semibold text-gray-800">
                      <a
                        href="#"
                        className="transition duration-100 hover:text-indigo-500 active:text-indigo-600"
                      >
                        {task.title}
                      </a>
                    </h2>
                    <div>
                      <input
                        type="checkbox"
                        checked={task.done}
                        onChange={() => handleChange(task, setTasks)}
                      />
                    </div>
                  </div>
                  <div className="mt-auto flex items-end justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-gray-400">期限</span>
                      <div>
                        <span className="block text-sm text-gray-400">
                          {new Date(task.createdAt).toLocaleString("ja-JP", {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
