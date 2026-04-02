import { GoogleGenAI } from "@google/genai";
import fs from "fs";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

async function generate() {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash-image',
      contents: {
        parts: [
          {
            text: 'A realistic image of a DaVinci Resolve timeline with complex nodes and a video preview, suitable for a professional portfolio.',
          },
        ],
      },
    });

    for (const part of response.candidates[0].content.parts) {
      if (part.inlineData) {
        const base64EncodeString = part.inlineData.data;
        const buffer = Buffer.from(base64EncodeString, 'base64');
        fs.writeFileSync('./public/davinci-resolve.png', buffer);
        console.log('Image saved to public/davinci-resolve.png');
        return;
      }
    }
  } catch (error) {
    console.error('Error generating image:', error);
  }
}

generate();
