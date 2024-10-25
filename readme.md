1. Copy .env file

```sh
cp .env.example .env
```

2. Update variables
3. Init db and seed

```sh
pnpm db:generate && pnpm db:push && pnpm db:seed
```

4. Start dev

```
pnpm dev
```
