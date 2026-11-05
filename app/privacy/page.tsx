import type { Metadata } from "next";
import PrivacyControls from "@/components/PrivacyControls";
import { PRODUCT } from "@/lib/product";

export const metadata: Metadata = {
  title: "Your privacy — NURRIE",
  description: "What NURRIE saves when you register interest, and how to leave the launch list.",
  referrer: "no-referrer",
};

export default function PrivacyPage() {
  return (
    <main className="privacy-page">
      <a className="skip-link" href="#removal-heading">Skip to leave the list</a>
      <header className="privacy-brand"><a href="/" aria-label="Back to NURRIE"><span>NURRIE</span><span>White foundation. Made for you.</span></a><img src={PRODUCT.fallback} width={1024} height={683} alt={PRODUCT.alt}/></header>
      <h1>Your email.<br />Your choice.</h1>
      <p>
        Registering interest gives NURRIE permission to contact you with product
        and launch news. It is free, and it is not a purchase or a reservation.
      </p>

      <h2>What we save</h2>
      <p>
        The launch list stores your email address, the time you agreed to receive
        updates, and a one-way hash of your private removal token. These records
        are stored in a Cloudflare D1 database used by this website.
      </p>
      <p>
        The signup does not ask for payment details or a postal address. This
        website does not add marketing analytics or advertising trackers.
        Hosting services may process basic request information to operate the site.
      </p>

      <h2>What happens next</h2>
      <p>
        Your email is saved for NURRIE product and launch updates. Registration
        does not send an automatic email, and the launch date has not yet been
        announced. Your details are not displayed on the website.
      </p>

      <h2>You can leave</h2>
      <p>
        A new registration receives a private removal link. Keep that link
        somewhere safe: anyone who has it can remove the associated email from
        the launch list. The site also remembers the removal token for the current
        browser session, when browser storage is available.
      </p>
      <p>
        The private part of the link follows the # symbol, so it is not sent with
        the page request. It is sent securely to the removal endpoint only when
        you choose to remove your email. A removal request deletes the associated
        registration from the active launch list.
      </p>
      <p>
        If you register an email that is already on the list, its original
        removal link stays valid. Registering again does not replace that link.
        Keep the original link to manage your registration later.
      </p>

      <PrivacyControls />
      <p className="small-copy">This note describes the signup features currently available on the NURRIE pre-launch website.</p>
    </main>
  );
}
