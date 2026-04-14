import Reveal from "../../components/Reveal";
import { FaEnvelope, FaFacebookF, FaInstagram, FaLocationDot, FaPhone, FaWhatsapp } from "react-icons/fa6";

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
    value: "+91 62821 30289",
    href: "https://wa.me/916282130289",
    icon: <FaWhatsapp />,
  },
];

function ContactPage() {
  return (
    <section className="section shell section--tight">
      <Reveal className="page-header">
        <span className="eyebrow">Contact us</span>
        <h1>Reach out in faith, and let us walk together in Christ.</h1>
        <p>
          If you need prayer, guidance, fellowship, or more details about the gathering, we are glad to
          hear from you. “Carry each other’s burdens, and in this way you will fulfill the law of Christ.”
        </p>
      </Reveal>

      <div className="contact-layout">
        <Reveal>
          <article className="glass-panel contact-card">
            <h2>Prayerful contact</h2>
            <div className="contact-list">
              <a href="tel:+916282130289" className="contact-row">
                <FaPhone />
                <div>
                  <strong>Phone</strong>
                  <span>+91 62821 30289</span>
                </div>
              </a>
              <a href="mailto:jychengaloor@gmail.com" className="contact-row">
                <FaEnvelope />
                <div>
                  <strong>Email</strong>
                  <span>jychengaloor@gmail.com</span>
                </div>
              </a>
              <div className="contact-row">
                <FaLocationDot />
                <div>
                  <strong>Location</strong>
                  <span>Our Lady of Mount Carmel Syro Malabar Catholic Church, Chengaloor</span>
                </div>
              </div>
            </div>
          </article>
        </Reveal>

        <Reveal delay={140}>
          <article className="glass-panel contact-card">
            <h2>Stay connected in fellowship</h2>
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

        <Reveal delay={220}>
          <article className="glass-panel contact-card contact-card--map">
            <h2>Find us here</h2>
            <p className="contact-card__text">
              Visit us at Our Lady of Mount Carmel Syro Malabar Catholic Church, Chengaloor.
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
