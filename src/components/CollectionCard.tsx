import { ReactNode } from "react";
import { Link } from "react-router-dom";

interface CollectionCardProps {
  children?: ReactNode;
  collection?: void;
  to: string,
}

const CollectionCard = ({ children, collection, to }: CollectionCardProps) => {
  return (
    <Link to={to}
      className="h-min flex flex-col gap-2 bg-gray-300 rounded-lg items-center px-2 py-1">
      {!collection && 
        <>{children}</>
      }
    </Link>
  )
};

export default CollectionCard;
