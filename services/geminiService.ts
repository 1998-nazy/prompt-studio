import { GoogleGenAI } from "@google/genai";

export const generatePromptFromText = async (inputText: string, toolType: string): Promise<string> => {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  const model = 'gemini-3-flash-preview';
  let systemInstruction = "You are an expert AI prompt engineer. Your goal is to take Persian (Farsi) input and convert it into a concise, professional English prompt suitable for AI image generators. Keep it short and focused strictly on the main visual details. CRITICAL RULE: When specifying age, ALWAYS use the format 'a [gender/person] in age [number written as word]' (e.g., 'a girl in age seven'). Never use '7-year-old'. Output ONLY the English prompt.";

  if (toolType === 'text-refiner') {
    systemInstruction += " Focus on clarity and cinematic quality.";
  } else if (toolType === 'character') {
    systemInstruction += " Focus on consistent facial features and unique identity markers.";
  } else if (toolType === 'stylist') {
    systemInstruction += " Focus on fabric textures, fashion style, and lighting.";
  } else if (toolType === 'smart-editor') {
    systemInstruction += " Focus on modification instructions relative to an existing scene.";
  }

  try {
    const response = await ai.models.generateContent({
      model,
      contents: inputText,
      config: {
        systemInstruction,
        temperature: 0.8,
      }
    });
    return response.text || "هیچ خروجی تولید نشد.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "خطا در برقراری ارتباط با هوش مصنوعی. لطفا دوباره تلاش کنید.";
  }
};

export const generateTransformationPrompt = async (beforeImage: File, afterImage: File): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const model = 'gemini-3-flash-preview';
    const systemInstruction = "You are an expert AI prompt engineer. Analyze the two images provided (Before and After). Identify the specific artistic transformation, stylistic changes, and additions made to move from the 'Before' image to the 'After' image. Create a concise, professional English prompt that would achieve this transformation. Output ONLY the English prompt.";

    try {
        const beforeData = await fileToGenerativePart(beforeImage);
        const afterData = await fileToGenerativePart(afterImage);
        
        const response = await ai.models.generateContent({
            model,
            contents: {
                parts: [
                    { inlineData: { data: beforeData, mimeType: beforeImage.type } },
                    { inlineData: { data: afterData, mimeType: afterImage.type } },
                    { text: "What is the transformation prompt to get from the first image to the second?" }
                ]
            },
            config: { systemInstruction }
        });
        return response.text || "Transformation analysis failed.";
    } catch (error) {
        console.error("Gemini Analysis Error:", error);
        return "Failed to analyze transformation.";
    }
}

export const generatePromptFromImage = async (imageFile: File, contextText: string, toolType: string): Promise<string> => {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    let specificInstruction = "";
    switch (toolType) {
        case 'character':
            specificInstruction = "Focus heavily on extracting the physical characteristics, facial features, and biometric identity of the subject. Ignore background.";
            break;
        case 'stylist':
            specificInstruction = "Focus on the fashion, clothing items, fabric textures, and styling details. Treat the person as a mannequin.";
            break;
        case 'smart-editor':
            specificInstruction = "Analyze the image composition to identify which parts need to be changed based on the user request.";
            break;
        default:
            specificInstruction = "Provide a detailed, cinematic visual description of the image.";
    }

    try {
        const base64Data = await fileToGenerativePart(imageFile);
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: {
                parts: [
                    { inlineData: { data: base64Data, mimeType: imageFile.type } },
                    { text: `Analyze the uploaded image with this specific goal: ${specificInstruction}\nUser Context: "${contextText}".\n\nRules:\n1. If the context implies using the image as a reference:\n   - Follow the specific goal strictly.\n   - Refine the description based on the User Context.\n2. CRITICAL: When specifying age, ALWAYS use 'a [gender] in age [number word]'.\n3. Output ONLY the English prompt.` }
                ]
            }
        });
        return response.text || "خروجی تولید نشد.";
    } catch (error) {
        console.error("Gemini Vision Error:", error);
        return "خطا در تحلیل تصویر.";
    }
}

async function fileToGenerativePart(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64String = reader.result as string;
            const base64Data = base64String.split(',')[1];
            resolve(base64Data);
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
    });
}