import { html } from "hono/html";

export default function HomePage() {
  return (
    <div>
      <h1>Welcome to Hono.js with JSX</h1>
      <p>
        <a href="/users">View Users</a>
      </p>
      <h2>Upload something</h2>
      <form id="uploadForm" encType="multipart/form-data">
        <div>
          <input type="file" name="file" />
        </div>
        <div>
          <button type="submit">Submit</button>
        </div>
      </form>
      {html`
        <script>
          document.querySelector("#uploadForm").onsubmit = async (e) => {
            e.preventDefault();
            const formData = new FormData(e.target);
            const response = await fetch("/upload", {
              method: "POST",
              body: formData,
            });
            const result = await response.text();
          };
        </script>
      `}
    </div>
  );
}
