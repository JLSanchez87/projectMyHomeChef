const Button = () => {
  return (
    <div className="button-container">
      <button onClick={() => handleClick("Click")}>Add New Recipe</button>
    </div>
  );
  function handleClick(str: string) {
    window.alert("Thanks for your application");
  }
};
export default Button;
