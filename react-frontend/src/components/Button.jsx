// src/components/Button.jsx

const Button = ({
    children,
    onClick,
    type = "button",
    className = "",
    bgColor = "#FF7F11", // default orange
    hoverColor = "#FFB347", // default light orange
    textColor = "#FFFFFF", // default white
    disabled = false,
    loading = false,
  }) => {
    const activeBg = disabled ? "#E0E0E0" : bgColor;
    const activeHover = disabled ? "#E0E0E0" : hoverColor;
    const activeTextColor = disabled ? "#AAAAAA" : textColor;
  
    return (
      <button
        type={type}
        onClick={disabled || loading ? undefined : onClick}
        disabled={disabled || loading}
        style={{
          backgroundColor: activeBg,
          color: activeTextColor,
          cursor: disabled || loading ? "not-allowed" : "pointer",
        }}
        className={`py-2 px-4 rounded-md font-semibold transition-colors duration-300 hover:brightness-110 ${className}`}
        onMouseEnter={(e) => {
          if (!disabled && !loading && hoverColor) e.target.style.backgroundColor = activeHover;
        }}
        onMouseLeave={(e) => {
          if (!disabled && !loading && bgColor) e.target.style.backgroundColor = activeBg;
        }}
      >
        {loading ? "Loading..." : children}
      </button>
    );
  };
  
  export default Button;
  