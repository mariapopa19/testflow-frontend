import React, { useState, useMemo, useEffect } from 'react';

interface JsonPreviewCellProps {
  value?: string | null;
  lineShown: number;
}

const JsonPreviewCell: React.FC<JsonPreviewCellProps> = ({
  value,
  lineShown,
}) => {
  const [expanded, setExpanded] = useState(false);

  const parsedJson = useMemo(() => {
    try {
      // Încercăm să parsăm JSON-ul, altfel returnăm string-ul original sau 'N/A'
      const parsed = JSON.parse(value ?? '{}');
      return JSON.stringify(parsed, null, 2);
    } catch {
      // Dacă parsing-ul eșuează, verificăm dacă valoarea nu este vidă
      return value && value.trim() !== '' ? value : 'N/A';
    }
  }, [value]);

  const lineCount = parsedJson.split('\n').length;
  const showExpand = lineCount > lineShown;

  useEffect(() => {
    setExpanded(false);
  }, [value]);


  return (
    <div className="relative">
      <pre
        className={`font-mono text-xs whitespace-pre-wrap break-words ${!expanded ? 'max-h-[6em] overflow-hidden' : ''}`}
      >
        {parsedJson}
      </pre>
      {showExpand && (
        <button
          className="text-xs text-black-600 mt-1 flex items-right absolute right-0 bottom-0 bg-white dark:bg-gray-800 rounded-md p-1 hover:bg-gray-100 dark:hover:bg-gray-700"
          onClick={() => setExpanded((prev) => !prev)}
        >
          {expanded ? (
            // collapse icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m4.5 15.75 7.5-7.5 7.5 7.5"
              />
            </svg>
          ) : (
            // expand icon
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m19.5 8.25-7.5 7.5-7.5-7.5"
              />
            </svg>
          )}
        </button>
      )}
    </div>
  );
};

export default JsonPreviewCell;
