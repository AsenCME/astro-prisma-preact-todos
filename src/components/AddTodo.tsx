import { JSXInternal } from "preact/src/jsx";
import { addTodo } from "../hooks/useTodos";

export default function AddTodo() {
  const handleSubmit: JSXInternal.GenericEventHandler<HTMLFormElement> = async (
    event
  ) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const todo = await fetch("/api/todos", { method: "POST", body: data }).then(
      (r) => r.json()
    );
    addTodo(todo);
    (document as any).addTodoForm.reset();
  };
  return (
    <form
      name="addTodoForm"
      onSubmit={handleSubmit}
      class="flex flex-col gap-4 mt-4"
    >
      <h2>Add new todo</h2>
      <input type="text" name="title" required />
      <input type="text" name="notes" required />
      <button type="submit">Create Todo</button>
    </form>
  );
}
