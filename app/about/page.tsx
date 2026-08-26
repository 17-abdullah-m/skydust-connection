import { StorePage } from "../components/StorePage";

export default function AboutPage() {
  return (
    <StorePage title="About Us">
      <h2 className="text-lg font-medium text-black">Welcome to SKYDUST</h2>
      <p>
        SKYDUST is a scenting house for homes, hotels, offices, and cars. We
        sell automatic scent diffusers, aroma oils, reed diffusers, room
        sprays, and candles — with refill programs for teams that need scent
        on a schedule.
      </p>
      <p>
        Machines cover desks, cars, lobbies, and HVAC. Oils are blended for
        cold-air diffusion, without alcohol.
      </p>
      <h2 className="text-lg font-medium text-black">Commercial scenting</h2>
      <p>
        Hotels, retail, and workplaces use SKYDUST to keep a signature scent
        consistent across floors. Book an appointment to map rooms, pick a
        profile, and set refill cadence.
      </p>
    </StorePage>
  );
}
