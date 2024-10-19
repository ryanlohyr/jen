const FilledHeart = ({
  className,
  disableHovering = false,
}: {
  className?: string;
  disableHovering?: boolean;
}) => {
  return (
    <svg
      className={`${className} fill-current  text-lunaPink transition-transform ${
        disableHovering ? "" : "hover:scale-110"
      }`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      aria-hidden="true"
      role="presentation"
      focusable="false"
      style={{
        display: "block",
        height: "24px",
        stroke: "white",
        strokeWidth: "2",
        width: "24px",
        overflow: "visible",
      }}
    >
      <path d="M16 28c7-4.73 14-10 14-17a6.98 6.98 0 0 0-7-7c-1.8 0-3.58.68-4.95 2.05L16 8.1l-2.05-2.05a6.98 6.98 0 0 0-9.9 0A6.98 6.98 0 0 0 2 11c0 7 7 12.27 14 17z" />
    </svg>
  );
};

export default FilledHeart;
