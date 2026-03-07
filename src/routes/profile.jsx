import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile")({
  component: Profile,
});

function Profile() {
  return (
    <section className="placeholder-page">
      <h1 className="page-title">Профиль</h1>
      <p className="page-subtitle">Здесь будет ваш список просмотра.</p>
    </section>
  );
}
