// ExerciseButton.tsx
import React from "react";

interface ExerciseButtonProps {
  name: string;
  onClick: () => void;
  onDelete: () => void;
  onAddNew: () => void;
  onModify: () => void;
  isNew?: boolean;
}

const ExerciseButton: React.FC<ExerciseButtonProps> = ({
  name,
  onClick,
  onDelete,
  onAddNew,
  onModify,
  isNew,
}) => {
  return (
    <div className="relative">
      {/* Main Exercise Button */}
      <button
        onClick={onClick}
        className={`w-52 h-52 p-4 rounded-lg transition-colors ${
          isNew
            ? "bg-green-600 rounded-full text-white text-4xl font-bold hover:bg-green-800"
            : "bg-zinc-500 text-white hover:bg-zinc-600 font-semibold text-xl"
        } flex items-center justify-center`}
      >
        <span className="text-center">{name}</span>
      </button>

      {/* Actions Buttons Container - Bottom right of the exercise button */}
      {!isNew && (
        <div className="absolute bottom-0 right-0 flex space-x-2 p-2">
          {/* Delete Button with Tooltip */}
          <div className="relative group">
            <button
              onClick={onDelete}
              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors"
            >
              🗑️
            </button>
            <div className="absolute top-8 left-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1">
              Delete Exercise
            </div>
          </div>

          {/* Modify Button (Blue) with Tooltip */}
          <div className="relative group">
            <button
              onClick={onModify}
              className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors"
            >
              ✏️
            </button>
            <div className="absolute top-8 right-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1">
              Modify Exercise
            </div>
          </div>
        </div>
      )}

      {/* Add New Button (Green Plus) with Tooltip */}
      {!isNew && (
        <div className="relative group">
          <button
            onClick={onAddNew}
            className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-colors"
          >
            ➕
          </button>
          <div className="absolute top-8 right-0 hidden group-hover:block bg-black text-white text-xs rounded-md p-1">
            Add New Exercise
          </div>
        </div>
      )}
    </div>
  );
};

export default ExerciseButton;
