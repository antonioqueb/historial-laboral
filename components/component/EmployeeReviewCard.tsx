import React from "react";
import { FaStar, FaStarHalfAlt, FaRegStar, FaUser } from "react-icons/fa";
import { Card } from "@/components/ui/card"; // Asegúrate de que este componente soporte estilos personalizados

// Definimos una interfaz para las props
interface EmployeeReviewCardProps {
  name: string;
  actividad: string;
  overallRating: number;
  reviews: {
    rating: number;
    review: string;
    date: string;
  }[];
  avatarUrl?: string;
}

// Definimos la animación del gradiente
const gradientAnimation = `
  @keyframes gradient-x {
    0%, 100% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
  }
`;

export function EmployeeReviewCard({ name, actividad, overallRating, reviews, avatarUrl }: EmployeeReviewCardProps) {
  return (
    <Card className="flex flex-col md:flex-row items-center gap-6 p-6 shadow-md rounded-lg text-white transition-transform transform hover:scale-105 hover:shadow-xl" style={{
      background: 'linear-gradient(270deg,  #6C757D98, #6C757D)',
      backgroundSize: '400% 400%',
      animation: 'gradient-x 35s ease infinite'
    }}>
      <style>
        {gradientAnimation}
      </style>
      {avatarUrl ? (
        <img src={avatarUrl} alt="Employee Avatar" width={80} height={80} className="rounded-full border-4 border-white shadow-lg" />
      ) : (
        <div className="flex items-center justify-center w-20 h-20 rounded-full border-4 border-white shadow-lg bg-zinc-300">
          <FaUser className="w-10 h-10 text-white" />
        </div>
      )}
      <div className="grid gap-2 flex-1">
        <div className="flex flex-col md:flex-row items-center justify-between">
          <div>
            <h3 className="text-xl font-bold">{name}</h3>
            <p className="text-sm">{actividad}</p>
          </div>
          <div className="flex items-center gap-2 text-sm font-medium mt-2 md:mt-0">
            <StarRating rating={overallRating} />
            <span>{overallRating.toFixed(1)}</span>
          </div>
        </div>
        {reviews.map((review, index) => (
          <ReviewCard key={index} rating={review.rating} review={review.review} date={review.date} />
        ))}
      </div>
    </Card>
  );
}

interface ReviewCardProps {
  rating: number;
  review: string;
  date: string;
}

function ReviewCard({ rating, review, date }: ReviewCardProps) {
  return (
    <div className="p-4 border border-white rounded-md bg-white bg-opacity-10">
      <div className="flex items-center justify-between">
        <StarRating rating={rating} />
        <span className="text-xs text-zinc-300">{date}</span>
      </div>
      <p className="text-sm mt-2">{review}</p>
    </div>
  );
}

interface StarRatingProps {
  rating: number;
}

function StarRating({ rating }: StarRatingProps) {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    if (rating >= i + 1) {
      stars.push(<FaStar key={i} className="w-6 h-6 text-yellow-500" />);
    } else if (rating >= i + 0.75) {
      stars.push(<FaStarHalfAlt key={i} className="w-6 h-6 text-yellow-500" />);
    } else if (rating >= i + 0.5) {
      stars.push(
        <div key={i} className="relative">
          <FaStarHalfAlt className="w-6 h-6 text-yellow-500" />
          <FaRegStar className="w-6 h-6 text-zinc-400 absolute top-0 left-0" />
        </div>
      );
    } else if (rating >= i + 0.25) {
      stars.push(
        <div key={i} className="relative">
          <FaStarHalfAlt className="w-6 h-6 text-yellow-500" style={{ clipPath: 'polygon(0 0, 50% 0, 50% 100%, 0% 100%)' }} />
          <FaRegStar className="w-6 h-6 text-zinc-400 absolute top-0 left-0" />
        </div>
      );
    } else {
      stars.push(<FaRegStar key={i} className="w-6 h-6 text-zinc-400" />);
    }
  }

  return <div className="flex items-center gap-1">{stars}</div>;
}
