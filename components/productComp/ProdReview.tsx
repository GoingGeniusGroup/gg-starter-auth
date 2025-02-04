import React from "react";
import { Star } from "lucide-react";
interface Review {
  id: number;
  user: string;
  rating: number;
  comment: string;
  date: string;
}
interface ReviewSectionProps {
  reviews: Review[];
}
const getInitial = (name: string) => {
  return name.charAt(0).toUpperCase();
};
const getProfileColor = (name: string) => {
  const colors = [
    "bg-blue-100 text-blue-600",
    "bg-green-100 text-green-600",
    "bg-pink-100 text-pink-600",
    "bg-purple-100 text-purple-600",
    "bg-indigo-100 text-indigo-600",
  ];
  const index = name.length % colors.length;
  return colors[index];
};
export const ProdReview: React.FC<ReviewSectionProps> = ({ reviews }) => {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-900 dark:text-slate-50 mb-6">
        Customer Reviews
      </h2>
      <div className="space-y-6">
        {reviews.map((review) => (
          <div key={review.id} className="border-b border-gray-200 pb-6">
            <div className="flex items-center gap-4 mb-3">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${getProfileColor(review.user)}`}
              >
                {getInitial(review.user)}
              </div>
              <div className="flex flex-col">
                <span className="font-medium text-gray-900 dark:text-slate-50">{review.user}</span>
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-500">{review.date}</span>
                </div>
              </div>
            </div>
            <p className="text-gray-700 ml-14 dark:text-slate-200">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
