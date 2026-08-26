import { StorePage } from "../components/StorePage";

export default function PrivacyPage() {
  return (
    <StorePage title="Privacy Policy">
      <p>
        SKYDUST keeps the name, email, phone, and delivery address you give us
        so we can fulfil orders and refill schedules. We do not sell that list.
      </p>
      <p>
        Payment processors see only what they need to take the charge. You can
        ask us to delete an account email after open orders are closed.
      </p>
    </StorePage>
  );
}
