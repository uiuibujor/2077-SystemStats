import { GoogleGenAI } from "@google/genai";
import { Language } from "../types";
import { STATIC_ANALYSIS_DATA } from "../constants";

const apiKey = process.env.API_KEY || '';

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

export const analyzeTech = async (techName: string, status: string, language: Language): Promise<{text: string, isOffline?: boolean}> => {
  const isEn = language === 'en-US';
  
  try {
    // If no key is provided or key is empty, throw immediately to trigger fallback
    if (!apiKey || apiKey.trim() === '') {
      throw new Error("API Key missing");
    }

    const ai = new GoogleGenAI({ apiKey });
    const model = 'gemini-2.5-flash';
    
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

    if (response.text) {
        return { text: response.text, isOffline: false };
    }
    throw new Error("Empty response");

  } catch (error) {
    console.warn("Gemini Link Failure - Switching to Local DB", error);
    
    // Offline Fallback Logic
    const lowerName = techName.toLowerCase();
    
    // Search for a partial match in our static DB keys
    const matchedKey = Object.keys(STATIC_ANALYSIS_DATA).find(k => lowerName.includes(k));
    
    if (matchedKey) {
        return { text: STATIC_ANALYSIS_DATA[matchedKey][language], isOffline: true };
    }

    const fallback = isEn 
        ? "Encrypted Protocol. No local intel available. Connection severed." 
        : "加密协议。本地情报库无记录。连接已中断。";
    return { text: fallback, isOffline: true };
  }
};