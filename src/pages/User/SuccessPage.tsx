import { Link } from "react-router-dom";
import Reveal from "../../components/Reveal";

function SuccessPage() {
  return (
    <section className="section shell section--tight">
      <Reveal className="result-card glass-panel page-header--centered">
        <span className="eyebrow">Registration complete</span>
        <h1>Thanks be to God, your registration has been received.</h1>
        <p>
          We look forward to welcoming you in the love of Christ. May the Lord bless your coming and fill
          your heart with peace, joy, and expectation.
        </p>
        <Link to="/" className="button button--primary">
          Return to the Home of Fellowship
        </Link>
      </Reveal>
    </section>
  );
}

export default SuccessPage;
