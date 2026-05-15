import { useState } from "react";

interface ReviewCardProps {
  name: string;
  review: string;
  rating: number;
  avatar: string;
  theme: string;
}

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-0.5 mt-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <svg
        key={i}
        className={`w-4 h-4 ${i < rating ? "text-yellow-400" : "text-white/20"}`}
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
      </svg>
    ))}
  </div>
);

const ReviewCard = ({ name, review, rating, avatar, theme }: ReviewCardProps) => {
  const [open, setOpen] = useState(false);

  return (
    <div
      className={`group relative rounded-2xl p-4 transition-all duration-300 border
bg-white
shadow-[0_10px_30px_rgba(0,0,0,0.18)]
hover:shadow-[0_25px_70px_rgba(0,0,0,0.35)]
hover:-translate-y-2 cursor-pointer ${
        theme === "dark"
          ? "bg-[#f8f8f8] border-[#ffffff] hover:border-[#ffffff]"
          : "bg-[#ffffff] border-[#ffffff] hover:border-[#ffffff]"
      }`}
      onClick={() => setOpen((o) => !o)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && setOpen((o) => !o)}
      aria-expanded={open}
    >
      {/* Header row: avatar + name + stars + toggle */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-1 min-w-0">
          <img
            src={avatar}
            alt={name}
            className="w-10 h-10 rounded-full object-cover border-2 border-white/20 flex-shrink-0"
          />
          <div className="min-w-0">
            <p className="text-black text-sm font-semibold font-['Poppins'] leading-tight truncate">
              {name}
            </p>
            <StarRating rating={rating} />
          </div>
        </div>

        {/* Chevron toggle */}
        <span
          className={`text-black/40 flex-shrink-0 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>

      {/* Accordion review text */}
      <div
        className={`overflow-hidden transition-all duration-300 ${
          open ? "max-h-40 mt-3 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-black/60 text-xs font-['Poppins'] leading-relaxed border-t border-white/10 pt-3">
          {review}
        </p>
      </div>
    </div>
  );
};

export default ReviewCard;
export type { ReviewCardProps };