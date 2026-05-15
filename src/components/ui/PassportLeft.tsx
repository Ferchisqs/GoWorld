interface PassportLeftProps {
  theme: string;
}

const PassportLeft = ({ theme }: PassportLeftProps) => (
  <div
    className={`relative flex flex-col items-start justify-between p-8 rounded-l-2xl rounded-r-none overflow-hidden min-h-[340px] transition-colors duration-300 ${
      theme === "dark" ? "bg-gray-100" : "bg-white"
    }`}
  >
    {/* Passport */}
    <div className="absolute left-0 top-0 h-full w-3 flex flex-col justify-around items-center py-3">
      {Array.from({ length: 18 }).map((_, i) => (
        <div key={i} className="w-2 h-2 rounded-full bg-gray-200" />
      ))}
    </div>

    <div className="ml-4 flex flex-col gap-6 w-full">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img
          src="/images/logo/Logo.png"
          alt="Go World logo"
          className="h-10 object-contain"
        />
      </div>

      {/* Image */}
      <div className="relative w-full h-52 sm:h-60">
        <img
          src="images/about/Sello.png"
          alt="Travel stamps"
          className="w-full h-full object-contain object-left"
        />
      </div>
    </div>
  </div>
);

export default PassportLeft;