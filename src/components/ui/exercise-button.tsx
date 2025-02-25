// ExerciseButton.tsx
import React from "react";

interface ExerciseButtonProps {
  name: string;
  onClick: () => void;
  onDelete: () => void;
  onAddNew: () => void;
  onModify: () => void;
  onViewEntries: () => void;
  isNew?: boolean;
}

const ExerciseButton: React.FC<ExerciseButtonProps> = ({
  name,
  onClick,
  onDelete,
  onAddNew,
  onModify,
  onViewEntries,
  isNew,
}) => {
  return (
    <div className="relative">
      {/* Main Exercise Button */}
      <button
        onClick={onClick}
        className={`w-52 h-52 p-4 rounded-lg transition-colors ${
          isNew
            ? "bg-indigo-600 rounded-full text-white text-4xl font-bold hover:bg-indigo-500"
            : "bg-zinc-700 text-white hover:bg-zinc-600 font-semibold text-xl"
        } flex items-center justify-center relative`}
      >
        <span className="text-center">{name}</span>

        {/* Action Buttons Container - Positioned at the bottom of the exercise button */}
        {!isNew && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
            {/* Add New Button (Green Plus) with Tooltip */}
            <div className="relative group">
              <button
                onClick={onAddNew}
                className="p-2 rounded-md text-white transition-colors hover:bg-green-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
              </button>
              <div className="absolute bottom-8 left-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1 whitespace-nowrap">
                Add New Entry
              </div>
            </div>
            <div className="relative group">
              <button
                onClick={onViewEntries}
                className="p-2 rounded-md text-white transition-colors hover:bg-indigo-600"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="1.5"
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M2.036 12.322a1.012 1.012 0 0 1 0-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178Z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />
                </svg>
              </button>
              <div className="absolute bottom-8 left-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1 whitespace-nowrap">
                View Entries
              </div>
            </div>
            {/* Modify Button (Blue) with Tooltip */}
            <div className="relative group">
              <button
                onClick={onModify}
                className="p-2 rounded-md text-white transition-colors hover:bg-blue-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
                  />
                </svg>
              </button>
              <div className="absolute bottom-8 left-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1 whitespace-nowrap">
                Modify Exercise
              </div>
            </div>
            {/* Delete Button with Tooltip */}
            <div className="relative group">
              <button
                onClick={onDelete}
                className="p-2 rounded-md text-white transition-colors hover:bg-red-400"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                  />
                </svg>
              </button>
              <div className="absolute bottom-8 right-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1 whitespace-nowrap">
                Delete Exercise
              </div>
            </div>
          </div>
        )}
      </button>
    </div>
  );
};

export default ExerciseButton;
