import React from 'react';
import { Student } from '../types';

interface ResultViewProps {
  student: Student;
  onBack: () => void;
}

const ResultView: React.FC<ResultViewProps> = ({ student, onBack }) => {
  // Check if student has failed in ANY course across ALL semesters
  const hasFailed = student.semesters.some(sem => 
    sem.courses.some(course => course.grade === 'F')
  );

  return (
    <div className="max-w-6xl w-full mx-auto bg-white rounded-lg shadow-2xl overflow-hidden mb-10 print:shadow-none print:w-full print:m-0">
      
      {/* Print-Only University Header */}
      <div className="print-only text-center mb-8">
        <div className="flex flex-col items-center justify-center space-y-2">
          <img 
            src="https://anurag.edu.in/wp-content/uploads/2024/11/logo.png" 
            alt="Anurag University" 
            className="h-20 object-contain"
          />
          <h1 className="text-2xl font-bold uppercase text-[#1e3a5f]">Anurag University</h1>
          <p className="text-gray-600 font-semibold tracking-widest text-sm border-t border-b border-gray-300 py-1 w-full max-w-md mx-auto">EXAMINATION RESULTS</p>
        </div>
      </div>

      {/* Header Blue Bar (Hidden on Print) */}
      <div className="bg-[#445b7e] py-12 text-center no-print">
        <h1 className="text-white text-2xl font-semibold tracking-wide">Exam Results</h1>
      </div>

      <div className="p-8 print:p-0 space-y-12">
        {/* Student Header Info */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 print:grid-cols-3 print:gap-4 print:mb-10">
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium print:text-xs">Hallticket number</p>
            <p className="text-lg font-bold text-gray-800 uppercase print:text-sm">{student.hallticketNumber}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium print:text-xs">Student Name</p>
            <p className="text-lg font-bold text-gray-800 uppercase print:text-sm">{student.studentName}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-400 font-medium print:text-xs">Program</p>
            <p className="text-lg font-bold text-gray-800 uppercase leading-tight print:text-sm">{student.program}</p>
          </div>
        </div>

        {/* CGPA Box - Hidden if any fail exists */}
        {!hasFailed && (
          <div className="bg-[#f4f7fa] py-4 rounded-xl text-center border border-gray-100 print:bg-white print:border-black">
            <p className="text-lg font-bold text-gray-800 print:text-md">CGPA : {student.cgpa}</p>
          </div>
        )}

        {/* Semesters */}
        {student.semesters.map((sem) => (
          <div key={sem.semesterNumber} className="semester-block space-y-6">
            <h2 className="text-center text-xl font-bold text-gray-800 py-4 print:text-lg print:py-2">Semester – {sem.semesterNumber}</h2>
            
            <div className="overflow-x-auto border border-gray-200 rounded-sm print:border-black">
              <table className="w-full text-sm text-left border-collapse">
                <thead>
                  <tr className="bg-[#1e3a5f] text-white print:bg-gray-100 print:text-black">
                    <th className="px-4 py-3 border border-gray-300 font-semibold w-16 text-center print:py-1">S.No.</th>
                    <th className="px-4 py-3 border border-gray-300 font-semibold w-32 print:py-1">Course Code</th>
                    <th className="px-4 py-3 border border-gray-300 font-semibold print:py-1">Course Name</th>
                    <th className="px-4 py-3 border border-gray-300 font-semibold w-24 text-center print:py-1">Credits</th>
                    <th className="px-4 py-3 border border-gray-300 font-semibold w-24 text-center print:py-1">Grade</th>
                    <th className="px-4 py-3 border border-gray-300 font-semibold w-32 text-center print:py-1">Status</th>
                  </tr>
                </thead>
                <tbody className="text-gray-700">
                  {sem.courses.map((course) => (
                    <tr key={course.sNo} className="border-b border-gray-200 hover:bg-gray-50 transition-colors print:hover:bg-transparent">
                      <td className="px-4 py-3 border border-gray-300 text-center font-medium print:py-1">{course.sNo}</td>
                      <td className="px-4 py-3 border border-gray-300 font-medium print:py-1">{course.courseCode}</td>
                      <td className="px-4 py-3 border border-gray-300 font-medium print:py-1">{course.courseName}</td>
                      <td className="px-4 py-3 border border-gray-300 text-center print:py-1">{course.credits}</td>
                      <td className="px-4 py-3 border border-gray-300 text-center font-bold print:py-1">
                        <span className={course.grade === 'F' ? 'text-red-600' : ''}>
                          {course.grade}
                        </span>
                      </td>
                      <td className="px-4 py-3 border border-gray-300 print:py-1">
                        <div className="flex justify-center items-center space-x-2 font-bold">
                          {course.history && course.history.map((h, i) => (
                            <span key={i} className={h === 'F' ? 'text-red-600' : 'text-green-600'}>{h}</span>
                          ))}
                          {!course.history && (
                             <span className={course.status === 'F' ? 'text-red-600' : 'text-green-600'}>{course.status}</span>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center gap-4 print:flex-row print:gap-8">
              <div className="bg-[#f4f7fa] px-8 py-4 rounded-xl border border-gray-100 w-full md:w-auto text-center print:bg-white print:border-black print:px-4 print:py-1">
                <p className="font-bold text-gray-800 print:text-sm">SGPA : {sem.sgpa}</p>
              </div>
              <div className="bg-[#f4f7fa] px-8 py-4 rounded-xl border border-gray-100 w-full md:w-auto text-center print:bg-white print:border-black print:px-4 print:py-1">
                <p className="font-bold text-gray-800 text-sm print:text-xs">Total secured credits: {sem.securedCredits} / {sem.totalCredits}</p>
              </div>
            </div>
            
            {/* Divider for semesters (No border in print to save ink/look cleaner) */}
            <div className="border-b border-gray-100 pt-10 no-print"></div>
          </div>
        ))}

        <div className="flex justify-center gap-4 py-8 no-print">
          <button
            onClick={onBack}
            className="px-8 py-3 bg-gray-200 text-gray-700 rounded-lg font-bold hover:bg-gray-300 transition-colors"
          >
            Back to Search
          </button>
          <button
            onClick={() => window.print()}
            className="px-12 py-3 bg-[#2e31f2] text-white rounded-lg font-bold hover:bg-blue-700 transition-colors shadow-lg"
          >
            Print Result
          </button>
        </div>
      </div>
    </div>
  );
};

export default ResultView;