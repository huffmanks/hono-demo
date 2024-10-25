import { User } from "../index";

export default function UsersPage({ users }: { users: User[] }) {
  return (
    <div>
      <h1>User List</h1>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
      <a href="/">Back to Home</a>
    </div>
  );
}
