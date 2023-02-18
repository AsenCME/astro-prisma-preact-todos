import { atom } from "nanostores";
import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { GetTodosReturn, TodoWithUser } from "../pages/api/todos";

type Store = {
  fetched: boolean;
  todos: GetTodosReturn;
};
const store = atom<Store>({ fetched: false, todos: [] });
const getAll = async () =>
  await fetch("http://localhost:3000/api/todos")
    .then((r) => r.json())
    .catch(() => []);
const fetchAndSet = async () => {
  const data = await getAll();
  store.set({ todos: data, fetched: true });
};
export const addTodo = (todo: TodoWithUser) => {
  const state = store.get();
  store.set({ ...state, todos: [todo, ...state.todos] });
};

export default function useTodos() {
  const $store = useStore(store);
  useEffect(() => {
    if (!$store.fetched) fetchAndSet();
  }, []);
  return { ...$store, fetchAndSet };
}
