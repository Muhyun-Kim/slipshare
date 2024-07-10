export default function RecipeCard(drink: any) {
  return (
    <div className="p-4 bg-white rounded-lg shadow-md w-full max-w-md">
      <img
        src={drink.strDrinkThumb}
        alt={drink.strDrink}
        className="w-full h-auto mb-4 rounded-md"
      />
      <span className="text-xl text-black font-semibold mb-2">
        {drink.strDrink}
      </span>
    </div>
  );
}
