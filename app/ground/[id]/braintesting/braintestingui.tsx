"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'
import SyntaxHighlighter from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/esm/styles/hljs';

interface optionobj {
  option: string,
  text: string
}

interface Question {
  id: number;
  questionText: string;
  options: optionobj[];
  answer: string;
  code: { language: string | null, codeString: string | null }
}

interface answer {
  id: number,
  option: string
}
interface propstype {
  groundid: string,
  ques: Question[]
}

export default function Braintestingui({ groundid, ques }: propstype) {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [isSliding, setIsSliding] = useState(false);
  const [quizComplete, setQuizComplete] = useState(false);
  const [answers, setAnswers] = useState<answer[]>([]);
  const router = useRouter();

  const currentQuestion = ques[currentIdx];

  const handleOptionSelect = (option: string) => {
    setSelectedOption(option);
  };

  const handleNext = () => {
    if (!selectedOption) return;

    setAnswers(prev => [...prev, { id: currentQuestion.id, option: selectedOption }]);
    setIsSliding(true);

    setTimeout(() => {
      if (currentIdx < ques.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsSliding(false); 
      } else {
        setQuizComplete(true);
      }
    }, 250); 
  };

  interface result {

    id: number,
    res: boolean
  }

  if (quizComplete) {
    function handlegoback() {
      router.push(`/ground/${groundid}`)
    }
    const results: result[] = [];

    ques.forEach((q, index) => {
      if (q.answer === answers[index].option) {
        results.push({
          id: q.id,
          res: true
        });
      }
    });

    const rightQuestions = results.length;
    let grade: number = 0;
    switch (rightQuestions) {
      case 0:
      case 1:
        grade = 1;
        break;
      case 2:
      case 3:
        grade = 2;
        break;
      case 4:
      case 5:
        grade = 3;
        break;
    }

    const dataupdate = async () => {

      try {
        const fetching = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/ground_update_db`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ grade, groundid })
        })
        const res = await fetching.json();
      } catch (error) {
        console.error("error occured while updateing grounds db for grade", error)
      }

    }
    dataupdate();


    return (
      <div className="min-h-screen bg-[#f3f3f3] flex items-center justify-center p-4 font-mono select-none">
        <div className="w-full max-w-xl bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-8 text-center">
          <div className="inline-block bg-black text-white text-xs font-black px-2 py-0.5 uppercase tracking-widest mb-4">
            TESTING COMPLETED
          </div>
          <p className="text-sm text-zinc-700 mb-6 font-medium">
            All 5 multiple-choice questions have been verified and processed by the system.
          </p>
          <button
            onClick={handlegoback}
            className="border-2 cursor-pointer border-black bg-white text-black px-5 py-2.5 text-xs font-black uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-[4px_4px_0px_0px_#000] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            Go back to ground ←
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3] flex flex-col items-center space-y-9 justify-center p-4 font-mono select-none">
      <h1 className='text-2xl text-center underline md:text-5xl font-poppins font-bold'>Small test to test your current knowledge</h1>

      {/*interactive cards */}
      <div className="w-full max-w-2xl relative overflow-hidden">

        <div className={`transition-all duration-250 ease-in-out transform ${isSliding ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}>

          {/* Main Question Card Structure */}
          <div className="w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 sm:p-8">

            <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-3">
              <span className="text-xs font-black text-black bg-zinc-200 border border-black px-2 py-0.5 tracking-wider uppercase">
                QUESTION 0{currentIdx + 1} / 05
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-black text-black leading-snug">
                {currentQuestion.questionText}
              </h2>
              {currentQuestion.code.codeString &&
                (<div>
                  <h1 className='text-md font-bold mt-3 mb-3'>Code :</h1>
                  <SyntaxHighlighter language={currentQuestion.code.language || ""} style={a11yDark}>
                    {currentQuestion.code.codeString}
                  </SyntaxHighlighter></div>)}
            </div>

            <div className="space-y-3.5 mb-8">
              {currentQuestion.options.map((options, index) => {
                const optionLetter = ['A', 'B', 'C', 'D'][index];
                const isSelected = selectedOption === options.option;

                return (
                  <button
                    key={index}
                    onClick={() => handleOptionSelect(options.option)}
                    className={`w-full cursor-pointer text-left border-2 border-black p-3.5 flex items-start gap-4 transition-all group ${isSelected
                      ? 'bg-black text-white shadow-none translate-x-[2px] translate-y-[2px]'
                      : 'bg-white text-black shadow-[3px_3px_0px_0px_#000] hover:bg-zinc-50 active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                      }`}
                  >
                    <span className={`text-xs font-black border border-black px-1.5 py-0.5 uppercase flex-shrink-0 select-none ${isSelected ? 'bg-white text-black' : 'bg-black text-white group-hover:bg-zinc-900'
                      }`}>
                      {optionLetter}
                    </span>

                    <span className="flex-1 min-w-0 whitespace-normal break-words text-sm font-bold leading-tight">
                      {options.text}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="flex justify-end pt-2 border-t-2 border-black">
              <button
                onClick={handleNext}
                disabled={!selectedOption}
                className={`border-2 border-black px-6 py-3 text-xs font-black uppercase tracking-widest transition-all ${selectedOption
                  ? 'bg-[#22c55e] text-black shadow-[4px_4px_0px_0px_#000] cursor-pointer hover:bg-[#1eb053] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none'
                  : 'bg-zinc-300 text-zinc-500 shadow-none opacity-60 cursor-not-allowed'
                  }`}
              >
                {currentIdx === ques.length - 1 ? 'Finish Assessment ──►' : 'Next Question ──►'}
              </button>
            </div>

          </div>
        </div>

        <div className="mt-4 flex items-center justify-between px-1">
          <div className="flex gap-1">
            {ques.map((_, idx) => (
              <div
                key={idx}
                className={`h-2 w-6 border border-black transition-colors ${idx <= currentIdx ? 'bg-black' : 'bg-zinc-200'
                  }`}
              />
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}