"use client"
import React, {useState} from 'react';

interface DeleteModalProps {
  onClose: () => void;
  onConfirm: () => void;
  title?: string;
}

export default function DeleteModal({
  onClose,
  onConfirm,
  title
}: DeleteModalProps) {

    const [isloading, setisloading] = useState<boolean>(false);

  return (
    <div className="fixed inset-0 z-60 flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm">
      {/* Modal Container with exact theme borders and shadow */}
      <div 
        className="w-full max-w-md bg-[#ededed] border-2 border-black p-6 shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] transition-all"
        role="dialog"
        aria-modal="true"
      >
        {/* Header Section */}
        

        {/* Warning Text */}
        <h2 className="text-xl font-black uppercase tracking-tight text-black mb-2 font-mono">
          Confirm Deletion
        </h2>
        <p className="text-sm font-medium text-gray-700 leading-relaxed mb-6">
          Are you sure you want to permanently delete <span className="font-bold underline decoration-1 underline-offset-2">{title}</span>? This action is immediate and cannot be undone.
        </p>

        {/* Action Buttons */}
        <div className="flex items-center justify-end gap-3 font-mono text-sm">
          {/* Cancel Button */}
          <button
            onClick={onClose}
            className="border-2 cursor-pointer border-black bg-white px-4 py-2 font-bold uppercase tracking-wider text-black transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] active:translate-x-0 active:translate-y-0 active:shadow-none"
          >
            Cancel
          </button>

          {/* Confirm Delete Button */}
          <button
            onClick={async() => {
              setisloading(true)  
              await onConfirm();
              setisloading(false);
              onClose();
            }}
            className="border-2 cursor-pointer border-black bg-black px-4 py-2 font-bold uppercase tracking-wider text-white transition-all hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[2px_2px_0px_0px_rgba(239,68,68,1)] bg-red-500 hover:bg-red-600"
          >
            {isloading? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
}