
import React, { useState, useEffect, useRef } from 'react';

// Define SpeechRecognition interface for TypeScript
interface SpeechRecognition extends EventTarget {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  start(): void;
  stop(): void;
  onstart: () => void;
  onend: () => void;
  onerror: (event: any) => void;
  onresult: (event: any) => void;
}

declare global {
  interface Window {
    // FIX: Correctly type SpeechRecognition and webkitSpeechRecognition as constructors.
    // The original code used `typeof SpeechRecognition`, which is invalid because `SpeechRecognition`
    // is an interface (a type) and not a value. The `typeof` operator requires a value.
    // The correct way to type a constructor is with a construct signature, like `new (): Type`.
    SpeechRecognition: new () => SpeechRecognition;
    webkitSpeechRecognition: new () => SpeechRecognition;
  }
}

const MicrophoneIcon = ({ isListening }: { isListening: boolean }) => (
  <svg className={`h-8 w-8 text-white ${isListening ? 'animate-pulse' : ''}`} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 1a3 3 0 00-3 3v8a3 3 0 006 0V4a3 3 0 00-3-3z" />
    <path d="M19 10v2a7 7 0 01-14 0v-2H3v2a9 9 0 008 8.94V24h2v-3.06A9 9 0 0021 12v-2h-2z" />
  </svg>
);

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);


interface BantyAssistantProps {
  onSearch: (searchTerm: string) => void;
  filteredProductsCount: number | null;
  onCantFind: () => void;
}

const BantyAssistant: React.FC<BantyAssistantProps> = ({ onSearch, filteredProductsCount, onCantFind }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [statusText, setStatusText] = useState('How can I help you find a product or service?');
  const [showNotFound, setShowNotFound] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const searchAttemptedRef = useRef(false);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = 'en-US';

      recognition.onstart = () => {
        setIsListening(true);
        setStatusText('Listening...');
        setShowNotFound(false);
        searchAttemptedRef.current = false;
      };

      recognition.onresult = (event) => {
        let interimTranscript = '';
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; ++i) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          } else {
            interimTranscript += event.results[i][0].transcript;
          }
        }
        setStatusText(interimTranscript || 'Listening...');
        if (finalTranscript) {
          console.log("Final Transcript:", finalTranscript);
          searchAttemptedRef.current = true;
          onSearch(finalTranscript.trim());
        }
      };

      recognition.onerror = (event) => {
        console.error("Speech recognition error", event.error);
        if (event.error === 'no-speech') {
            setStatusText('I didn\'t hear that. Please try again.');
        } else if (event.error === 'not-allowed') {
            setStatusText('Please allow microphone access to use voice search.');
        } else {
            setStatusText('Sorry, something went wrong. Please try again.');
        }
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    } else {
      console.warn("Speech Recognition not supported in this browser.");
    }
  }, [onSearch]);
  
  useEffect(() => {
      // This effect checks for the result of a search *after* it has been attempted
      if (!isListening && searchAttemptedRef.current && filteredProductsCount === 0) {
          setShowNotFound(true);
      }
  }, [isListening, filteredProductsCount]);

  const toggleListen = () => {
    if (!recognitionRef.current) {
        setStatusText('Sorry, voice search is not supported on your browser.');
        return;
    }
    if (isListening) {
      recognitionRef.current.stop();
    } else {
      recognitionRef.current.start();
    }
  };

  const openModal = () => {
      setIsModalOpen(true);
      setStatusText('How can I help you find a product or service?');
      setShowNotFound(false);
      searchAttemptedRef.current = false;
  }

  const closeModal = () => {
      if(isListening) {
        recognitionRef.current?.stop();
      }
      setIsModalOpen(false);
  }
  
  const handleCantFindClick = () => {
      onCantFind();
      closeModal();
  }

  return (
    <>
      <button
        onClick={openModal}
        className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-4 shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-transform transform hover:scale-110 z-50 animate-pulse"
        aria-label="Open Banty Voice Assistant"
      >
        <MicrophoneIcon isListening={false} />
      </button>

      {isModalOpen && (
        <div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 animate-fade-in"
            onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg shadow-xl w-full max-w-md m-4 transform animate-zoom-in text-center p-8 relative" 
            onClick={e => e.stopPropagation()}
          >
             <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
                <CloseIcon />
             </button>

            <h3 className="text-2xl font-bold text-gray-800">
                Banty Assistant
            </h3>
            
            <div className="my-8">
              {!showNotFound ? (
                <>
                    <button onClick={toggleListen} className={`mx-auto flex items-center justify-center w-24 h-24 rounded-full transition-colors ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'}`}>
                        <MicrophoneIcon isListening={isListening} />
                    </button>
                    <p className="mt-6 text-gray-600 h-6">{statusText}</p>
                </>
              ) : (
                <div className="animate-fade-in">
                    <p className="text-lg text-gray-700">Sorry, we couldn't find any solutions for your request.</p>
                    <p className="mt-4 text-gray-600">
                        Can't find your product? Post an enquiry and our team will connect with you if we find a match for your requirements in the market.
                    </p>
                    <button onClick={handleCantFindClick} className="mt-6 font-bold text-blue-600 hover:underline">
                        Click here to post an enquiry
                    </button>
                </div>
              )}
            </div>

          </div>
        </div>
      )}
    </>
  );
};

export default BantyAssistant;
