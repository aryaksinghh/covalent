'use client';

import React, { useState, useEffect } from 'react';
import { useUserState } from '@/states/userState';
import { useRouter } from 'next/navigation';

// Sub-category mapping data
const subCategoryData: Record<string, string[]> = {
  programming: ['JavaScript', 'TypeScript', 'Python', 'Java'],
  frontend: ['HTML', 'CSS', 'React', 'Next.js'],
  backend: ['Node.js', 'Express.js', 'NextJS'],
  database: ['PostgreSQL', 'MySQL', 'MongoDB'],
  computerscience: ['DSA', 'DBMS', 'OS', 'CN'],
};

interface CreateGroundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CreateGroundModal({ isOpen, onClose }: CreateGroundModalProps) {
  const router = useRouter();
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [experience, setExperience] = useState('');
  const { fetchUser, id} = useUserState();
  const [iscreating, setiscreating] = useState<boolean>(false);
  fetchUser();

  // Reset sub-category whenever main category changes
  useEffect(() => {
    setSubCategory('');
  }, [category]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setiscreating(true);
    const sendGroundData = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/ground_insert_db`, {
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body: JSON.stringify({
            name,
            category,
            stack: subCategory,
            experience,
            userid: id
        })
    })
    const res = await sendGroundData.json();
    setiscreating(false);
    router.push(`/ground/${res.message.id}/braintesting`)
    onClose();
    if(res.status!=201){
        console.log("error occured while inserting ground data in database", res.message)
    } 
    
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm p-4 font-mono">
      {/* Modal Box */}
      <div className="relative w-full max-w-md bg-[#f3f3f3] border-2 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] p-6 transition-all">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-2 border-b-2 border-black">
          <h2 className="text-xl font-black uppercase tracking-wider text-black">
            CREATE GROUND
          </h2>
          <button 
            onClick={onClose}
            className="border-2 border-black cursor-pointer bg-white px-2 py-0.5 text-sm font-bold text-black hover:bg-black hover:text-white transition-colors shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
          >
            X
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          
          {/* Ground Name Input */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-black tracking-wide">
              Ground Name
            </label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="ex: front dev, python advanced"
              className="w-full bg-white border-2 border-black p-2.5 text-sm text-black placeholder-zinc-500 outline-none focus:bg-zinc-50 font-medium transition-colors"
            />
          </div>

          {/* Main Category Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-black tracking-wide">
              Category
            </label>
            <select
              required
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full bg-white border-2 border-black p-2.5 text-sm text-black outline-none focus:bg-zinc-50 font-medium appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundPosition: 'right 10px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
            >
              <option value="" disabled hidden>Select main category...</option>
              <option value="programming">Programming Language</option>
              <option value="frontend">Frontend</option>
              <option value="backend">Backend</option>
              <option value="database">Database</option>
              <option value="computerscience">Computer Science</option>
            </select>
          </div>

          {/* Conditional Sub-Category Select */}
          {category && subCategoryData[category] && (
            <div className="flex flex-col gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200">
              <label className="text-xs font-black uppercase text-black tracking-wide flex items-center gap-1">
                <span className="text-zinc-500">└─</span> Sub Category
              </label>
              <select
                required
                value={subCategory}
                onChange={(e) => setSubCategory(e.target.value)}
                className="w-full bg-white border-2 border-black p-2.5 text-sm text-black outline-none focus:bg-zinc-50 font-medium appearance-none cursor-pointer"
                style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundPosition: 'right 10px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
              >
                <option value="" disabled hidden>Select technical topic...</option>
                {subCategoryData[category].map((topic) => (
                  <option key={topic} value={topic.toLowerCase().replace(/[\s.]/g, '')}>
                    {topic}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Experience Select */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-black uppercase text-black tracking-wide">
              Experience Level
            </label>
            <select
              required
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
              className="w-full bg-white border-2 border-black p-2.5 text-sm text-black outline-none focus:bg-zinc-50 font-medium appearance-none cursor-pointer"
              style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'24\' height=\'24\' viewBox=\'0 0 24 24\' fill=\'none\' stroke=\'black\' stroke-width=\'2\' stroke-linecap=\'round\' stroke-linejoin=\'round\'><polyline points=\'6 9 12 15 18 9\'></polyline></svg>")', backgroundPosition: 'right 10px center', backgroundSize: '16px', backgroundRepeat: 'no-repeat' }}
            >
              <option value="" disabled hidden>Select level...</option>
              <option value="beginner">Beginner</option>
              <option value="intermediate">Intermediate</option>
              <option value="advanced">Advanced</option>
            </select>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="border-2 cursor-pointer border-black bg-white text-black px-4 py-2 text-xs font-black uppercase tracking-wider hover:bg-zinc-100 transition-colors shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="border-2 cursor-pointer border-black bg-black text-white px-5 py-2 text-xs font-black uppercase tracking-wider hover:bg-zinc-900 transition-colors shadow-[3px_3px_0px_0px_rgba(100,100,100,0.5)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {iscreating? "creating...": "create ground"}
            </button>
          </div>

        </form>
      </div>
    </div>
  );
}