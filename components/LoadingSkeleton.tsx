import React from 'react';

export const LoadingSkeleton: React.FC = () => {
  return (
    <div className="animate-pulse">
        {/* Hero Skeleton */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <div className="md:col-span-2 md:row-span-2 border border-gray-300 p-4 h-[600px] flex flex-col gap-4">
            <div className="h-8 bg-gray-300 w-3/4"></div>
            <div className="h-12 bg-gray-300 w-full"></div>
            <div className="h-64 bg-gray-300 w-full mt-2"></div>
            <div className="h-4 bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-200 w-full"></div>
            <div className="h-4 bg-gray-200 w-5/6"></div>
          </div>
          
          {/* Secondary Skeletons */}
          {[1, 2, 3, 4].map((i) => (
             <div key={i} className="border border-gray-300 p-4 h-[400px] flex flex-col gap-3">
               <div className="h-4 bg-gray-300 w-1/3"></div>
               <div className="h-8 bg-gray-300 w-full"></div>
               <div className="h-32 bg-gray-200 w-full mt-2"></div>
               <div className="h-3 bg-gray-200 w-full"></div>
               <div className="h-3 bg-gray-200 w-full"></div>
               <div className="h-3 bg-gray-200 w-4/5"></div>
             </div>
          ))}
       </div>
    </div>
  );
};