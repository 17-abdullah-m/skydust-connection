import { StorePage } from "../components/StorePage";

export default function ContactPage() {
  return (
    <StorePage title="Contact Us">
      <h2 className="text-lg font-medium text-black">Store timings</h2>
      <p>Monday – Sunday: 11:00 am – 10:00 pm · Karachi</p>
      <p>Monday – Sunday: 11:00 am – 9:00 pm · Lahore</p>
      <h2 className="text-lg font-medium text-black">WhatsApp</h2>
      <p>
        <a
          href="https://wa.me/96879007353"
          className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#25D366] text-white"
          aria-label="WhatsApp"
        >
          <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden>
            <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2 22l5.25-1.38c1.45.79 3.08 1.21 4.79 1.21 5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zm0 18.11c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.23 8.24-8.23 4.54 0 8.24 3.7 8.24 8.24 0 4.54-3.7 8.23-8.23 8.23zm4.52-6.16c-.25-.12-1.47-.72-1.7-.81-.23-.08-.39-.12-.56.12-.17.25-.64.81-.79.97-.15.17-.29.19-.54.06-.25-.12-1.05-.39-2-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.4-.42-.56-.42h-.48c-.17 0-.43.06-.66.31-.23.25-.87.85-.87 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.23 3.74 1.76.76 2.12.61 2.5.57.38-.04 1.47-.6 1.67-1.18.21-.58.21-1.07.15-1.18-.06-.1-.23-.17-.48-.29z" />
          </svg>
        </a>
      </p>
      <h2 className="text-lg font-medium text-black">Email</h2>
      <p>hello@skydust.pk</p>
      <h2 className="text-lg font-medium text-black">Karachi</h2>
      <p>DHA Phase 8, Karachi, Pakistan</p>
      <h2 className="text-lg font-medium text-black">Lahore</h2>
      <p>DHA Phase 6, Lahore, Pakistan</p>
    </StorePage>
  );
}
