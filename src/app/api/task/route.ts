import { PrismaClient } from "@/generated/prisma";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function main() {
  try {
    await prisma.$connect();
  } catch (err) {
    console.error(err);
    return new Error("DB接続に失敗しました");
  }
}

// タスク取得API
export const GET = async () => {
  try {
    await main();
    const tasks = await prisma.task.findMany({ where: { done: false } });
    return NextResponse.json({ message: "Success", tasks }, { status: 200 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error", error: String(err) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};

// タスク作成API
export const POST = async (req: Request) => {
  try {
    const { title, done, createdAt } = await req.json();
    await main();
    const tasks = await prisma.task.create({
      data: { title, done, createdAt: new Date(createdAt) },
    });
    return NextResponse.json({ message: "Success", tasks }, { status: 201 });
  } catch (err) {
    return NextResponse.json(
      { message: "Error", error: String(err) },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
};
