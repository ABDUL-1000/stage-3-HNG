import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLang, setDetectedLang] = useState("");
  const [selectedLang, setSelectedLang] = useState("fr");
  const [showChat, setShowChat] = useState(false);

  const languageMap = {
    en: "English",
    fr: "French",
    es: "Spanish",
    pt: "Portuguese",
    ru: "Russian",
    tr: "Turkish",
    unknown: "Unknown",
  };

  async function handleTranslate() {
    if (!inputText.trim()) return;
    setShowChat(true);

    const newMessages = [...messages, { text: inputText, type: "user" }];
    setMessages(newMessages);
    setInputText("");

    const detected = await detectLanguage(inputText);
    if (detected) {
      setDetectedLang(languageMap[detected] || "Unknown");
      const translatedText = await translateText(inputText, detected, selectedLang);
      if (translatedText) {
        setMessages([...newMessages, { text: translatedText, type: "bot" }]);
      }
    }
  }

  async function handleSummarize() {
    if (!inputText.trim()) return;
    setShowChat(true);

    const newMessages = [...messages, { text: inputText, type: "user" }];
    setMessages(newMessages);
    setInputText("");

    const summary = await summarizeText(inputText);
    if (summary) {
      setMessages([...newMessages, { text: summary, type: "bot" }]);
    }
  }

  async function detectLanguage(text) {
    try {
      const detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      return results.length > 0 ? results[0].detectedLanguage : "unknown";
    } catch (error) {
      console.error("Language detection failed", error);
      return "unknown";
    }
  }

  async function translateText(text, sourceLang, targetLang) {
    try {
      const translator = await self.ai.translator.create({ sourceLanguage: sourceLang, targetLanguage: targetLang });
      return await translator.translate(text);
    } catch (error) {
      console.error("Translation failed", error);
      return "";
    }
  }

  async function summarizeText(text) {
    try {
      const summarizer = await self.ai.summarizer.create();
      return await summarizer.summarize(text);
    } catch (error) {
      console.error("Summarization failed", error);
      return "";
    }
  }

  return (
    <div className="flex flex-col h-screen lg:w-[70%] p-2 rounded-2xl bg-blue-950">
      {showChat && (
        <div className="flex-1 overflow-y-auto border rounded p-2 bg-blue-700">
          {messages.map((msg, index) => (
            <div key={index} className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"} my-2`}>
              <p className={`p-2 rounded w-[45%] text-[0.9rem] md:text-[1rem] lg:text-[1.2rem] ${msg.type === "user" ? "bg-blue-500 text-white" : "bg-green-500 text-black"}`}>
                {msg.text}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="mt-4 flex flex-col items-end ">
        <p className="text-blue-300 text-[0.8rem] sm:text-2xl text-center lg:text-2xl mb-2 w-full">
          Tell me what you’d like me to translate or summarize!
        </p>

        {detectedLang && (
          <p className="text-green-300 text-lg text-center mb-2">Detected Language: {detectedLang}</p>
        )}

        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border-blue-400 border-[0.01rem] p-2 bg-blue-900 w-full lg:w-[30%] sm:w-[50%] text-white rounded mb-2"
        >
          <option value="en">English</option>
          <option value="fr">French</option>
          <option value="es">Spanish</option>
          <option value="pt">Portuguese</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
        </select>

        <div className="flex w-full">
          <textarea
            className="flex-1 p-2 border-[0.01rem] border-blue-400 text-blue-50 rounded"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault(); // Prevents adding a new line
                inputText.length > 150 ? handleSummarize() : handleTranslate();
              }
            }}
            placeholder="Type your text..."
          />
        </div>

        {inputText.length > 150 ? (
          <div className="flex space-x-2 mt-2">
            <button
              onClick={handleSummarize}
              className="bg-blue-950 hover:bg-blue-800  border-[0.01rem] border-blue-400 text-white p-2 rounded"
            >
              Summarize
            </button>
            <button
              onClick={handleTranslate}
              className="bg-blue-950 hover:bg-blue-800  border-[0.01rem] border-blue-400 text-white p-2 rounded"
            >
              Translate
            </button>
          </div>
        ) : (
          <button
            onClick={handleTranslate}
            className="mt-2 bg-blue-950 hover:bg-blue-800 border-[0.01rem] border-blue-400 text-white p-2 rounded"
          >
            Translate
          </button>
        )}
      </div>
    </div>
  );
}