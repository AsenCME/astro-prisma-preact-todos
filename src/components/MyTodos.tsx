import useTodos from "../hooks/useTodos";

export default function MyTodos() {
  const { todos } = useTodos();
  return (
    <section>
      <h1>Todos</h1>
      <p>My todos here</p>
      <ul>
        {todos.map((t) => (
          <li
            key={t.id}
            class="p-2 rounded bg-gray-50 hover:shadow transition mt-2"
          >
            <h3 class="text-xl font-bold">{t.title}</h3>
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