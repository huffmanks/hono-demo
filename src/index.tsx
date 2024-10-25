import { dirname, resolve } from "path";
import { fileURLToPath } from "url";
import { mkdir, writeFile } from "fs/promises";
import { Hono } from "hono";
import { PrismaClient } from "@prisma/client";

import HomePage from "./components/home-page";
import UsersPage from "./components/users-page";
import { existsSync } from "fs";
import { renderer } from "./renderer";

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = new Hono();
app.use(renderer);
const prisma = new PrismaClient();

app.get("/", (c) => {
  return c.render(<HomePage />, { title: "Hono Demo" });
});

export interface User {
  id: string;
  name: string;
  email: string;
}

app.get("/users", async (c) => {
  try {
    const users = await prisma.user.findMany();
    return c.render(<UsersPage users={users} />, { title: "Users page" });
  } catch (error) {
    console.error("Error fetching users:", error);
    return c.text("Internal Server Error", 500);
  }
});

app.post("/upload", async (c) => {
  try {
    const body = await c.req.parseBody();
    const file = body["file"] as File;

    if (file && file.size > 0) {
      const dirPath = resolve(__dirname, "../public/uploads");
      await mkdir(dirPath, { recursive: true });

      let filePath = resolve(dirPath, file.name);
      const baseName = file.name.replace(/(\.[\w\d]+)$/i, "");
      const ext = file.name.split(".").pop();
      let counter = 1;

      while (existsSync(filePath)) {
        filePath = resolve(dirPath, `${baseName}(${counter++}).${ext}`);
      }

      const buffer = await file.arrayBuffer();
      await writeFile(filePath, Buffer.from(buffer));
      return c.text("File uploaded successfully");
    }

    return c.text("No file uploaded", 400);
  } catch (error) {
    console.error("Error uploading file:", error);
    return c.text("Internal Server Error", 500);
  }
});

export default app;
