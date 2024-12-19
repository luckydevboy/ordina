import { ReactNode } from "react";

type Props = {
  title?: string;
  subTitle?: string;
  children?: ReactNode;
};

const Card = ({ children, title, subTitle }: Props) => {
  return (
    <div className="p-4 rounded-xl shadow-md bg-white text-gray-800 border border-gray-100">
      {title && <h2 className="text-xl font-bold text-gray-800">{title}</h2>}
      {subTitle && <p className="text-gray-600 font-semibold mb-4">{subTitle}</p>}
      {children}
    </div>
  );
};

export default Card;
