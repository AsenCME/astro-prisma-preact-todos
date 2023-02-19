import { useState } from "preact/hooks";
import useAllTodos, { addComment } from "../hooks/useAllTodos";
import { CommentWithUser } from "../pages/api/comments";
import { TodoWithUser } from "../pages/api/todos";
import { TodoFull } from "../pages/api/todos/all";

export default function AllTodos() {
  const { todos } = useAllTodos();
  const [addCommentModal, setAddCommentModal] = useState<TodoFull>(null);
  const [commentsModal, setCommentsModal] = useState<TodoFull>();
  return (
    <article>
      <h1>All Todos</h1>
      <ul>
        {todos.map((todo) => (
          <li class="rounded bg-black text-white mt-4 p-4">
            <h3 class="font-bold text-xl">{todo.title}</h3>
            <p>{todo.notes}</p>
            <p class="text-end">
              {todo.user.username} &#183; {todo.comments.length} comments
            </p>
            <div className="flex gap-2 justify-end">
              <p
                class="hover:underline cursor-pointer"
                onClick={() => setAddCommentModal(todo)}
              >
                add comment
              </p>
              {todo.comments.length > 0 ? (
                <p
                  class="hover:underline cursor-pointer"
                  onClick={() => setCommentsModal(todo)}
                >
                  view comments
                </p>
              ) : null}
            </div>
          </li>
        ))}
      </ul>

      {!addCommentModal ? null : (
        <div class="inset-0 w-screen h-screen fixed backdrop-blur flex items-center bg-slate-600/50">
          <div class="p-4 rounded bg-white w-full max-w-prose mx-auto">
            <h1>Add comment</h1>
            <p>
              for <strong>"{addCommentModal.title}"</strong>
            </p>
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                const body = new FormData(e.currentTarget);
                body.append("todoid", addCommentModal.id);
                const comment = await fetch("/api/comments", {
                  method: "POST",
                  body,
                }).then((r) => r.json());
                addComment(comment, addCommentModal.id);
                setAddCommentModal(null);
              }}
            >
              <div className="h-4" />
              <input
                type="text"
                name="content"
                placeholder="Comment content..."
                required
              />
              <div className="h-4" />
              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
      )}

      {!commentsModal ? null : (
        <div
          class="inset-0 w-screen h-screen fixed backdrop-blur flex items-center bg-slate-600/50"
          onClick={() => setCommentsModal(null)}
        >
          <div
            class="p-4 rounded bg-white w-full max-w-prose mx-auto"
            onClick={(e) => e.stopImmediatePropagation()}
          >
            <h3 class="font-bold text-xl">Comments</h3>
            <p>
              for <strong>"{commentsModal.title}"</strong>
            </p>
            <ul class="pl-4 mt-4">
              {commentsModal.comments.map((comment) => (
                <li>
                  <p class="font-light">{comment.commenter.username}</p>
                  <p class="text-lg">{comment.content}</p>
                  <p class="text-gray-500">
                    {new Date(comment.createdAt).toLocaleString("en-US", {
                      dateStyle: "medium",
                    })}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </article>
  );
}
