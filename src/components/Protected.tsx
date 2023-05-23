export default function Protected({ children }) {
  const isAuthed = !!localStorage.getItem("auth_token");

  console.log(localStorage.getItem("auth_token"));

  if (!isAuthed) {
    return <></>;
  }

  return children;
}
