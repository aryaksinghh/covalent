"use client"
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

interface optionobj {
  option: string,
  text: string
}

interface Question {
  id: number;
  questionText: string;
  options: optionobj[];
  answer: string
}

// 5 MCQ Sample Questions matching your web development focus
// const ques: Question[] = [
//   {
//     id: 1,
//     questionText: "What is the primary function of the 'useEffect' hook in React?",
//     options: [
//       {
//         option: "A",
//         text: "To directly mutate the browser DOM elements synchronously."
//       },
//       {
//         option: "B",
//         text: "To handle side effects such as data fetching, subscriptions, or manual DOM updates."
//       },
//       {
//         option: "C",
//         text: "To force a component to re-render without changing states."
//       },
//       {
//         option: "D",
//         text: "To store local component values that don't trigger updates on rewrite."
//       }
//     ],
//     answer: "B"
//   },
//   {
//     id: 2,
//     questionText: "Which of the following describes JavaScript's Event Loop mechanism?",
//     options: [
//       {
//         option: "A",
//         text: "It executes multi-threaded tasks concurrently across separate CPU threads."
//       },
//       {
//         option: "B",
//         text: "It monitors the Call Stack and the Callback Queue to manage asynchronous execution."
//       },
//       {
//         option: "C",
//         text: "It completely blocks user interactions until all network responses resolve."
//       },
//       {
//         option: "D",
//         text: "It caches DOM structures to speed up visual rendering processes."
//       }
//     ],
//     answer: "B"
//   },
//   {
//     id: 3,
//     questionText: "In CSS layout systems, what does the 'flex-shrink' property control?",
//     options: [
//       {
//         option: "A",
//         text: "The initial main size of a flex item before space distribution happens."
//       },
//       {
//         option: "B",
//         text: "The ability of a flex item to shrink if the size of the container is too small."
//       },
//       {
//         option: "C",
//         text: "The minimum pixel threshold an element can reach during compression."
//       },
//       {
//         option: "D",
//         text: "The outer margin spacing applied when items spill over into new lines."
//       }
//     ],
//     answer: "B"
//   },
//   {
//     id: 4,
//     questionText: "What is a primary architectural advantage of utilizing Next.js App Router?",
//     options: [
//       {
//         option: "A",
//         text: "It eliminates the requirement for writing backend or database connections entirely."
//       },
//       {
//         option: "B",
//         text: "It supports React Server Components natively to reduce client-side bundle sizes."
//       },
//       {
//         option: "C",
//         text: "It automatically converts all TypeScript syntax into raw assembly instructions."
//       },
//       {
//         option: "D",
//         text: "It enforces client-only page loading to accelerate localized calculations."
//       }
//     ],
//     answer: "B"
//   },
//   {
//     id: 5,
//     questionText: "Which HTTP status code represents a resource that has permanently moved?",
//     options: [
//       {
//         option: "A",
//         text: "301 Moved Permanently"
//       },
//       {
//         option: "B",
//         text: "302 Found / Temporary Redirect"
//       },
//       {
//         option: "C",
//         text: "404 Not Found"
//       },
//       {
//         option: "D",
//         text: "502 Bad Gateway"
//       }
//     ],
//     answer: "A"
//   }
// ];

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

    // Save current user selection state
    setAnswers(prev => [...prev, { id: currentQuestion.id, option: selectedOption }]);

    // Trigger sliding animation window
    setIsSliding(true);

    setTimeout(() => {
      if (currentIdx < ques.length - 1) {
        setCurrentIdx(prev => prev + 1);
        setSelectedOption(null);
        setIsSliding(false); // Reset alignment for the next card
      } else {
        setQuizComplete(true);
      }
    }, 250); // Match Tailwind's duration-250 transitions
  };

  interface result {

    id: number,
    res: boolean
  }

  if (quizComplete) {
    function handlegoback() {
      window.history.back();
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

      {/* Centered bounding box wrapping the interactive cards */}
      <div className="w-full max-w-2xl relative overflow-hidden">

        {/* Sliding Animation Handler Wrapper */}
        <div className={`transition-all duration-250 ease-in-out transform ${isSliding ? '-translate-x-full opacity-0' : 'translate-x-0 opacity-100'
          }`}>

          {/* Main Question Card Structure */}
          <div className="w-full bg-white border-2 border-black shadow-[8px_8px_0px_0px_#000] p-6 sm:p-8">

            {/* Meta Header */}
            <div className="flex justify-between items-center mb-6 border-b-2 border-black pb-3">
              <span className="text-xs font-black text-black bg-zinc-200 border border-black px-2 py-0.5 tracking-wider uppercase">
                QUESTION 0{currentIdx + 1} / 05
              </span>
            </div>

            {/* Question Text */}
            <div className="mb-8">
              <h2 className="text-lg sm:text-xl font-black text-black leading-snug">
                {currentQuestion.questionText}
              </h2>
            </div>

            {/* 4 Options layout block */}
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
                    {/* Index Bubble */}
                    <span className={`text-xs font-black border border-black px-1.5 py-0.5 uppercase flex-shrink-0 select-none ${isSelected ? 'bg-white text-black' : 'bg-black text-white group-hover:bg-zinc-900'
                      }`}>
                      {optionLetter}
                    </span>

                    {/* Inner Content Label */}
                    <span className="text-sm font-bold leading-tight">
                      {options.text}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Action Bar (With the green vibe correctness button) */}
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

        {/* Modular Progress Matrix Bar at base */}
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