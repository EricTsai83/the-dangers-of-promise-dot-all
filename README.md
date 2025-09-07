## The Dangers of Promise.all

An interactive example that demonstrates the behavioral differences and common pitfalls of `Promise.all` vs `Promise.allSettled`.

### Inspiration
Highly inspired by this video: [The Dangers of Promise.all](https://www.youtube.com/watch?v=f2Z1v3cqgDI)

### Why this project?
- **Promise.all (all-or-nothing)**: If any promise rejects, the aggregate immediately rejects. Other promises are not automatically canceled and may continue running in the background.
- **Promise.allSettled (settle one by one)**: Waits for all promises to settle (fulfilled or rejected) and returns each promise's final status and value/reason.

These differences frequently lead to misunderstandings and bugs in real projects:
- **Mistaken belief** that when one promise fails in `Promise.all`, the rest are canceled.
- **Overlooking** scenarios where per-item success/failure must be handled individually, where `Promise.allSettled` or custom error-wrapping is more appropriate.

---

## Quick Start

### Requirements
- Node.js 18+ (20+ recommended)
- pnpm 10+ (this repo uses `packageManager: pnpm@10.x`)

### Install and run
```bash
pnpm install
pnpm dev
```

Open `http://localhost:3000` in your browser. Keep the DevTools Console open to observe logs.

Common scripts:
```bash
# Build
pnpm build

# Start in production mode (after build)
pnpm start

# Lint
pnpm lint
```

---

## Interactive demo (on the home page)
The home page exposes four buttons:
- Run with Promise.all
- Run with Promise.all and throw "error" in the second promise
- Run with Promise.allSettled
- Run with Promise.allSettled and throw "error" in the second promise

Watch the Console:
- **Promise.all**: As soon as one task throws, the aggregate goes to `catch`. Other tasks are not automatically canceled and may still log completion messages.
- **Promise.allSettled**: Waits until all tasks finish. Outputs an array of results with `status: 'fulfilled' | 'rejected'`, and does not throw an aggregate error.

---

## Key concepts and common pitfalls

- **No automatic cancellation**: `Promise.all` does not cancel in-flight promises when one rejects. If tasks have side effects (e.g., HTTP calls, file writes), you must implement cancellation or avoid re-entrancy yourself.
- **Collect results individually**: Prefer `Promise.allSettled`, or wrap each task so it never rejects and returns a structured result indicating success/failure.
- **Partial tolerance**: If you want to "use successes and ignore failures", individually `catch` during mapping and convert failures into identifiable results (e.g., `{ ok: false, reason }`).
- **Concurrency and load**: Launching many promises at once can overwhelm external services. Add concurrency control (batching, rate limiting, or a queue).

---

## Code locations
- Interactive page: `src/app/page.tsx`
- Styles: `src/app/globals.css`
- Next.js config: `next.config.ts`

---

## Tech stack
- Next.js 15
- React 19
- Tailwind CSS 4
- TypeScript

---

## License
MIT — see `LICENSE`.

