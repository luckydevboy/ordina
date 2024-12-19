import { ChangeEvent, useState } from "react";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const results = [
  { type: "company", text: "Facebook" },
  {
    type: "organization",
    text: "FasTrak",
    subtitle: "Government office, San Francisco, CA",
  },
  { type: "text", text: "face" },
  { type: "text", text: "facebook messenger" },
  { type: "text", text: "facebook stock" },
  { type: "television", text: "Faces of COVID", subtitle: "TV program" },
  { type: "musician", text: "Faces", subtitle: "Rock band" },
  { type: "television", text: "Faces of Death", subtitle: "Film series" },
];

type Props = {
  className?: string;
};

const Autocomplete = ({ className }: Props) => {
  const [resultIsOpen, setResultIsOpen] = useState(false);
  const [value, setValue] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div>
      <input
        type="text"
        className={twMerge(
          cx(
            "bg-white shadow-md border border-gray-100 outline-none " +
              "rounded-md px-4 h-12 w-full text-gray-800",
            className,
          ),
        )}
        value={value}
        onChange={handleChange}
      />

      {resultIsOpen && (
        <ul>
          {results.map((result, index) => (
            <li key={result.text + index}></li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Autocomplete;
