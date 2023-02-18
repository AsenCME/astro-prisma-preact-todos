import { User } from "@prisma/client";

export default function Nav({ user }: { user: User }) {
  return (
    <>
      <nav class="w-full px-12 py-4 bg-gray-100 flex justify-between gap-4">
        <h6>Todo App</h6>
        <p>{JSON.stringify(user)}</p>
      </nav>
    </>
  );
}
