import { Link } from "react-router-dom";
import {
  FaArrowRight,
  FaCalendarDays,
  FaHandsPraying,
  FaHeart,
  FaPeopleGroup,
} from "react-icons/fa6";
import Reveal from "../../components/Reveal";

const highlights = [
  {
    title: "Prayer that centers the heart",
    text: "Scripture-led gatherings, adoration moments, and quiet spaces where hearts can be still before the Lord and listen for His voice.",
    icon: <FaHandsPraying />,
  },
  {
    title: "Community that feels like home",
    text: "A warm Christian youth family where faith, friendship, and belonging grow together as one body in Christ, carrying one another in love.",
    icon: <FaPeopleGroup />,
  },
  {
    title: "Mission with tenderness and purpose",
    text: "Formed to carry Christ into daily life through service, witness, and joyful discipleship, shining His light before the world.",
    icon: <FaHeart />,
  },
];

const metrics = [
  { value: "1 Day", label: "A day of worship, Word, and fellowship" },
  { value: "30+", label: "Units walking together as one body in Christ" },
  { value: "Psalm 119:105", label: "God's Word as our light and path" },
];

const journey = [
  {
    title: "Welcome and worship",
    text: "A peaceful arrival experience with guided worship, music, and space to lift holy hands in praise, for the joy of the Lord is our strength.",
  },
  {
    title: "Formation and reflection",
    text: "Thoughtful sessions that connect Scripture, identity, and everyday Christian living, helping young people remain rooted and built up in Christ.",
  },
  {
    title: "Community and mission",
    text: "Conversations, prayer circles, and next steps that continue beyond the event day, so we may go and bear fruit that lasts.",
  },
];

function HomePage() {
  return (
    <div className="page-stack">
      <section className="hero shell">
        <div className="hero__layout">
          <Reveal className="hero__content">
            <span className="eyebrow">Jesus Youth Chengaloor</span>
            <h1 className="hero__title">Come to the Lord with joy, grow in His Word, and walk together in His love.</h1>
            <p className="hero__text">
              Jesus Youth Chengaloor is a place of worship, prayer, fellowship, and mission where young
              hearts are invited to seek first the Kingdom of God, remain rooted in Christ, and be filled
              with the peace that surpasses all understanding.
            </p>
            <div className="hero__actions">
              <Link to="/register-page" className="button button--primary">
                Join the Gathering
              </Link>
              <Link to="/contact-page" className="button button--secondary">
                Reach the Prayer Team
              </Link>
            </div>
            <div className="hero__metrics">
              {metrics.map((item) => (
                <div key={item.label} className="metric glass-panel">
                  <strong>{item.value}</strong>
                  <span>{item.label}</span>
                </div>
              ))}
            </div>
          </Reveal>

          <Reveal className="hero__visual" delay={150}>
            <div className="hero-card glass-panel">
              <div className="hero-card__glow" />
              <p className="hero-card__label">Theme verse</p>
              <h2>“Be still, and know that I am God.”</h2>
              <p className="hero-card__verse">Psalm 46:10</p>
              <div className="hero-card__details">
                <div>
                  <span>Gathering theme</span>
                  <strong>Rooted in Christ, bearing fruit in love</strong>
                </div>
                <div>
                  <span>Word for the journey</span>
                  <strong>“Your word is a lamp to my feet.” Psalm 119:105</strong>
                </div>
              </div>
              <div className="hero-card__badge">
                <FaCalendarDays />
                <span>“The Lord is my shepherd; I shall not want.” Psalm 23:1</span>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section shell">
        <Reveal className="section-heading">
          <span className="eyebrow">Our calling</span>
          <h2>Everything here points hearts toward Jesus, His Word, and His presence.</h2>
          <p>
            This website is shaped to reflect the beauty of holiness, the calm of prayer, and the hope of
            the Gospel, so every visitor may be reminded to taste and see that the Lord is good.
          </p>
        </Reveal>

        <div className="card-grid card-grid--three">
          {highlights.map((item, index) => (
            <Reveal key={item.title} delay={index * 120}>
              <article className="feature-card glass-panel">
                <div className="feature-card__icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="section shell">
        <div className="two-column">
          <Reveal>
            <div className="glass-panel content-card">
              <span className="eyebrow">Spiritual journey</span>
              <h2>Gather, listen, pray, and be strengthened in the Lord.</h2>
              <p>
                From the first welcome to the final prayer, this journey is meant to help each person draw
                near to God, delight in Scripture, abide in Christ, and walk in step with the Holy Spirit.
              </p>
              <Link to="/register-page" className="inline-link">
                Offer your registration <FaArrowRight />
              </Link>
            </div>
          </Reveal>

          <div className="timeline">
            {journey.map((item, index) => (
              <Reveal key={item.title} delay={index * 140}>
                <article className="timeline__item glass-panel">
                  <span className="timeline__index">0{index + 1}</span>
                  <div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section shell">
        <Reveal className="cta-panel glass-panel">
          <div>
            <span className="eyebrow">Come and see</span>
            <h2>Join us in worship, fellowship, and the joy of the Gospel.</h2>
            <p>
              Register now and walk with a community that seeks the face of the Lord, treasures His Word,
              and believes that those who wait upon the Lord shall renew their strength. Isaiah 40:31
            </p>
          </div>
          <div className="cta-panel__actions">
            <Link to="/register-page" className="button button--primary">
              Register in Faith
            </Link>
            <Link to="/admin-login" className="button button--secondary">
              Steward Access
            </Link>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

export default HomePage;
