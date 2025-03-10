import { FaLanguage, FaFileAlt, FaGlobe, FaRocket } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div className="font-sans bg-white">
      {/* Navbar */}
      <nav className="bg-blue-600 text-white p-4 flex  justify-between items-center">
        <h1 className="lg:text-xl text-sm font-bold">AI Text Processor</h1>
        <div className="space-x-4 flex flex-row ">

          <Link to="/api" className='flex flex-row'>
          <div className='flex flex-row items-center justify-center gap-2 p-2 border-b-blue-200 border-[0.01rem] rounded'>
           
            <span className='hidden md:block lg:block'>Get Started</span>
            <FaRocket /> 
          <button className="">
          </button>
          </div>
        </Link>
        </div>
      </nav>
      
      {/* Hero Section */}
      <header className="h-screen bg-gradient-to-r from-blue-500 to-purple-600 text-white flex flex-col items-center justify-center text-center p-6">
        <h2 className="text-4xl font-bold mb-4"> AI-Powered Text Processing</h2>
        <p className="text-lg mb-6 max-w-xl">
          Detect languages, translate text, and summarize content instantly with our AI-driven tool.
        </p>
        <Link to="/api" className='flex flex-row'>
          <div className='flex flex-row items-center justify-center gap-2 p-2 border-b-blue-200 border-[0.01rem] rounded'>
           
            <span>Get Started</span>
            <FaRocket /> 
          <button className="">
          </button>
          </div>
        </Link>
      </header>
      
      {/* About Section */}
      <section id="about" className="p-10 text-center">
        <h3 className="text-3xl font-bold mb-6">What Our App Does</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-lg shadow-lg">
            <FaLanguage className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Language Detection</h4>
            <p>Automatically identify the language of any text input.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <FaGlobe className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Translation</h4>
            <p>Translate text between English, Portuguese, Spanish, Russian, Turkish, and French.</p>
          </div>
          <div className="p-6 border rounded-lg shadow-lg">
            <FaFileAlt className="text-4xl text-blue-600 mx-auto mb-4" />
            <h4 className="text-xl font-semibold mb-2">Summarization</h4>
            <p>Condense long texts into concise summaries while retaining key points.</p>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white text-center p-4 mt-10">
        <p>&copy; 2025 AI Text Processor. All rights reserved.</p>
      </footer>
    </div>
  );
}
