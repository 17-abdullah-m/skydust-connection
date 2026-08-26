import { StorePage } from "../components/StorePage";

const notes = [
  { name: "Aloe Green Tea", top: "Lime, aloe", heart: "Tea, orange blossom", base: "Musk" },
  { name: "Bakarat", top: "Saffron", heart: "Wood", base: "Amber, oud" },
  { name: "Bright", top: "Orange, lemon", heart: "Neroli", base: "White musk" },
  { name: "Cool Gentry", top: "Bergamot", heart: "Tea accord", base: "Cedar" },
  { name: "Elegant Frangipani", top: "Frangipani", heart: "Jasmine", base: "Sandal" },
  { name: "Aquatic Breeze", top: "Sea air", heart: "Lily", base: "Driftwood" },
  { name: "Neutral Air", top: "Ozone", heart: "Clean cotton", base: "Soft musk" },
  { name: "Black Jasmine", top: "Night bloom", heart: "Jasmine", base: "Amber" },
];

export default function ScentProfilesPage() {
  return (
    <StorePage title="Scent Profiles">
      <p>
        Each SKYDUST oil is written as top, heart, and base notes. Match a
        profile to the room: citrus for daytime, oud and jasmine for evening,
        Neutral Air where odor control matters.
      </p>
      <ul className="space-y-4">
        {notes.map((item) => (
          <li key={item.name} className="border-b border-neutral-200 pb-4">
            <p className="font-medium text-black">{item.name}</p>
            <p>Top: {item.top}</p>
            <p>Heart: {item.heart}</p>
            <p>Base: {item.base}</p>
          </li>
        ))}
      </ul>
    </StorePage>
  );
}
