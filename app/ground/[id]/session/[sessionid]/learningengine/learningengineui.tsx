"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";

interface FirstPrincipleContent {
  title: string;
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  isCodeRelated: boolean;

  mentalModel: string;

  firstPrincipleExplanation: {
    problem: string;
    whyProblemExists: string;
    whyOlderApproachesFail: string;
    coreIdea: string;
    stepByStepExplanation: string[];
  };

  realWorldExample: {
    title: string;
    description: string;
  };

  codeExample: {
    language: string | null;
    code: string | null;
    explanation: string | null;
  };

  revisionSummary: string;

}

type ConceptNode = {
  id: number;
  type: "concept";
  title: string;
  solution: string;
};

type MCQNode = {
  id: number;
  type: "mcq";
  question: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

type StudyNode = ConceptNode | MCQNode;

interface paramstypes {
  Nodeworkflow: StudyNode[];
  sid: string
}
interface evalfeedback {
  score: string,
  appreciation: string
}
interface sessionfeedback {
  score: number,
  xp: number
}


export default function LearningEngineUI({ Nodeworkflow, sid }: paramstypes) {


  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [historyIndex, setHistoryIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isLoading, setisLoading] = useState<boolean>(false);
  const [fptObj, setfptObj] = useState<FirstPrincipleContent | null>(null);
  const [modalStep, setModalStep] = useState<1 | 2 | 3>(1);
  const [userExplanation, setUserExplanation] = useState<string>("");
  const [assessmentStatus, setAssessmentStatus] = useState<"idle" | "success" | "fallback">("idle");
  const [isloading, setisloading] = useState<boolean>(false);
  const [evalFeedback, setevalFeedback] = useState<evalfeedback | null>(null);

  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isLocked, setIsLocked] = useState<boolean>(false);

  const currentNode = Nodeworkflow[currentIndex];
  const isFinished = currentIndex >= Nodeworkflow.length;
  const isReviewMode = currentIndex < historyIndex;
  const conceptarr: ConceptNode[] = Nodeworkflow.filter((s:StudyNode)=> s.type == "concept");
  const conceptlength = conceptarr.length
  const [sessionFeedback, setsessionFeedback] = useState<sessionfeedback>({score:0, xp:conceptlength*4})

  if(isFinished){
    async function updatesession(){
      try{
      const ups = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/session_update_db`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
          sessionid: sid,
          score: sessionFeedback.score
        })
      })
      const res = await ups.json();
      if(ups.ok){
        console.log("updated")
      }
    } catch(error){
      console.error("error occured while updating session for the score", error)
    }

    }
    updatesession();
  }

  const handlenotunderstood = async () => {
    setIsModalOpen(true);
    setisLoading(true);
    const fetch_fpt = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fpt_content_fetch`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: currentNode.type == "concept" ? currentNode.title : " ",
        sessionid: sid,
        conceptid: currentNode.type == "concept" ? currentNode.id : 0
      })
    })
    const res = await fetch_fpt.json();
    setfptObj(res.data)
    setisLoading(false);
  }

  const handleNext = () => {
    if (currentIndex === historyIndex) {
      setHistoryIndex((prev) => prev + 1);
    }
    setCurrentIndex((prev) => prev + 1);
    resetMCQ();
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prev) => prev - 1);
      resetMCQ();
    }
  };

  const resetMCQ = () => {
    setSelectedOption(null);
    setIsLocked(false);
  };

  const lockAnswer = () => {
    if (selectedOption === null || isLocked) return;
    setIsLocked(true);
    if (currentNode?.type === "mcq" && selectedOption === currentNode.correctIndex) {
      setsessionFeedback((prev)=>({...prev, score: prev.score + 1}));
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setModalStep(1);
    setUserExplanation("");
    setAssessmentStatus("idle");
  };

  const evaluateExplanation = async () => {
    setisloading(true)
    const evaluate_explanation = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/fpt_explain_evaluate`, {
      method:"POST",
      headers:{"Content-Type": "application/json"},
      body: JSON.stringify({
        title: currentNode.type == "concept" ? currentNode.title : null,
        explanation: userExplanation
      })
    })
    const res = await evaluate_explanation.json();
    if(evaluate_explanation.ok){
      setevalFeedback(res.data)
      setAssessmentStatus("success")
      setisloading(false)
    } else {
      setAssessmentStatus("fallback")
      setisloading(false)
      console.log("error occured while evalaution user explanation",res.error)
    }
  };

  return (
    <div className="min-h-screen bg-[#F0F0F0] flex justify-center items-center text-black font-mono p-6 sm:p-12 relative selection:bg-black selection:text-white">

      {/* Main Content Area */}
      <div className="max-w-3xl mx-auto w-full">
        {!isFinished ? (
          <div>
            {/* PROGRESS TRACKER */}
            <div className="flex justify-between items-center mb-6 text-sm font-bold uppercase tracking-tight">
              <div>Slide: {currentIndex + 1} / {Nodeworkflow.length}</div>
              {isReviewMode && (
                <span className="bg-amber-400 border border-black text-xs font-black px-2 py-0.5 animate-pulse">
                  👀 Reviewing History
                </span>
              )}
            </div>

            {/* CONCEPT LAYOUT */}
            {currentNode.type === "concept" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase bg-black text-[#F0F0F0] px-2 py-1 font-bold tracking-widest">
                    Concept #{currentNode.id}
                  </span>
                  <h1 className="text-4xl font-black uppercase tracking-tight mt-3">
                    {currentNode.title}
                  </h1>
                </div>

                <div className="space-y-4 pt-2 border-t-2 border-dashed border-black/30">
                  <h3 className="text-xs mt-3 uppercase font-extrabold text-black/60 tracking-wider">Solution:</h3>
                  <p className="text-lg leading-relaxed font-medium text-neutral-800">
                    {currentNode.solution}
                  </p>
                </div>

                {/* Self-Assessment Interaction */}
                <div className="flex gap-4 pt-6">
                  <button
                    onClick={handleNext}
                    disabled={isReviewMode}
                    className={`flex-1 font-bold py-3 uppercase tracking-wider text-sm transition-all border-2 border-black ${isReviewMode
                      ? "bg-neutral-300 text-neutral-500 opacity-50 cursor-not-allowed shadow-none"
                      : "bg-white cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                      }`}
                  >
                    ✅Understood
                  </button>
                  <button
                    onClick={handlenotunderstood}
                    disabled={isReviewMode}
                    className={`flex-1 font-bold py-3 uppercase tracking-wider text-sm transition-all border-2 border-black px-2 ${isReviewMode
                      ? "bg-neutral-300 text-neutral-500 opacity-50 cursor-not-allowed shadow-none"
                      : "bg-white cursor-pointer shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none"
                      }`}
                  >
                    ❌Not Understood
                  </button>
                </div>
              </div>
            )}

            {/* MCQ INTERFACE */}
            {currentNode.type === "mcq" && (
              <div className="space-y-6">
                <div>
                  <span className="text-xs uppercase bg-black text-[#F0F0F0] px-2 py-1 font-bold tracking-widest">
                    Knowledge Assessment
                  </span>
                  <h2 className="text-2xl font-black tracking-tight mt-3">
                    {currentNode.question}
                  </h2>
                </div>

                <div className="space-y-3 pt-2">
                  {currentNode.options.map((option, idx) => {
                    let optionStyle = "bg-white border-2 border-black text-left font-bold py-3 px-4 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]";

                    if (!isLocked && selectedOption === idx) {
                      optionStyle = "bg-black text-white border-2 border-black text-left font-bold py-3 px-4 transform translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                    } else if (isLocked) {
                      if (idx === currentNode.correctIndex) {
                        optionStyle = "bg-emerald-500 text-black border-2 border-black text-left font-black py-3 px-4 transform translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                      } else if (selectedOption === idx && selectedOption !== currentNode.correctIndex) {
                        optionStyle = "bg-rose-500 text-black border-2 border-black text-left font-bold py-3 px-4 transform translate-x-[2px] translate-y-[2px] shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]";
                      } else {
                        optionStyle = "bg-white/50 border-2 border-black/30 text-left text-black/40 font-bold py-3 px-4 opacity-60 cursor-not-allowed";
                      }
                    }

                    return (
                      <button
                        key={idx}
                        disabled={isLocked || isReviewMode}
                        onClick={() => setSelectedOption(idx)}
                        className={`w-full cursor-pointer transition-all ${optionStyle} ${isReviewMode ? "cursor-not-allowed opacity-70" : ""}`}
                      >
                        <span className="inline-block w-6 font-black">{String.fromCharCode(65 + idx)}.</span> {option}
                      </button>
                    );
                  })}
                </div>

                <div className="pt-4">
                  {isReviewMode ? (
                    <div className="p-4 bg-amber-100 border-2 border-black border-dashed text-center font-bold text-xs uppercase tracking-wider">
                      Review mode active. Cannot change matrix values.
                    </div>
                  ) : !isLocked ? (
                    <button
                      onClick={lockAnswer}
                      disabled={selectedOption === null}
                      className={`w-full font-black py-4 cursor-pointer uppercase tracking-widest text-sm border-2 border-black transition-all ${selectedOption !== null
                        ? "bg-black text-white shadow-[4px_4px_0px_0px_rgba(16,185,129,1)] active:translate-x-[2px] active:translate-y-[2px]"
                        : "bg-neutral-300 text-neutral-500 cursor-not-allowed"
                        }`}
                    >
                      Lock Answer
                    </button>
                  ) : (
                    <div className="space-y-4 animate-in fade-in duration-300">
                      <div className="p-4 bg-white border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">
                        <span className="font-black uppercase text-xs block mb-1 tracking-wide">
                          {selectedOption === currentNode.correctIndex ? "Right Answer 💐" : "Wrong: Reason "}
                        </span>
                        <p className="text-sm font-medium leading-relaxed">{currentNode.explanation}</p>
                      </div>
                      <button
                        onClick={handleNext}
                        className="w-full cursor-pointer bg-black text-white font-black py-4 uppercase tracking-widest text-sm border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px]"
                      >
                        Next
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* BOTTOM NAV ARROWS */}
            <div className="flex justify-between items-center pt-12 mt-12 border-t-2 border-black">
              <button
                onClick={handlePrev}
                disabled={currentIndex === 0}
                className={`flex items-center cursor-pointer gap-2 font-black uppercase text-sm border-2 border-black px-4 py-2 transition-all ${currentIndex > 0
                  ? "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
                  }`}
              >
                ← Prev
              </button>

              <button
                onClick={handleNext}
                disabled={currentIndex >= historyIndex || currentIndex === Nodeworkflow.length - 1}
                className={`flex items-center cursor-pointer gap-2 font-black uppercase text-sm border-2 border-black px-4 py-2 transition-all ${currentIndex < historyIndex && currentIndex < Nodeworkflow.length - 1
                  ? "bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] cursor-pointer"
                  : "opacity-40 cursor-not-allowed"
                  }`}
              >
                Next →
              </button>
            </div>
          </div>
        ) : (
          /* CONGRATULATIONS SCREEN */
          <div className="text-center space-y-6 py-8 animate-in zoom-in-95 duration-300 max-w-md mx-auto">
            {/* Larger Square Brain Container with Grid Background Frame */}
            <div
              className="inline-block bg-white border-4 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
              style={{
                backgroundImage: 'linear-gradient(to right, #efefef 1px, transparent 1px), linear-gradient(to bottom, #efefef 1px, transparent 1px)',
                backgroundSize: '12px 12px'
              }}
            >
              <Image
                width={100}
                height={100}
                src="/brain1.png" // Replace with your actual png path
                alt="Brain Optimization"
                className="object-contain block mx-auto"
              />
            </div>

            {/* Dynamic Appreciation Heading Section */}
            <div>
              <h1 className="text-4xl font-black uppercase tracking-tight mt-2">
                {/* Replace this hardcoded string with your dynamic logic variable */}
                {"Outstanding Performance!"}
              </h1>
            </div>

            {/* Metrics Grid: Score & XP */}
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto">

              {/* MCQ Score Box */}
              <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center">
                <span className="text-[10px] uppercase font-extrabold text-neutral-500 tracking-wider block mb-1">
                  Questions
                </span>
                <span className="text-2xl font-black tracking-tight">
                  {sessionFeedback.score} / {Nodeworkflow.filter(n => n.type === "mcq").length}
                </span>
                <span className="text-[10px] font-bold mt-1 text-neutral-600 uppercase">Correct</span>
              </div>

              {/* Gained XP Box */}
              <div className="bg-white border-4 border-black p-4 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] flex flex-col justify-center items-center">
                <span className="text-[10px] uppercase font-extrabold text-neutral-500 tracking-wider block mb-1">
                  EXPERIENCE
                </span>
                <span className="text-2xl font-black tracking-tight text-emerald-600 flex items-center gap-1">
                  <span className="text-sm animate-bounce">▲</span> +{sessionFeedback.xp}
                </span>
                <span className="text-[10px] font-bold mt-1 text-emerald-700 uppercase">XP Gained</span>
              </div>

            </div>

            {/* Bottom Feedback Line */}


            {/* Action Button */}
            <div className="pt-4">
              <button
                onClick={() => {
                  setCurrentIndex(0);
                  setHistoryIndex(0);
                  resetMCQ();
                }}
                className="w-full sm:w-auto bg-black text-white cursor-pointer font-black py-4 px-8 uppercase tracking-widest text-sm border-2 border-black shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:bg-neutral-900 hover:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
              >
                Session Page →
              </button>
            </div>
          </div>
        )}
      </div>

      {/* --- RECONSTRUCTED 3-STEP FIRST PRINCIPLE MODAL --- */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-[#F0F0F0] border-4 border-black w-full max-w-2xl h-[85vh] relative shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex flex-col overflow-hidden">

            {/* Locked Header Area */}
            <div className="p-6 pb-2 flex justify-between items-start shrink-0">
              <div className="space-y-1">
                {!isLoading && fptObj?.difficulty && (
                  <span className="text-[10px] font-black uppercase tracking-widest px-2 py-0.5 bg-black text-white rounded-none">
                    {fptObj.difficulty} Level
                  </span>
                )}
                {isLoading && (
                  <div className="w-20 h-4 bg-neutral-300 border border-black animate-pulse" />
                )}
                <h3 className="text-2xl font-black uppercase tracking-tight mt-1">
                  {isLoading ? (
                    <div className="w-56 h-7 bg-neutral-400 border-2 border-black animate-pulse" />
                  ) : (
                    <>
                      {modalStep === 1 && (fptObj?.title || "First Principles Breakdown")}
                      {modalStep === 2 && "Explain me"}
                      {modalStep === 3 && "Feedback"}
                    </>
                  )}
                </h3>
              </div>

              {/* Close Button */}
              <button
                onClick={handleCloseModal}
                className="bg-white border-2 border-black w-4 h-4 p-3 flex items-center justify-center font-black hover:bg-black hover:text-white transition-colors cursor-pointer shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[1px] active:translate-y-[1px] active:shadow-none"
              >
                ✕
              </button>
            </div>

            {/* --- STRICTLY ISOLATED SCROLLABLE CONTENT --- */}
            <div className="flex-1 overflow-y-auto px-6 space-y-6 mt-4 selection:bg-black selection:text-white min-h-0 pb-8">

              {/* Step 1: Deep First Principles Breakdown or Loading view */}
              {modalStep === 1 && (
                isLoading ? (
                  /* --- STRUCTURAL MONOCHROME LOADING SKELETON --- */
                  <div className="space-y-6 animate-pulse">
                    <div className="p-4 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] h-32 flex items-center justify-center font-mono text-xs font-black uppercase tracking-widest text-neutral-500">
                      ⚡ LOADING...
                    </div>
                    <div className="space-y-3">
                      <div className="h-4 bg-neutral-400 border border-black w-1/4" />
                      <div className="h-3 bg-neutral-300 border border-black w-full" />
                      <div className="h-3 bg-neutral-300 border border-black w-5/6" />
                    </div>
                  </div>
                ) : fptObj ? (
                  /* --- TEXT FLOW ARCHITECTURE (HUMAN PSYCHOLOGY OPTIMIZED) --- */
                  <div className="space-y-6 animate-in fade-in duration-200">

                    {/* Context Framing Row */}
                    <div className="border-b-2 border-black/20 pb-4 space-y-3 font-mono">
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wide bg-black text-white px-1 mr-2">MENTAL MODEL</span>
                        <span className="text-sm text-neutral-900 font-semibold">{fptObj.mentalModel}</span>
                      </div>
                      <div>
                        <span className="text-[11px] font-black uppercase tracking-wide bg-black text-white px-1 mr-2">ANALOGY</span>
                        <span className="text-sm text-neutral-900 font-semibold">
                          <span className="font-bold underline">{fptObj.realWorldExample?.title}:</span> {fptObj.realWorldExample?.description}
                        </span>
                      </div>
                    </div>



                    {/* Structural Linear Flow: The Problem Pipeline */}
                    <div className="space-y-4">
                      <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 inline-block">
                        THE FOUNDATIONAL BREAKDOWN
                      </h4>

                      <div className="border-l-4 border-black pl-4 space-y-4 text-sm font-mono leading-relaxed">
                        <div>
                          <span className="font-black uppercase text-xs tracking-tight text-neutral-500 block mb-0.5">01. THE PROBLEM</span>
                          <p className="text-neutral-900 font-semibold">{fptObj.firstPrincipleExplanation?.problem}</p>
                        </div>

                        <div>
                          <span className="font-black uppercase text-xs tracking-tight text-neutral-500 block mb-0.5">02. WHY IT INHERENTLY EXISTS</span>
                          <p className="text-neutral-900 font-semibold">{fptObj.firstPrincipleExplanation?.whyProblemExists}</p>
                        </div>

                        <div className="pt-2 border-t border-black/10">
                          <span className="font-black uppercase text-xs tracking-tight text-neutral-500 block mb-0.5">03. WHY HISTORICAL APPROACHES FAIL</span>
                          <p className="text-neutral-900 font-semibold">{fptObj.firstPrincipleExplanation?.whyOlderApproachesFail}</p>
                        </div>
                      </div>
                    </div>

                    {/* The Core Truth/Insight Box (High contrast attention point) */}
                    <div className="p-5 bg-white border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-1.5">
                      <span className="text-[10px] font-black uppercase tracking-widest text-neutral-500 block">
                        ✨ core idea
                      </span>
                      <p className="text-base font-black text-black leading-snug uppercase tracking-tight">
                        {fptObj.firstPrincipleExplanation?.coreIdea}
                      </p>
                    </div>

                    {/* Step-by-Step Mechanical Path */}
                    {fptObj.firstPrincipleExplanation?.stepByStepExplanation?.length > 0 && (
                      <div className="space-y-3 pt-2">
                        <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 inline-block">
                          step by step explanation
                        </h4>
                        <ol className="space-y-2 font-mono text-xs text-neutral-900">
                          {fptObj.firstPrincipleExplanation.stepByStepExplanation.map((step, idx) => (
                            <li key={idx} className="flex gap-3 items-start bg-white p-3 border-2 border-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
                              <span className="bg-black text-white font-black text-[10px] w-5 h-5 flex items-center justify-center shrink-0">
                                {idx + 1}
                              </span>
                              <p className="pt-0.5 font-medium">{step}</p>
                            </li>
                          ))}
                        </ol>
                      </div>
                    )}

                    {/* Code Blueprint Implementation View */}
                    {fptObj.isCodeRelated && fptObj.codeExample?.code && (
                      <div className="space-y-3 pt-2 animate-fadeIn">
                        {/* Header / Title */}
                        <h4 className="text-sm font-black uppercase tracking-wider border-b-2 border-black pb-1 inline-block">
                          code example ({fptObj.codeExample?.language || "CODE"})
                        </h4>

                        {/* Code Block Window */}
                        <div className="bg-neutral-950 text-neutral-200 p-4 border-4 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] overflow-x-auto relative group">
                          {fptObj.codeExample?.language && (
                            <span className="absolute top-2 right-2 text-[10px] font-mono uppercase bg-neutral-800 text-neutral-400 px-1.5 py-0.5 border border-neutral-700 select-none">
                              {fptObj.codeExample.language}
                            </span>
                          )}
                          <pre className="font-mono text-xs leading-relaxed selection:bg-neutral-700 whitespace-pre">
                            <code>{fptObj.codeExample.code}</code>
                          </pre>
                        </div>

                        {/* Explanation Section */}
                        {fptObj.codeExample?.explanation && (
                          <div className="text-xs font-mono text-neutral-700 border-l-4 border-black pl-3 py-1 bg-neutral-50 pr-2">
                            <span className="font-black uppercase text-[10px] block text-neutral-500 tracking-wide mb-0.5">
                              Code Explanation:
                            </span>
                            <p className="leading-relaxed">{fptObj.codeExample.explanation}</p>
                          </div>
                        )}
                      </div>
                    )}

                    {/* Quick Revision Anchor */}
                    <div className="p-3 bg-neutral-200 border border-black font-mono text-xs text-neutral-700">
                      <span className="font-black text-[10px] block uppercase tracking-wider mb-0.5 text-neutral-500">
                        SUMMARY:
                      </span>
                      {fptObj.revisionSummary}
                    </div>

                  </div>
                ) : (
                  <div className="p-4 bg-white border-2 border-black text-center font-mono text-xs font-black uppercase tracking-wider text-neutral-500">
                    ❌ No configuration content resolved down the pipeline.
                  </div>
                )
              )}

              {/* Step 2: User Input Transmission */}
              {modalStep === 2 && (
                <div className="space-y-4 animate-in fade-in duration-200">
                  <div>
                    <label className="block text-xs font-black uppercase tracking-wider mb-2 text-neutral-700">
                      Explain in short and simple terms what do you understood ?
                    </label>
                    <textarea
                      value={userExplanation}
                      onChange={(e) => setUserExplanation(e.target.value)}
                      placeholder="Write in your words..."
                      className="w-full min-h-[220px] p-4 border-4 border-black font-mono text-sm focus:outline-none focus:ring-0 bg-white shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] rounded-none"
                    />
                  </div>
                </div>
              )}

              {/* Step 3: Dedicated Evaluation Feedback Window */}
              {modalStep === 3 && (
                <div className="space-y-4 animate-in zoom-in-95 duration-200">
                  {isloading ? (
                  <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <h4 className="text-xl font-black uppercase border-b-2 border-black pb-1">Loading...</h4>
                    <p className="text-sm leading-relaxed text-neutral-800 font-mono">
                    Please wait while we process your input.
                    </p>
                  </div>
                  ) : assessmentStatus === "success" ? (
                  <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <h4 className="text-xl font-black uppercase border-b-2 border-black pb-1">SCORE {evalFeedback?.score}</h4>
                    <p className="text-sm leading-relaxed text-neutral-800 font-mono">
                    {evalFeedback?.appreciation}
                    </p>
                  </div>
                  ) : (
                  <div className="bg-white border-4 border-black p-5 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] space-y-3">
                    <h1>Something went wrong with system</h1>
                  </div>
                  )}
                </div>
              )}
            </div>

            {/* Locked Action Footer Area */}
            <div className="p-6 pt-3 border-t-4 border-black bg-[#F0F0F0] shrink-0">
              {/* Step 1 Button */}
              {modalStep === 1 && (
                <button
                  onClick={() => setModalStep(2)}
                  disabled={isLoading || !fptObj}
                  className="w-full cursor-pointer bg-white text-black font-black py-4 uppercase tracking-wider text-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isLoading ? "Loading..." : "Next →"}
                </button>
              )}

              {/* Step 2 Button */}
              {modalStep === 2 && (
                <button
                  onClick={async () => {
                    await evaluateExplanation();
                    setModalStep(3);
                  }}
                  className="w-full cursor-pointer bg-white text-black font-black py-4 uppercase tracking-wider text-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  {isloading ? "Loading..." : "Submit Explanation →"}
                </button>
              )}

              {/* Step 3 Button */}
              {modalStep === 3 && (
                <button
                  onClick={() => {
                    handleCloseModal();
                    handleNext();
                    setModalStep(1);
                  }}
                  className="w-full cursor-pointer bg-white text-black font-black py-4 uppercase tracking-wider text-xs border-2 border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]"
                >
                  Continue Session →
                </button>
              )}
            </div>

          </div>
        </div>
      )}
    </div>
  );
}