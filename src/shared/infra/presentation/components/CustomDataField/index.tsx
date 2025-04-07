import * as React from "react";

import {
  DataFieldRootProps,
  DataFieldTitleProps,
  DataFieldContentProps,
  DataFieldContentTextProps,
  DataFieldContentDateProps,
  DataFieldContentTagProps,
} from "./types";

const CustomDataFieldRoot = ({
  children,
  className,
  ...props
}: DataFieldRootProps) => {
  return (
    <div className={`flex flex-col ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const CustomDataFieldTitle = ({
  children,
  className,
  ...props
}: DataFieldTitleProps) => {
  return (
    <h2
      className={`text-md text-gray-100-tk sm:text-lg ${className ?? ""}`}
      {...props}
    >
      {children}
    </h2>
  );
};

const CustomDataFieldContent = ({
  children,
  className,
  ...props
}: DataFieldContentProps) => {
  return (
    <div className={`flex text-md ${className ?? ""}`} {...props}>
      {children}
    </div>
  );
};

const CustomDataFieldContentText = ({
  children,
  className,
  ...props
}: DataFieldContentTextProps) => {
  return (
    <input
      type="text"
      placeholder="Digite aqui..."
      className={`min-h-[50px] rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk ${className ?? ""}`}
      {...props}
    >
      {children}
    </input>
  );
};

const CustomDataFieldContentDate = ({
  children,
  className,
  ...props
}: DataFieldContentDateProps) => {
  return (
    <input
      type="date"
      className={`min-h-[50px] rounded-lg bg-gray-700-tk px-0.5 text-gray-100-tk ${className ?? ""}`}
      {...props}
    >
      {children}
    </input>
  );
};

const CustomDataFieldContentTag = ({
  children,
  className,
  onTagsChange,
  initialTags = [],
  ...props
}: DataFieldContentTagProps) => {
  const [inputValue, setInputValue] = React.useState<string>("");
  const [tags, setTags] = React.useState<string[]>(initialTags);
  const [suggestions, setSuggestions] = React.useState<string[]>([]);
  const [showDropdown, setShowDropdown] = React.useState<boolean>(false);
  const inputRef = React.useRef<HTMLInputElement>(null);
  const dropdownRef = React.useRef<HTMLDivElement>(null);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const previousInitialTagsRef = React.useRef<string[]>(initialTags);

  // Atualiza as tags quando initialTags mudar
  React.useEffect(() => {
    // Use JSON.stringify para comparar os arrays
    const currentTags = JSON.stringify(initialTags);
    const previousTags = JSON.stringify(previousInitialTagsRef.current);
    
    // Só atualiza se forem diferentes
    if (currentTags !== previousTags) {
      setTags(initialTags);
      previousInitialTagsRef.current = initialTags;
    }
  }, [initialTags]);

  // Simulação de chamada à API para obter sugestões
  const fetchSuggestions = React.useCallback(
    (query: string) => {
      if (!query.trim()) {
        setSuggestions([]);
        setShowDropdown(false);
        return;
      }

      // Aqui seria feita a chamada à API real no futuro
      // Por enquanto, simulamos algumas sugestões
      const mockSuggestions = [
        "React",
        "TypeScript",
        "JavaScript",
        "Node.js",
        "TailwindCSS",
        "NextJS",
      ].filter(
        (tag) =>
          tag.toLowerCase().includes(query.toLowerCase()) &&
          !tags.includes(tag),
      );

      setSuggestions(mockSuggestions);
      setShowDropdown(true);
    },
    [tags],
  );

  const addTag = React.useCallback(
    (tag: string) => {
      const trimmedTag = tag.trim();
      if (trimmedTag && !tags.includes(trimmedTag)) {
        const newTags = [...tags, trimmedTag];
        setTags(newTags);
        onTagsChange?.(newTags);
        setInputValue("");
        setSuggestions([]);
        setShowDropdown(false);
      }
    },
    [tags, onTagsChange],
  );

  const removeTag = React.useCallback(
    (tagToRemove: string) => {
      const newTags = tags.filter((tag) => tag !== tagToRemove);
      setTags(newTags);
      onTagsChange?.(newTags);
    },
    [tags, onTagsChange],
  );

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`relative min-h-[50px] w-full ${className ?? ""}`}
      {...props}
    >
      <div className="flex w-full flex-col rounded-lg bg-gray-700-tk">
        <div className="relative w-full">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              fetchSuggestions(e.target.value);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter" && inputValue) {
                e.preventDefault();
                addTag(inputValue);
              }
            }}
            placeholder="Digite uma tag..."
            className="min-h-[50px] w-full max-w-[300px] rounded-md bg-gray-700-tk px-0.5 text-gray-100-tk"
          />

          {showDropdown && (
            <div
              ref={dropdownRef}
              className="bg-gray-800-tk border-gray-600-tk absolute z-10 max-h-[200px] w-full overflow-auto rounded-md border shadow-xl"
            >
              {suggestions.length > 0 ? (
                suggestions.map((suggestion) => (
                  <div
                    key={suggestion}
                    onClick={() => addTag(suggestion)}
                    className="hover:bg-gray-600-tk border-gray-600-tk cursor-pointer border-b bg-gray-700-tk px-0.5 py-0.5 text-md font-semi-bold text-gray-100-tk last:border-b-0"
                  >
                    {suggestion}
                  </div>
                ))
              ) : inputValue.trim() ? (
                <div
                  onClick={() => addTag(inputValue)}
                  className="hover:bg-gray-600-tk cursor-pointer bg-gray-700-tk px-0.5 py-0.5 text-md font-semi-bold text-gray-100-tk"
                >
                  Criar nova tag: {inputValue}
                </div>
              ) : null}
            </div>
          )}
        </div>

        <div
          className={`flex flex-wrap gap-0.5 ${tags.length > 0 ? "p-0.5" : ""}`}
        >
          {tags.map((tag) => (
            <div
              key={tag}
              className="py-0.25 inline-flex items-center gap-0.5 rounded-md bg-gray-500-tk px-0.5 text-gray-100-tk"
            >
              <span className="text-md font-semi-bold">{tag}</span>
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-gray-300-tk hover:text-gray-100-tk"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export const CustomDataField = {
  Root: CustomDataFieldRoot,
  Title: CustomDataFieldTitle,
  Content: CustomDataFieldContent,
  Text: CustomDataFieldContentText,
  Date: CustomDataFieldContentDate,
  Tag: CustomDataFieldContentTag,
};
