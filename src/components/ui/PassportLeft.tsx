interface PassportLeftProps {
  theme: string;
}

const PassportLeft = ({ theme }: PassportLeftProps) => {

  return (
    <div
      className={`relative flex flex-col items-start justify-between p-8 rounded-l-2xl rounded-r-none overflow-hidden min-h-[340px] transition-colors duration-300 ${
        theme === "dark" ? "bg-gray-100" : "bg-white"
      }`}
    >
      <div className="absolute left-0 top-0 h-full w-3 flex flex-col justify-around items-center py-3">
        {Array.from({ length: 18 }).map((_, i) => (
          <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
        ))}
      </div>

      <div className="ml-4 flex flex-col gap-4 w-full h-full">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img
            src="/images/logo/Logo.png"
            alt="Go World logo"
            className="h-10 object-contain"
          />
        </div>

        <div className="flex-1 flex items-center justify-center">
          <img
            src="/images/about/Sello.png"
            alt="Travel stamps"
            className="w-full max-w-xs sm:max-w-sm object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default PassportLeft;