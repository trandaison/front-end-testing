import { useState } from 'react';
import { Star } from '../icons/Star';

interface IFilterProps {
  minRating: number;
  onChangeHandler: (minRating: number) => void;
}

export function Filter(props: IFilterProps) {
  const { minRating, onChangeHandler } = props;

  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="mb-5 flex flex-col items-center">
      <h5 className="text-xl mb-2 font-bold leading-relaxed text-gray-800 dark:text-gray-300">
        Minimum Rating
      </h5>
      <div className="flex" onMouseLeave={() => setHoverRating(0)}>
        {Array(5)
          .fill("")
          .map((_, index) => (
            <span
              key={index}
              className={`w-5 mr-1 cursor-pointer ${
                index + 1 <= (hoverRating ? hoverRating : minRating)
                  ? "text-yellow-400"
                  : "text-gray-400"
              }`}
              onClick={() => onChangeHandler(index + 1)}
              onMouseOver={() => setHoverRating(index + 1)}
            ><Star /></span>
          ))}
      </div>
    </div>
  );
}
