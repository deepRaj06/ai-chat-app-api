import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = process.env.GEMINI_API_KEY;
const genAI = new GoogleGenerativeAI(apiKey);

export async function POST(req) {
  try {
    const { question } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const result = await model.generateContent(question);

    const answerText = result.response.text();

    return NextResponse.json({ answer: answerText });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
