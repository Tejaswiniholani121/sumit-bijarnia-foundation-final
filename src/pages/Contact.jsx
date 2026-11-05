import { useState } from "react";
import { Link } from "react-router-dom";
import PageShell from "../components/PageShell";
import SocialIcons from "../components/SocialIcons";
import PageMeta from "../components/PageMeta";
import { siteConfig } from "../config/site";

const WEB3FORMS_ACCESS_KEY = "12581f91-433b-472b-957d-308993095439";

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "General Enquiry",
    message: "",
  });

  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const update = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submit = async (e) => {
    e.preventDefault();

    setSubmitting(true);
    setStatus("");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },

        body: JSON.stringify({
          access_key: WEB3FORMS_ACCESS_KEY,

          name: form.name,
          email: form.email,
          phone: form.phone,
          enquiry_type: form.subject,
          message: form.message,

          subject: `New Website Enquiry - ${form.subject}`,
          from_name: "Sumit Bijarnia Foundation Website",

          botcheck: "",
        }),
      });

      const data = await response.json();

      console.log("Web3Forms response:", data);

      if (!response.ok || !data.success) {
        throw new Error(data.message || "Unable to submit enquiry.");
      }

      setStatus("success");

      setForm({
        name: "",
        email: "",
        phone: "",
        subject: "General Enquiry",
        message: "",
      });
    } catch (error) {
      console.error("Enquiry form error:", error);
      setStatus("error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell className="v2-page contact-v2">
      <PageMeta
        title="Contact Us"
        description="Contact the Sumit Bijarnia Foundation for general enquiries, collaborations, volunteering, partnerships or donation-related questions."
      />

      <section className="v2-section v2-contact-section">
        <div className="container v2-contact-grid">

          <div className="v2-contact-copy" data-stagger>
            <span className="eyebrow">Contact us</span>

            <h1>Let’s start with a conversation.</h1>

            <p>
              For general enquiries, collaboration ideas, volunteering,
              partnerships or donation-related questions, reach the Foundation
              directly.
            </p>

            <div className="v2-contact-details">

              <div>
                <span>Email</span>

                <a href={`mailto:${siteConfig.email}`}>
                  {siteConfig.email}
                </a>
              </div>

              <div>
                <span>Phone / WhatsApp</span>

                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div>
                <span>Address</span>

                <p>{siteConfig.address}</p>
              </div>

            </div>

            <div className="v2-social-block">
              <span>Find the Foundation online</span>

              <SocialIcons />
            </div>
          </div>

          <form
            className="v2-contact-form"
            onSubmit={submit}
            data-reveal
          >
            <span className="eyebrow">Get in touch</span>

            <div className="form-row">

              <label>
                Name

                <input
                  required
                  name="name"
                  value={form.name}
                  onChange={update}
                  placeholder="Your name"
                />
              </label>

              <label>
                Email

                <input
                  required
                  type="email"
                  name="email"
                  value={form.email}
                  onChange={update}
                  placeholder="you@example.com"
                />
              </label>

            </div>

            <div className="form-row">

              <label>
                Phone

                <input
                  type="tel"
                  name="phone"
                  value={form.phone}
                  onChange={update}
                  placeholder="Your phone number"
                />
              </label>

              <label>
                Reason

                <select
                  name="subject"
                  value={form.subject}
                  onChange={update}
                >
                  <option>General Enquiry</option>
                  <option>Partnership</option>
                  <option>Volunteering</option>
                  <option>Donation</option>
                  <option>Idea</option>
                  <option>Other</option>
                </select>
              </label>

            </div>

            <label>
              Message

              <textarea
                required
                name="message"
                value={form.message}
                onChange={update}
                rows="7"
                placeholder="Tell us how we can help."
              />
            </label>

            <button
              className="btn btn-primary"
              type="submit"
              disabled={submitting}
            >
              <span>
                {submitting ? "Sending..." : "Send Enquiry"}
              </span>

              <span className="btn-arrow" aria-hidden="true">
                ↗
              </span>
            </button>

            {status === "success" && (
              <p className="form-success">
                Thank you. Your enquiry has been sent successfully.
                We’ll get back to you soon.
              </p>
            )}

            {status === "error" && (
              <p className="form-error">
                We couldn’t send your enquiry right now.
                Please try again.
              </p>
            )}

            <p className="v2-privacy-note">
              We respect your privacy. Your information will only be used to
              respond to your enquiry.{" "}
              <Link to="/privacy">
                Privacy Policy →
              </Link>
            </p>
          </form>

        </div>
      </section>
    </PageShell>
  );
}