import { GoogleGenAI } from "@google/genai";
import { NewsArticle } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const fetchDailyNews = async (date: Date): Promise<NewsArticle[]> => {
  const dateString = date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  
  const systemInstruction = `
    You are the Chief Editor of "The Daily Chronicle" (每日纪事报), a prestigious, old-school newspaper. 
    Your goal is to produce a daily edition containing current real-world news in BOTH English and Chinese.
    
    Adhere to these rules:
    1.  Content must be written in a formal, journalistic, broadsheet style.
    2.  For Chinese (zh), use a formal, written style (书面语) suitable for a serious newspaper.
    3.  Avoid "clickbait". Use clear, descriptive, bold headlines.
    4.  Provide SUBSTANTIAL content. Each article should be between 150-300 words (English) or 250-500 characters (Chinese).
    5.  Categorize stories into: World, Politics, Finance, Technology, Science, or Sports.
    6.  Return the data strictly as a JSON array containing bilingual fields.
  `;

  const prompt = `
    Generate the front-page content for ${dateString}.
    Use Google Search to find the most important real news events happening right now or in the last 24 hours.
    
    Create 7 distinct articles:
    - 1 "Hero" story (The most important global event).
    - 2 Major stories.
    - 4 Minor stories (mix of Tech, Sports, Science).

    Format the output as a JSON object with a key "articles" containing an array of objects. 
    Do NOT use Markdown formatting in the response (no \`\`\`json). Just the raw JSON string.
    
    Schema for each article object:
    {
      "headline": { "en": "String", "zh": "String" },
      "subheadline": { "en": "String", "zh": "String" },
      "category": { "en": "String", "zh": "String" },
      "author": { "en": "String", "zh": "String" },
      "location": { "en": "String", "zh": "String" },
      "content": { "en": "String (full text)", "zh": "String (full text)" },
      "imageCaption": { "en": "String", "zh": "String" },
      "imagePrompt": "String (Description for image generation, English only)" 
    }
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        systemInstruction: systemInstruction,
        tools: [{ googleSearch: {} }],
        temperature: 0.3, 
      },
    });

    const text = response.text || "";
    
    // Cleanup: Sometimes models wrap in markdown despite instructions
    const cleanJson = text.replace(/```json/g, '').replace(/```/g, '').trim();
    
    let parsedData: { articles: any[] };
    try {
        parsedData = JSON.parse(cleanJson);
    } catch (e) {
        console.error("Failed to parse JSON directly, attempting regex extraction", e);
        const match = cleanJson.match(/\{[\s\S]*\}/);
        if (match) {
            parsedData = JSON.parse(match[0]);
        } else {
            throw new Error("Invalid JSON format received from Gemini");
        }
    }

    if (!parsedData.articles || !Array.isArray(parsedData.articles)) {
      throw new Error("Invalid data structure received");
    }

    return parsedData.articles.map((article: any, index: number) => ({
      id: `article-${index}-${Date.now()}`,
      headline: article.headline,
      subheadline: article.subheadline,
      category: article.category,
      author: article.author || { en: "Staff Writer", zh: "本报记者" },
      location: article.location || { en: "Unknown", zh: "未知" },
      content: article.content,
      isHero: index === 0,
      imageCaption: article.imageCaption,
      // Map category/index to a consistent picsum image to simulate relevant photos
      imageUrl: `https://picsum.photos/seed/${index + (article.category?.en || 'news') + dateString}/800/600` 
    }));

  } catch (error) {
    console.error("Error generating news:", error);
    // Fallback data in case of API failure to keep UI functional
    return [
      {
        id: 'error-1',
        headline: { en: 'Connection Interrupted', zh: '连接中断' },
        subheadline: { en: 'Newsroom Offline', zh: '编辑部离线' },
        category: { en: 'Technology', zh: '科技' },
        author: { en: 'System Admin', zh: '系统管理员' },
        location: { en: 'Server Room', zh: '服务器机房' },
        content: {
            en: "We are currently experiencing difficulties communicating with our foreign correspondents (The Gemini API). Please try refreshing the page in a few moments.\n\nJournalism never sleeps, but sometimes servers do.",
            zh: "我们目前在与前线记者（Gemini API）通讯时遇到困难。请稍后刷新页面再试。\n\n新闻永不眠，但服务器偶尔需要休息。"
        },
        isHero: true,
        imageUrl: 'https://picsum.photos/seed/error/800/600',
        imageCaption: { en: "Technical difficulties", zh: "技术故障" }
      }
    ];
  }
};