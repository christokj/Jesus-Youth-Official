import { isRouteErrorResponse, Link, useRouteError } from "react-router-dom";
import Reveal from "../../components/Reveal";

export function ErrorPage() {
  const error = useRouteError();
  const title = isRouteErrorResponse(error) ? `${error.status} ${error.statusText}` : "Something went wrong";
  const message = isRouteErrorResponse(error)
    ? error.data?.message || "The page you requested could not be loaded."
    : "Please return to the homepage and try again.";

  return (
    <section className="section shell section--tight">
      <Reveal className="result-card glass-panel page-header--centered">
        <span className="eyebrow">Page unavailable</span>
        <h1>{title}</h1>
        <p>{message}</p>
        <Link to="/" className="button button--secondary">
          Go Home
        </Link>
      </Reveal>
    </section>
  );
}
