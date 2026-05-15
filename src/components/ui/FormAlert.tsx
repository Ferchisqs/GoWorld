import React, { useEffect, useState } from "react";

interface FormAlertProps {
  type: "success" | "error";
  message: string;
  onClose: () => void;
}

const FormAlert: React.FC<FormAlertProps> = ({ type, message, onClose }) => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const enter = requestAnimationFrame(() => setVisible(true));
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 400);
    }, 5000);
    return () => {
      cancelAnimationFrame(enter);
      clearTimeout(timer);
    };
  }, [onClose]);

  const isSuccess = type === "success";

  return (
    <div
      className={[
        "flex items-start gap-3 p-4 rounded-2xl border",
        "transition-all duration-400 ease-out",
        visible ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2",
        isSuccess
          ? "bg-[#8ED77C]/15 border-[#8ED77C] text-neutral-900 dark:text-white"
          : "bg-red-50 dark:bg-red-900/20 border-red-400 text-red-700 dark:text-red-400",
      ].join(" ")}
      role="alert"
    >
      {/* Icon */}
      <span className="flex-shrink-0 mt-0.5">
        {isSuccess ? (
          <svg
            className="w-5 h-5 text-[#8ED77C]"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        ) : (
          <svg
            className="w-5 h-5 text-red-500"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v4m0 4h.01M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"
            />
          </svg>
        )}
      </span>

      <p className="flex-1 text-sm font-medium font-[Poppins]">{message}</p>

      {/* Close button */}
      <button
        onClick={() => {
          setVisible(false);
          setTimeout(onClose, 400);
        }}
        aria-label="Close"
        className="flex-shrink-0 opacity-60 hover:opacity-100 transition-opacity"
      >
        <svg
          className="w-4 h-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
};

export default FormAlert;