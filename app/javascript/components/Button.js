const Button = ({ children, props }) => (
  <button
    className="py-2 px-4 bg-violet-500 hover:bg-violet-600 active:bg-violet-700 focus-visible:ring ring-violet-300 text-white font-semibold rounded-lg transition duration-100"
    {...props}
  >
    {children}
  </button>
);

export default Button;
