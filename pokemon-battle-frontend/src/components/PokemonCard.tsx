type PokemonCardProps = {
  name: string;
  image: string;
};

const PokemonCard = ({ name, image }: PokemonCardProps) => {
  return (
    <div className="card w-40 bg-base-100 shadow-md items-center hover:scale-105 transition-transform duration-300 cursor-pointer">
      <img src={image} alt={name} className="w-24 h-24 object-contain" />
      <h2 className="card-title text-sm p-2 items-center text-center font-bold capitalize text-black">
        {name}
      </h2>
    </div>
  );
};

export default PokemonCard;
