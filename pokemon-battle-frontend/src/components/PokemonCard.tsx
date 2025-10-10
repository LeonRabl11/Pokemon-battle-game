type PokemonCardProps = {
  name: string;
  image: string;
};

const PokemonCard = ({ name, image }: PokemonCardProps) => {
  return (
    <div className="card bg-base-100 w-50 h-40 shadow-sm">
      <figure className="px-3 pt-10">
        <img src={image} alt="Shoes" className="rounded-xl" />
      </figure>
      <div className="card-body items-center text-center text-black">
        <h2 className="card-title">{name}</h2>
      </div>
    </div>
  );
};

export default PokemonCard;
