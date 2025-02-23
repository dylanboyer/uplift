import React from 'react';
import { FaTrophy, FaStar } from 'react-icons/fa';

interface Accomplishment {
  name: string;
  weight: number;
  repRange: string;
  exerciseType: string;
}

const fakeAccomplishments: Accomplishment[] = [
  {
    name: 'John Doe',
    weight: 225,
    repRange: '6-8',
    exerciseType: 'Bench Press',
  },
  {
    name: 'Jane Smith',
    weight: 150,
    repRange: '8-10',
    exerciseType: 'Deadlift',
  },
  {
    name: 'Chris Johnson',
    weight: 200,
    repRange: '5-7',
    exerciseType: 'Squat',
  },
];

const AccomplishmentsBox: React.FC = () => {
  return (
    <div className="bg-blue-500 text-white rounded-lg p-6 shadow-xl w-full sm:w-4/5 lg:w-9/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">
        Celebrating Accomplishments 🎉
      </h2>
      <div className="space-y-4">
        {fakeAccomplishments.map((accomplishment, index) => (
          <div
            key={index}
            className="flex items-center justify-between bg-blue-600 p-4 rounded-md shadow-md hover:shadow-lg transition-all ease-in-out"
          >
            <div className="flex items-center">
              <FaTrophy className="text-yellow-300 mr-3" />
              <p className="font-medium">
                {accomplishment.name} hit their goal of{' '}
                <span className="font-bold">{accomplishment.weight} lbs</span> in the{' '}
                <span className="font-bold">{accomplishment.repRange}</span> range on{' '}
                <span className="font-bold">{accomplishment.exerciseType}</span>!
              </p>
            </div>
            <FaStar className="text-yellow-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccomplishmentsBox;
