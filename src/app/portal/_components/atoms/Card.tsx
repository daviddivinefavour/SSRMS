"use client";

type TCardProp = {
  className?: string;
  backgroundColor?: string;
  borderRadius?: string;
  cardPadding?: string;
  borderColor?: string;
  children: React.ReactNode;
  onClick?: () => void;
};

const Card = ({
  className = "",
  backgroundColor = "bg-white",
  borderRadius = "rounded-lg",
  cardPadding = "p-6",
  borderColor = "border-gray-300`",
  children,
  onClick,
}: TCardProp) => {
  return (
    <div
      className={`${backgroundColor} ${borderRadius} ${cardPadding} ${className} block border ${borderColor}`}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default Card;
