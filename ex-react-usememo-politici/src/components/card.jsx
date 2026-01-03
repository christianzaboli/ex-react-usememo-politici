export default function Card({ politician }) {
  const { name, image, position, biography } = politician;

  return (
    <div className="card">
      <h2>{name}</h2>
      <img className="card-image" src={image} alt={name} />
      <strong>{position}</strong>
      <p>{biography}</p>
    </div>
  );
}
