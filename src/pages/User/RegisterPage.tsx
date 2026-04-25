import RegistrationForm from "../../components/RegistrationForm";

function RegisterPage() {
  return (
    <RegistrationForm
      eyebrow="Registration"
      title="Rooted in Christ, Chapter - 2"
      description="Clear, calm, and responsive form design for a smooth registration experience on every device. New registrations are being saved under program year 2026."
      successMessage="Registration completed successfully for 2026."
      successRedirectTo="/success"
    />
  );
}

export default RegisterPage;
