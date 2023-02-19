import { atom } from "nanostores";
import { useEffect } from "preact/hooks";
import { useStore } from "@nanostores/preact";
import { TodoWithUser } from "../pages/api/todos";
import { TodoFull } from "../pages/api/todos/all";
import { Comment } from "@prisma/client";
import { CommentWithUser } from "../pages/api/comments";

type Store = {
  fetched: boolean;
  todos: TodoFull[];
};
const store = atom<Store>({ fetched: false, todos: [] });
const getAll = async () =>
  await fetch("http://localhost:3000/api/todos/all")
    .then((r) => r.json())
    .catch(() => []);
const fetchAndSet = async () => {
  const data = await getAll();
  store.set({ todos: data, fetched: true });
};
export const addTodo = (todo: TodoFull) => {
  const state = store.get();
  store.set({ ...state, todos: [todo, ...state.todos] });
};

export const addComment = (comment: CommentWithUser, id: string) => {
  const state = store.get();
  const idx = state.todos.findIndex((t) => t.id === id);
  if (idx !== -1)
    state.todos[idx] = {
      ...state.todos[idx],
      comments: [comment, ...state.todos[idx].comments],
    };
};

export default function useAllTodos() {
  const $store = useStore(store);
  useEffect(() => {
    if (!$store.fetched) fetchAndSet();
  }, []);
  return { ...$store, fetchAndSet };
}
