
import React, { useState } from 'react';
import ResultForm from './components/ResultForm';
import ResultView from './components/ResultView';
import { MOCK_DATABASE } from './data/mockDatabase';
import { Student, ExamType, ViewType } from './types';

const App: React.FC = () => {
  const [currentStudent, setCurrentStudent] = useState<Student | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleSearch = (hallticket: string, examType: ExamType, viewType: ViewType) => {
    const student = MOCK_DATABASE[hallticket.toLowerCase()];
    if (student) {
      setCurrentStudent(student);
      setError(null);
    } else {
      setCurrentStudent(null);
      setError('Hallticket number not found. Please try again with a valid ID (e.g., 23EG107A01).');
    }
  };

  const handleBack = () => {
    setCurrentStudent(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center">
      {/* Official University Header */}
      <header className="w-full py-6 border-b border-gray-100 flex justify-center no-print sticky top-0 bg-white z-50 shadow-sm">
        <div className="max-w-6xl w-full flex justify-center px-4">
          <img 
            src="https://anurag.edu.in/wp-content/uploads/2024/11/logo.png" 
            alt="Anurag University" 
            className="h-16 md:h-20 object-contain"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              const fallback = document.getElementById('fallback-logo-container');
              if (fallback) fallback.style.display = 'block';
            }}
          />
          <div id="fallback-logo-container" className="hidden text-center py-2">
            <h1 className="text-[#1e3a5f] text-3xl font-bold uppercase tracking-tight">ANURAG UNIVERSITY</h1>
          </div>
        </div>
      </header>

      <main className="flex-grow w-full flex flex-col items-center py-10 px-4 bg-[#f8fafc]">
        {!currentStudent ? (
          <div className="w-full flex flex-col items-center animate-fade-in">
            <ResultForm onSearch={handleSearch} />
            {error && (
              <div className="mt-8 bg-red-50 text-red-600 px-8 py-4 rounded-lg border border-red-200 shadow-sm max-w-2xl w-full text-center font-medium">
                {error}
              </div>
            )}
          </div>
        ) : (
          <ResultView student={currentStudent} onBack={handleBack} />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-8 text-gray-400 text-xs no-print border-t border-gray-100 bg-white text-center">
        <p className="mb-2 uppercase font-medium">Anurag University Results Portal</p>
        <p>© {new Date().getFullYear()} Anurag University. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default App;
