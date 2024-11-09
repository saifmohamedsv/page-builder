import { ComponentConfig } from "@measured/puck";
import { useState } from "react";

interface Review {
  id: string;
  customerName: string;
  rating: number;
  comment: string;
  createdAt: number;
}

interface FilterOption {
  value: string;
  label: string;
}

interface ReviewCardProps {
  review: Review;
  lang?: string;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ review }) => {
  const parseAndFormatDate = (timestamp: number) => {
    const date = new Date(timestamp).getFullYear();
    return date;
  };

  const formattedDate = parseAndFormatDate(review.createdAt);

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} className={`text-sm ${star <= rating ? "text-orange-400" : "text-gray-300"}`}>
            ★
          </span>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white">
      <div className="flex items-center mb-4">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center text-neutral-200">
          {review.customerName.charAt(0)}
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center gap-2">
            <span className="text-sm sm:text-base font-medium">{review.customerName}</span>
            <span className="text-xs sm:text-sm text-neutral-400">{formattedDate}</span>
          </div>
          {renderStarRating(review.rating)}
        </div>
      </div>
      <p className="text-sm sm:text-base text-neutral-600">{review.comment}</p>
    </div>
  );
};

interface FilterButtonProps {
  label: string;
  isActive: boolean;
  options: FilterOption[];
  onOptionSelect: (value: string) => void;
}

const FilterButton: React.FC<FilterButtonProps> = ({ label, isActive, options, onOptionSelect }) => {
  return (
    <div className="relative group">
      <button
        className={`px-3 py-2 text-sm border rounded-md
            ${isActive ? "border-blue-600 text-blue-600" : "border-gray-200 text-gray-700"} hover:bg-gray-50`}
      >
        {label}
      </button>
      <div className="hidden group-hover:block absolute z-10 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg">
        {options.map((option) => (
          <button
            key={option.value}
            className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-50"
            onClick={() => onOptionSelect(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

const mockReviews: Review[] = [
  {
    id: "1",
    customerName: "John Doe",
    rating: 5,
    comment: "Great product! Exactly what I was looking for.",
    createdAt: Date.now() - 86400000, // 1 day ago
  },
  {
    id: "2",
    customerName: "Jane Smith",
    rating: 4,
    comment: "Very good quality, but shipping took a while.",
    createdAt: Date.now() - 172800000, // 2 days ago
  },
  // Add more mock reviews as needed
];

interface ReviewsListProps {
  title?: string;
}

const ReviewsList: React.FC<ReviewsListProps> = ({ title = "Customer Reviews" }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState("newest");
  const [ratingFilter, setRatingFilter] = useState("all");

  const sortOptions: FilterOption[] = [
    { value: "newest", label: "Newest" },
    { value: "oldest", label: "Oldest" },
    { value: "highestRated", label: "Highest Rated" },
    { value: "lowestRated", label: "Lowest Rated" },
  ];

  const ratingOptions: FilterOption[] = [
    { value: "all", label: "All Ratings" },
    { value: "5", label: "5 Stars" },
    { value: "4", label: "4 Stars" },
    { value: "3", label: "3 Stars" },
    { value: "2", label: "2 Stars" },
    { value: "1", label: "1 Star" },
  ];

  return (
    <div className="border border-neutral-100 rounded-lg p-4">
      <div className="flex justify-between items-center mb-6 flex-wrap gap-4">
        <div className="flex items-center gap-2">
          <h2 className="font-bold text-lg sm:text-xl">{title}</h2>
          <span className="text-neutral-400 text-sm sm:text-base">({mockReviews.length})</span>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <FilterButton
            label={sortOptions.find((opt) => opt.value === sortBy)?.label || "Newest"}
            isActive={true}
            options={sortOptions}
            onOptionSelect={setSortBy}
          />
          <FilterButton
            label={ratingOptions.find((opt) => opt.value === ratingFilter)?.label || "All Ratings"}
            isActive={ratingFilter !== "all"}
            options={ratingOptions}
            onOptionSelect={setRatingFilter}
          />
        </div>
      </div>

      <div className="space-y-4">
        {mockReviews.map((review, index) => (
          <div key={review.id}>
            <ReviewCard review={review} />
            {index < mockReviews.length - 1 && <div className="my-4 border-b border-neutral-100" />}
          </div>
        ))}
      </div>

      {/* Simple Pagination */}
      <div className="mt-6 flex justify-center gap-2">
        {[1, 2, 3].map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`px-3 py-1 rounded ${
              currentPage === page ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            {page}
          </button>
        ))}
      </div>
    </div>
  );
};

export const reviewsListConfig: ComponentConfig<ReviewsListProps> = {
  fields: {
    title: {
      type: "text",
    },
  },
  defaultProps: {
    title: "Customer Reviews",
  },
  render: (props) => <ReviewsList {...props} />,
};
