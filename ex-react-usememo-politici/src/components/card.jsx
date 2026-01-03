import { memo } from "react";
const card = memo(function Card({ politician }) {
  const { name, image, position, biography } = politician;
  console.log("card of", name, "rendered at", new Date().toLocaleTimeString());

  return (
    <div className="card">
      <h2>{name}</h2>
      <img className="card-image" src={image} alt={name} />
      <strong>{position}</strong>
      <p>{biography}</p>
    </div>
  );
});
export default card;
