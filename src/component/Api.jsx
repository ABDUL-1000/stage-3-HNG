import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLang, setDetectedLang] = useState("");
  const [selectedLang, setSelectedLang] = useState("fr");
  const [showChat, setShowChat] = useState(false); // Hide chat initially

  async function handleTranslate() {
    if (!inputText.trim()) return;

    setShowChat(true); // Show chat when translating for the first time

    // Add user message to chat
    const newMessages = [...messages, { text: inputText, type: "user" }];
    setMessages(newMessages);
    setInputText("");

    // Detect Language
    const detected = await detectLanguage(inputText);
    if (detected) {
      setDetectedLang(detected);
      const translatedText = await translateText(inputText, detected, selectedLang);
      if (translatedText) {
        setMessages([...newMessages, { text: translatedText, type: "bot" }]); // Add translation to chat
      }
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

  return (
    <div className="flex flex-col h-screen lg:w-[70%] lg:p-2 rounded-2xl bg-blue-950">
      {/* Chat Area (Hidden by default) */}
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

      {/* Input and Translate Button */}
      <div className="mt-4 flex flex-col items-end">
        {/* Prompt Text */}
        <p className="text-blue-300 text-lg mb-2 text-left w-full">
          Tell me what you’d like me to translate or summarize!
        </p>

        <select
          value={selectedLang}
          onChange={(e) => setSelectedLang(e.target.value)}
          className="border-blue-400 border-[0.01rem] p-2 bg-blue-900 text-white rounded mb-2"
        >
          <option value="en">English</option>
          <option value="pt">Portuguese</option>
          <option value="es">Spanish</option>
          <option value="ru">Russian</option>
          <option value="tr">Turkish</option>
          <option value="fr">French</option>
        </select>

        <div className="flex w-full">
          <textarea
            className="flex-1 p-2 border-[0.01rem] border-blue-400 text-blue-50 rounded"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your text..."
          />
          <button
            onClick={handleTranslate}
            className="ml-2 bg-blue-700 hover:bg-blue-800 border-[0.01rem] border-blue-400 text-white p-2 rounded"
          >
            Translate
          </button>
        </div>
      </div>
    </div>
  );
}
