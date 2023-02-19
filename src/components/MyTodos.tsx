import useTodos from "../hooks/useTodos";

export default function MyTodos() {
  const { todos } = useTodos();
  return (
    <section>
      <h1>My Todos</h1>
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            class="p-4 rounded bg-gray-50 hover:shadow transition mt-4"
          >
            <h3 class="font-bold text-xl">{t.title}</h3>
            <p class="text-gray-600">{t.notes}</p>
            <a
              href={`/u/${t.user.id}/todos`}
              class="hover:underline font-light"
            >
              {t.user.username}
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
}
