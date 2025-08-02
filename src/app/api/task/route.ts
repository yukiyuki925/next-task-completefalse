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

// 全タスク取得API
export const GET = async () => {
  try {
    await main();
    const tasks = await prisma.task.findMany();
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
