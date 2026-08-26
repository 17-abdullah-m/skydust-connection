import { StorePage } from "../components/StorePage";

const faqs = [
  {
    q: "Do oils work in every SKYDUST machine?",
    a: "Machine oils (500ml) fit Airmax, Splash, Ecoscent, and HVAC units. MINO and car units use their own cartridges.",
  },
  {
    q: "How long does a 500ml oil last?",
    a: "A small office usually finishes a bottle in 4–8 weeks. Hotels on HVAC use more. Book a visit for a room-by-room estimate.",
  },
  {
    q: "Can I return a used oil?",
    a: "Unopened bottles can be returned within 7 days. Opened fragrance cannot be restocked. See Return & Refund Policy.",
  },
  {
    q: "Do you install commercial machines?",
    a: "Yes. Book an appointment. An Admin account owns the workspace; Managers run refills after install.",
  },
  {
    q: "Is nationwide delivery free?",
    a: "Complimentary delivery is offered on qualifying orders inside Pakistan. Checkout shows the threshold for your cart.",
  },
];

export default function FaqsPage() {
  return (
    <StorePage title="FAQ's">
      {faqs.map((item) => (
        <div key={item.q}>
          <h2 className="text-base font-medium text-black">{item.q}</h2>
          <p>{item.a}</p>
        </div>
      ))}
    </StorePage>
  );
}
