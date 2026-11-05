import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import PageMeta from "../components/PageMeta";
import { siteConfig } from "../config/site";

export default function Donate() {
  return (
    <PageShell className="v2-page donate-v2">
      <PageMeta
        title="Donate"
        description="Support the Sumit Bijarnia Foundation through its official secure donation page."
      />

      <section className="v2-inner-hero v2-donate-hero">
        <div className="container v2-donate-hero-grid">

          <div className="v2-donate-copy">
            <span className="eyebrow light">
              Support the mission
            </span>

            <h1>
              Turn support into
              <br />
              <em>meaningful action.</em>
            </h1>

            <p>
              Your contribution can help the Sumit Bijarnia Foundation
              support thoughtful work across skin health, healthcare,
              education, rural development and community well-being.
            </p>

            <div className="v2-donate-tags">
              <span>Section 8 Company</span>
              <span>12AB Registered</span>
              <span>80G Approved</span>
            </div>
          </div>

          <div className="v2-donate-card">
            <span className="eyebrow light">
              Before you continue
            </span>

            <h2>
              Your support can help create meaningful impact.
            </h2>

            <p>
              You will be redirected to the Foundation’s official
              secure donation page to complete your contribution.
            </p>

            <a
              href={siteConfig.donationUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-light"
            >
              <span>Proceed to Donate</span>
              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </a>

            <Link
              to="/registration-tax"
              className="v2-donate-tax-link"
            >
              Registration & Tax Information →
            </Link>
          </div>

        </div>
      </section>
    </PageShell>
  );
}