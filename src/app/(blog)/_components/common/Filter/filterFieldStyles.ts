export const filterLabelClassName = "mb-1 block opacity-70";

export const filterFieldClassName =
  "w-full border text-sm rounded-lg block p-2.5 bg-background border-gray-600 placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500";

export const filterSelectClassName = `${filterFieldClassName} cursor-pointer appearance-none`;

export const filterSelectStyle = {
  backgroundImage:
    "url(\"data:image/svg+xml;utf8,<svg fill='none' height='20' viewBox='0 0 20 20' width='20' xmlns='http://www.w3.org/2000/svg'><path d='M6 8l4 4 4-4' stroke='%236B7280' stroke-width='1.5' stroke-linecap='round' stroke-linejoin='round'/></svg>\")",
  backgroundRepeat: "no-repeat" as const,
  backgroundPosition: "right 0.5rem center",
  backgroundSize: "1.5em 1.5em",
};

export const filterFieldWrapperClassName = "flex-1 text-sm";
