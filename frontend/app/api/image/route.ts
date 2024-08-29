import prisma from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const imageId = searchParams.get("id");

  if (!imageId) {
    return NextResponse.json({ error: "Missing image URL" }, { status: 400 });
  }

  try {
    const response = await prisma.image.findUnique({ where: { id: imageId } });
    if (!response) throw new Error("image not found");
    const contentType = response.content.slice(
      5,
      response.content.indexOf(";")
    );

    return new NextResponse(
      Buffer.from(
        response.content.slice(response.content.indexOf(",") + 1),
        "base64"
      ),
      {
        headers: {
          "Content-Type": contentType,
          "Cache-Control": "public, max-age=31536000, immutable",
        },
      }
    );
  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { error: "Error fetching image" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const { content } = await req.json();
    if (typeof content !== "string") {
      return NextResponse.json(
        { error: "Content must be a string" },
        { status: 400 }
      );
    }

    const img = await prisma.image.create({ data: { content } });

    return NextResponse.json({ id: img.id }, { status: 200 });
  } catch (error) {
    console.error("Error processing POST request:", error);
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
}
