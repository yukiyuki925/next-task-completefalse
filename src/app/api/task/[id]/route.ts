import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";
import { main } from "../route";

const prisma = new PrismaClient();

// タスクの状態更新
export const PATCH = async (req: Request) => {
  try {
    const id = Number(req.url.split("/task/")[1]);
    const { done } = await req.json();
    await main();
    const updatedTask = await prisma.task.update({
      where: { id },
      data: { done },
    });
    return NextResponse.json(
      { message: "Success", task: updatedTask },
      { status: 200 }
    );
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};

// ブログの詳細記事取得API
export const GET = async (req: Request) => {
  try {
    const id: number = parseInt(req.url.split("/task/")[1]);
    await main();
    const post = await prisma.task.findFirst({ where: { id } });
    return NextResponse.json({ message: "Success", post }, { status: 200 });
  } catch (err) {
    return NextResponse.json({ message: "Error", err }, { status: 500 });
  } finally {
    await prisma.$disconnect();
  }
};
