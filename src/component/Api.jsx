import { useState } from "react";

export default function Home() {
  const [inputText, setInputText] = useState("");
  const [messages, setMessages] = useState([]);
  const [detectedLang, setDetectedLang] = useState("");
  const [selectedLang, setSelectedLang] = useState("fr");

  async function handleSend() {
    if (!inputText.trim()) return;
    const newMessage = { text: inputText, type: "user" };
    setMessages([...messages, newMessage]);
    setInputText("");
    await detectLanguage(inputText);
  }

  async function detectLanguage(text) {
    try {
      const detector = await self.ai.languageDetector.create();
      const results = await detector.detect(text);
      if (results.length > 0) {
        setDetectedLang(results[0].detectedLanguage);
      }
    } catch (error) {
      console.error("Language detection failed", error);
    }
  }

  async function summarizeText(text) {
    try {
      const options = {
        sharedContext: "This is a general text",
        type: "key-points",
        format: "markdown",
        length: "medium",
      };
      const summarizer = await self.ai.summarizer.create(options);
      const summary = await summarizer.summarize(text);
      setMessages([...messages, { text: summary, type: "summary" }]);
    } catch (error) {
      console.error("Summarization failed", error);
    }
  }

  async function translateText(text) {
    try {
      const translator = await self.ai.translator.create({
        sourceLanguage: detectedLang,
        targetLanguage: selectedLang,
      });
      const translatedText = await translator.translate(text);
      setMessages([...messages, { text: translatedText, type: "translation" }]);
    } catch (error) {
      console.error("Translation failed", error);
    }
  }

  return (
    <div className="flex flex-col h-screen lg:p-2 rounded-2xl  bg-blue-950">
      <div className="flex-1 overflow-y-auto border rounded p-2 bg-blue-700">
        {messages.map((msg, index) => (
          <div  key={index} className={msg.type === "user" ? "text-right" : "text-left " }>
            <p className="p-1 bg-blue-500 inline-block md:p-2 lg:p-2  rounded w-[45%] text-[0.8rem] md:text-[1rem] text-justify lg:text-[1.2rem]">{msg.text}</p>
            {msg.type === "user" && detectedLang && <p className="text-[0.8rem] text-blue-300 p-2 md:p-2 md:text-[1rem] lg:text-[1.2rem ] w-full">Your Language is: {detectedLang}</p>}
            {msg.type === "user" && msg.text.length > 150 && (
              <button onClick={() => summarizeText(msg.text)} className="ml-2 bg-blue-500 text-white px-2 py-1 text-[0.6rem] rounded">Summarize</button>
            )}
            <div className="flex flex-col gap-1 items-end ">
            <select value={selectedLang} onChange={(e) => setSelectedLang(e.target.value)} className=" border-blue-400 border-[0.01rem]  md:p-2 md:text-[1rem] lg:text-[1.2rem ] w-[45%] text-blue-50 bg-blue-900 rounded m-1 text-[0.8rem] px-4 ">
              <option value="en">English</option>
              <option value="pt">Portuguese</option>
              <option value="es">Spanish</option>
              <option value="ru">Russian</option>
              <option value="tr">Turkish</option>
              <option value="fr">French</option>
            </select>
            <button onClick={() => translateText(msg.text)} className=" bg-blue-700 border-[0.01rem] border-blue-400 text-white hover:bg-blue-400 py-1 w-[45%] m-1   md:p-2 md:text-[1rem] lg:text-[1.2rem ] text-[0.6rem] rounded">Translate</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4  flex">
        <textarea
          className="flex-1 p-2 border-[0.01rem] border-blue-400 text-blue-50 rounded"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Type your text..."
        />
        <button onClick={handleSend} className="ml-2 bg-blue-700 hover:bg-blue-800 border-[0.01rem] border-blue-400  text-white p-2 rounded">Send</button>
      </div>
    </div>
  );
}
