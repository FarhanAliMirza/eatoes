const ReviewCard = ({review, name}) => {
  return (
    <div className="bg-white p-6 rounded-lg h-full shadow-md">
      <p className="text-gray-600 italic">
        {review}
      </p>
      <div className="mt-4 font-semibold text-orange-500">- {name}.</div>
    </div>
  );
};

export default ReviewCard;
