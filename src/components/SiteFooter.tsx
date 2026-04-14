import { Link } from "react-router-dom";
import { FaFacebookF, FaInstagram, FaWhatsapp } from "react-icons/fa6";

const socialLinks = [
  {
    label: "Instagram",
    href: "https://www.instagram.com/jesusyouthchengaloor?igsh=MWo3OTE5ZXprenhldg==",
    icon: <FaInstagram />,
  },
  {
    label: "Facebook",
    href: "https://www.facebook.com/JesusYouthChengaloor",
    icon: <FaFacebookF />,
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/916282130289",
    icon: <FaWhatsapp />,
  },
];

function SiteFooter() {
  return (
    <footer className="site-footer shell">
      <div className="site-footer__panel glass-panel">
        <div>
          <p className="eyebrow">Jesus Youth Chengaloor</p>
          <h2 className="site-footer__title">A house of prayer, fellowship, and hope in Christ.</h2>
          <p className="site-footer__text">
            We desire to welcome young people into the love of Jesus, the truth of His Word, and the joy
            of walking together as His disciples.
          </p>
        </div>

        <div>
          <h3 className="site-footer__heading">Walk With Us</h3>
          <div className="site-footer__links">
            <Link to="/">Home</Link>
            <Link to="/register-page">Register</Link>
            <Link to="/contact-page">Contact</Link>
            {/* <Link to="/admin-login">Admin</Link> */}
          </div>
        </div>

        <div>
          <h3 className="site-footer__heading">Stay in Fellowship</h3>
          <div className="site-footer__socials">
            {socialLinks.map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noreferrer"
                aria-label={item.label}
                className="social-button"
              >
                {item.icon}
              </a>
            ))}
          </div>
          <p className="site-footer__text">Email: jychengaloor@gmail.com</p>
          <p className="site-footer__text">Phone: +91 62821 30289</p>
          <p className="site-footer__text">“Let all that you do be done in love.” 1 Corinthians 16:14</p>
        </div>
      </div>
      <div className="site-footer__bottom">
        <span>© 2026 Jesus Youth Chengaloor. All rights reserved.</span>
        <span>“The grace of the Lord Jesus be with you.” 1 Corinthians 16:23</span>
      </div>
    </footer>
  );
}

export default SiteFooter;
