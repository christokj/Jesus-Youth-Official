import RegistrationForm from "../../components/RegistrationForm";

function AdminRegisterPage() {
  return (
    <RegistrationForm
      enablePreviousYearLookup
      eyebrow="Admin candidate entry"
      title="Add a new candidate from the admin dashboard"
      description="Use the same 2026 registration form here for direct admin entry. This version skips the previous-year name search and saves the candidate straight into the current batch."
      successMessage="Candidate added successfully for 2026."
      successRedirectTo="/admin-home"
      submitLabel="Add Candidate"
    />
  );
}

export default AdminRegisterPage;
