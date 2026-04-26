import Reveal from "../../components/Reveal";
import {
  FaClock,
  FaEnvelope,
  FaFacebookF,
  FaInstagram,
  FaLocationDot,
  FaPhone,
  FaTelegram,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa6";

const contactChannels = [
  {
    title: "Call us",
    value: "+91 80896 77724",
    href: "tel:+918089677724",
    icon: <FaPhone />,
  },
  {
    title: "Email us",
    value: "jychengaloor@gmail.com",
    href: "mailto:jychengaloor@gmail.com",
    icon: <FaEnvelope />,
  },
  {
    title: "Visit us",
    value: "Our Lady of Mount Carmel Syro Malabar Catholic Church, Chengaloor",
    icon: <FaLocationDot />,
  },
];

const connectItems = [
  {
    title: "Instagram",
    value: "@jesusyouthchengaloor",
    href: "https://www.instagram.com/jesusyouthchengaloor?igsh=MWo3OTE5ZXprenhldg==",
    icon: <FaInstagram />,
  },
  {
    title: "Facebook",
    value: "Jesus Youth Chengaloor",
    href: "https://www.facebook.com/JesusYouthChengaloor",
    icon: <FaFacebookF />,
  },
  {
    title: "WhatsApp",
    value: "+91 80896 77724",
    href: "https://wa.me/918089677724",
    icon: <FaWhatsapp />,
  },
  {
    title: "YouTube",
    value: "@jesusyouthchengaloor",
    href: "https://youtube.com/@jesusyouthchengaloor?si=2P2ZQjNCUmq-eX0J",
    icon: <FaYoutube />,
  },
  {
    title: "Telegram",
    value: "@CHENGALOORJY",
    href: "https://t.me/CHENGALOORJY",
    icon: <FaTelegram />,
  },
];

const supportWays = [
  {
    title: "Prayer requests",
    text: "Share your intention with us, and we will hold it in prayer with care, faith, and confidentiality.",
  },
  {
    title: "Event details",
    text: "Reach out if you need help with registration, schedule clarity, venue directions, or participation details.",
  },
  {
    title: "Faith fellowship",
    text: "Whether you are new, returning, or simply curious, we would be happy to guide you into the community.",
  },
];

const visitDetails = [
  {
    label: "Gathering place",
    value: "Our Lady of Mount Carmel Syro Malabar Catholic Church, Chengaloor",
  },
  {
    label: "Best first contact",
    value: "WhatsApp or phone works best for quick replies and registration support.",
  },
  {
    label: "Prayer support",
    value: "You may send your prayer needs by phone, WhatsApp, or email anytime.",
  },
];

function ContactPage() {
  return (
    <section className="section shell section--tight">
      <Reveal className="page-header contact-hero">
        <span className="eyebrow">Contact us</span>
        <h1>Reach out in faith, and let us walk together in Christ.</h1>
        <p>
          If you need prayer, guidance, fellowship, or more details about the gathering, we are glad to hear
          from you. Our community is here to welcome, listen, and help you take the next step with peace.
        </p>

        <div className="contact-hero__actions">
          <a href="tel:+918089677724" className="button button--primary">
            Call now
          </a>
          <a href="mailto:jychengaloor@gmail.com" className="button button--secondary">
            Send email
          </a>
          <a href="https://wa.me/918089677724" target="_blank" rel="noreferrer" className="button button--ghost">
            Message on WhatsApp
          </a>
        </div>

        <div className="contact-hero__highlights">
          <div className="contact-highlight">
            <span>Prayer</span>
            <strong>We are here to pray with you and for you.</strong>
          </div>
          <div className="contact-highlight">
            <span>Guidance</span>
            <strong>Get help with registration, directions, and program details.</strong>
          </div>
          <div className="contact-highlight">
            <span>Community</span>
            <strong>Stay connected with the Jesus Youth family in Chengaloor.</strong>
          </div>
        </div>
      </Reveal>

      <div className="contact-layout">
        <Reveal>
          <article className="glass-panel contact-card contact-card--feature">
            <span className="contact-card__label">Prayerful contact</span>
            <h2>Simple ways to reach our team</h2>
            <p className="contact-card__text">
              Choose the contact method that feels easiest for you. We are happy to help with prayer support,
              event questions, and community connection.
            </p>
            <div className="contact-list">
              {contactChannels.map((item) =>
                item.href ? (
                  <a key={item.title} href={item.href} className="contact-row">
                    {item.icon}
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.value}</span>
                    </div>
                  </a>
                ) : (
                  <div key={item.title} className="contact-row">
                    {item.icon}
                    <div>
                      <strong>{item.title}</strong>
                      <span>{item.value}</span>
                    </div>
                  </div>
                ),
              )}
            </div>
          </article>
        </Reveal>

        <Reveal delay={120}>
          <article className="glass-panel contact-card contact-card--aside">
            <span className="contact-card__label">Quick help</span>
            <h2>When should you contact us?</h2>
            <div className="contact-support-list">
              {supportWays.map((item) => (
                <div key={item.title} className="contact-support-item">
                  <strong>{item.title}</strong>
                  <p>{item.text}</p>
                </div>
              ))}
            </div>

            <div className="contact-note">
              <FaClock />
              <p>For urgent clarification about the program, phone or WhatsApp is usually the fastest option.</p>
            </div>
          </article>
        </Reveal>

        <Reveal delay={200}>
          <article className="glass-panel contact-card">
            <span className="contact-card__label">Fellowship online</span>
            <h2>Stay connected beyond the event</h2>
            <p className="contact-card__text">
              Follow our updates, reflections, announcements, and community moments across our social platforms.
            </p>
            <div className="social-grid">
              {connectItems.map((item) => (
                <a key={item.title} href={item.href} target="_blank" rel="noreferrer" className="social-tile">
                  <span className="social-tile__icon">{item.icon}</span>
                  <strong>{item.title}</strong>
                  <span>{item.value}</span>
                </a>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={280}>
          <article className="glass-panel contact-card">
            <span className="contact-card__label">Plan your visit</span>
            <h2>Know before you come</h2>
            <div className="contact-detail-list">
              {visitDetails.map((item) => (
                <div key={item.label} className="contact-detail-item">
                  <span>{item.label}</span>
                  <strong>{item.value}</strong>
                </div>
              ))}
            </div>
          </article>
        </Reveal>

        <Reveal delay={360}>
          <article className="glass-panel contact-card contact-card--map">
            <span className="contact-card__label">Location</span>
            <h2>Find us here</h2>
            <p className="contact-card__text">
              Visit us at Our Lady of Mount Carmel Syro Malabar Catholic Church, Chengaloor, and join us in
              prayer, fellowship, and formation.
            </p>
            <div className="contact-map">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3924.205772911454!2d76.303234974513!3d10.405225265931932!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba7f98f65352b87%3A0x41240a2ca733542b!2sOur%20lady%20of%20Mount%20Carmel%20Syro%20Malabar%20Catholic%20Church%20Chengaloor!5e0!3m2!1sen!2sin!4v1776191878339!5m2!1sen!2sin"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Our Lady of Mount Carmel Syro Malabar Catholic Church Chengaloor"
              />
            </div>
          </article>
        </Reveal>
      </div>
    </section>
  );
}

export default ContactPage;
