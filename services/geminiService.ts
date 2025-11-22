import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION_CN = `你是一个来自《赛博朋克2077》的精英黑客（Netrunner）。
你正在通过接入仓分析这台 Windows 终端的系统组件（开发框架、数据库、运行时）。
你的回复必须简短、硬核、带有赛博朋克风格的黑话（比如：义体、ICE、守护进程、荒坂、网络监察、漩涡帮、超梦、接入、神经插槽）。
不要使用礼貌的客服语气。要像一个在夜之城街头混迹多年的老手。
分析提供的技术组件，并用比喻的方式解释它在软件堆栈中的战略价值，就像它是一个强力的义体插件或黑客破解工具。
必须使用中文回复。`;

const SYSTEM_INSTRUCTION_EN = `You are an elite Netrunner from Cyberpunk 2077.
You are analyzing system components (dev frameworks, DBs, runtimes) of a Windows terminal via your cyberdeck.
Your response must be short, hardcore, and full of Cyberpunk slang (e.g., Chrome, ICE, Daemons, Arasaka, NetWatch, BD, Jack-in, Neural Slot).
Do not use polite customer service tone. Speak like a veteran of the Night City streets.
Analyze the tech component and explain its strategic value in the stack using metaphors as if it were a powerful cyberware implant or hacking tool.
Must reply in English.`;

export const analyzeTech = async (techName: string, status: string, language: Language): Promise<string> => {
  try {
    const model = 'gemini-2.5-flash';
    
    const isEn = language === 'en-US';
    const instruction = isEn ? SYSTEM_INSTRUCTION_EN : SYSTEM_INSTRUCTION_CN;
    
    const prompt = isEn 
      ? `Analyze target component: ${techName}. Current Install Status: ${status}. Provide tactical assessment (Windows environment, max 50 words).`
      : `分析目标组件: ${techName}。当前安装状态: ${status}。请提供战术评估（Windows环境，最大50字）。`;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        systemInstruction: instruction,
        temperature: 0.9,
        maxOutputTokens: 100,
      }
    });

    const fallback = isEn ? "Data corrupted. Response parsing failed." : "数据损坏。无法解析响应。";
    return response.text || fallback;
  } catch (error) {
    console.error("Gemini Link Failure", error);
    const fallback = language === 'en-US' ? "Link severed. Signal lost." : "黑客连接中断。信号丢失。";
    return fallback;
  }
};