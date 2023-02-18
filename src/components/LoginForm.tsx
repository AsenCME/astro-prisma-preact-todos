export default function LoginForm() {
  return (
    <form
      name="login"
      onSubmit={async (e) => {
        e.preventDefault();
        const body = new FormData(e.currentTarget);
        await fetch("/api/users/login", {
          method: "POST",
          body,
        }).then((r) => r.json());
        window.location.replace("/dashboard");
      }}
      class="flex flex-col gap-2 items-stretch max-w-prose mx-auto my-12 rounded p-4 border-2 border-black"
    >
      <h2>Login form</h2>
      <input type="text" name="username" placeholder="username" />
      <button type="submit">Login</button>
    </form>
  );
}
