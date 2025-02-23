import React from 'react';
import { FaTrophy, FaStar } from 'react-icons/fa';
import { useFetchAccomplishments } from "@/hooks/use-user";

const AccomplishmentsBox: React.FC<{ user_id?: string }> = ({ user_id }) => {
  if (!user_id) {
    return <div>Loading accomplishments...</div>; // Ensure valid user_id before fetching
  }

  const { accomplishments, loading, error } = useFetchAccomplishments(user_id);

  if (loading) return <div>Loading accomplishments...</div>;
  if (error) return <div className="text-red-500">Error: {error}</div>;
  if (!accomplishments || accomplishments.length === 0) return <div>No accomplishments to display.</div>;

  return (
    <div className="bg-blue-500 text-white rounded-lg p-6 shadow-xl w-full sm:w-4/5 lg:w-9/12 mx-auto">
      <h2 className="text-2xl font-bold text-center mb-4">Your Accomplishments 🎉</h2>
      
      {/* Display raw array of accomplishments */}
      <pre className="bg-blue-700 p-4 rounded-md shadow-md mb-4 overflow-auto">
        {JSON.stringify(accomplishments, null, 2)}
      </pre>

      <div className="space-y-4">
        {accomplishments.map((accomplishment, index) => (
          <div key={index} className="flex items-center justify-between bg-blue-600 p-4 rounded-md shadow-md hover:shadow-lg transition-all ease-in-out">
            <div className="flex items-center">
              <FaTrophy className="text-yellow-300 mr-3" />
              <p className="font-medium">{accomplishment}</p>
            </div>
            <FaStar className="text-yellow-500" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccomplishmentsBox;
