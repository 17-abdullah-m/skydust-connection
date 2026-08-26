import { StorePage } from "../components/StorePage";

export default function ContactPage() {
  return (
    <StorePage title="Contact Us">
      <h2 className="text-lg font-medium text-black">Store timings</h2>
      <p>Monday – Sunday: 11:00 am – 10:00 pm · Karachi</p>
      <p>Monday – Sunday: 11:00 am – 9:00 pm · Lahore</p>
      <h2 className="text-lg font-medium text-black">Phone</h2>
      <p>Call: 03XX-XXXXXXX</p>
      <p>WhatsApp: 03XX-XXXXXXX</p>
      <h2 className="text-lg font-medium text-black">Email</h2>
      <p>hello@skydust.pk</p>
      <h2 className="text-lg font-medium text-black">Karachi</h2>
      <p>DHA Phase 8, Karachi, Pakistan</p>
      <h2 className="text-lg font-medium text-black">Lahore</h2>
      <p>DHA Phase 6, Lahore, Pakistan</p>
      <p className="text-neutral-500">
        Replace these placeholders with your live SKYDUST numbers and shop
        addresses.
      </p>
    </StorePage>
  );
}
