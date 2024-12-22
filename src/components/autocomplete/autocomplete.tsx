import { InputHTMLAttributes, useEffect, useState } from "react";
import { cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";
import "./loader.css";
import { useDebounce } from "use-debounce";

type Props = {
  className?: string;
  searchField: string;
  apiUrl: string;
  resultsLength?: number;
} & InputHTMLAttributes<HTMLInputElement>;

const Autocomplete = ({
  className,
  value,
  searchField,
  apiUrl,
  resultsLength = 10,
  ...restProps
}: Props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState([]);
  const [debouncedValue] = useDebounce(value, 300);

  const fetchSearch = async () => {
    setIsLoading(true);

    try {
      const res = await fetch(apiUrl);
      const data = await res.json();
      setResults(data);
    } catch (error: any) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (debouncedValue) fetchSearch();
  }, [debouncedValue]);

  const renderContent = () => {
    if (isLoading) {
      return <li className="loader mx-auto" />;
    }

    if (error) {
      return <li className="text-red-500">{error?.toString()}</li>;
    }

    return (
      <>
        {results.length ? (
          results.map((result, index) => (
            <li className="text-gray-800" key={result[searchField] + index}>
              {result[searchField]}
            </li>
          ))
        ) : (
          <li className="text-gray-800">No results found</li>
        )}
      </>
    );
  };

  return (
    <div className="relative">
      <input
        type="text"
        className={twMerge(
          cx(
            "bg-white border-x border-t border-gray-200 outline-none " +
              "rounded-x-xl rounded-t-xl px-4 h-12 w-full text-gray-800",
            !value && "border rounded-xl",
            className,
          ),
        )}
        value={value}
        {...restProps}
      />

      {value && (
        <>
          <hr className="mx-4" />
          <ul
            className="p-4 rounded-x-xl rounded-b-xl bg-white border-x
            border-b border-gray-200 absolute w-full space-y-2"
          >
            {renderContent()}
          </ul>
        </>
      )}
    </div>
  );
};

export default Autocomplete;
