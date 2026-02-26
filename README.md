## Monorepo Micro Front End \w React, Vite, @module-federation/vite Lerna & Pnpm

This project is a grid of movies that uses micro frontends architecture. A detail page is accessed by clicking on a movie card. It is built using React, Vite, Lerna, and Pnpm. The project is structured as a monorepo, which allows for easy management of multiple packages and applications.
The micro frontends are loaded dynamically in the host application, allowing for a modular and scalable architecture. The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to learn about micro frontends.

The project is designed to be easy to understand and extend, making it a great starting point for anyone looking to setup a micro frontends project.

This is a test to check if it was possible to create a project from a previous one used as an inspiration to produce good model context, using the same tech stack.

All techs and deps used in this project are the latest versions available at the time of writing this README. Some update maintenance for dependencies will be done in time.

I use IntelliJ for this project, and also the windsurf/cascade plugin with claude sonnet 4.5, getting some cursor flavor while coding.

It's a work in progress, so many future enhancements are planned.

## Project Purpose

This project demonstrates a **real-world micro-frontend architecture** designed for **multi-team collaboration** on a single application. It showcases how different teams can work independently on distinct features while maintaining a cohesive user experience.

### Team Organization

The architecture is structured to support multiple autonomous teams:

- **Home & Media Team**: Manages the home page and movie detail pages (`apps/home`, `apps/movie`)
- **User & Wishlist Team**: Handles user accounts and wishlist features (planned)
- **Talent Team**: Develops person/talent detail pages (planned, `apps/talent`)

Each team owns their remote application, with full autonomy over their codebase, deployment, and release cycle.

### Developer Experience

The project setup is designed for **simplicity and efficiency**:

```bash
pnpm install  # Install dependencies
pnpm build:packages  # Build shared packages
pnpm dev  # Start development
```

Three commands to get started. No complex configuration, no manual setup steps. The monorepo structure with shared packages (design system, tokens, API client) ensures consistency while preserving team independence.

### Architecture Benefits

- **Independent deployment**: Each remote can be deployed separately
- **Team autonomy**: Teams work on isolated codebases with minimal coordination
- **Shared foundation**: Common design system, tokens, and utilities ensure consistency
- **Type safety**: TypeScript types are generated and shared between remotes and host
- **Scalability**: New teams and features can be added without disrupting existing work

### Technologies Used
- React
- Vite
- Typescript
- @module-federation/vite
- Lerna
- eslint
- prettier
- commitlint
- Pnpm
- React Router
- React Query
- Tailwind CSS v4 (shared theme across remote/host)
- Style Dictionary (design tokens)
- React Testing Library
- Vitest
- Storybook

### Getting Started

1. Clone the repository
2. Subscribe to TMDB API and get your API key
3. Create a `.env.local` file in the root of the project and add your API key
   ```bash
   VITE_TMDB_API_TOKEN=your_bearer_token
   ```
4. Install dependencies
   ```bash
   pnpm install
   ```
5. Start the development server
   ```bash
   pnpm dev
   ```
6. Open your browser and navigate to `http://localhost:3000`

### Reset Scenario

If you need to reset the project (clean install, clear caches):

```bash
# Full reset: removes node_modules, dist folders, and reinstalls
pnpm reset

# Then start dev
pnpm dev
```

### Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start all apps with watch mode for packages |
| `pnpm reset` | Full reset: clean + install |
| `pnpm build:packages` | Build tokens, shared, and ui packages |
| `pnpm storybook` | Start Storybook (requires `pnpm build:packages` first) |
| `pnpm kill-ports` | Kill processes on ports 3000, 3001, 3002, 6006 |
| `pnpm test` | Run tests |
| `pnpm lint` | Run ESLint |
| `pnpm type-check` | Run TypeScript type checking |

### Design Tokens

This project uses [Style Dictionary](https://styledictionary.com/) to manage design tokens. Tokens are defined in JSON format following the [DTCG specification](https://tr.designtokens.org/format/) and are automatically compiled to CSS custom properties and Tailwind CSS theme.

The tokens package generates:
- **CSS variables** for use in any CSS
- **Tailwind @theme** for Tailwind v4 integration
- **JavaScript/TypeScript exports** for programmatic access

See [packages/tokens/README.md](./packages/tokens/README.md) for detailed documentation.

### Storybook

To run Storybook for the design system:

```bash
pnpm --filter @vite-mf-monorepo/storybook storybook
```

Open http://localhost:6006

### Project Structure

```
vite-mf-monorepo/
├── apps/
│   ├── host/          # Host application (port 3000)
│   ├── list/          # List remote - movies grid (port 3001)
│   └── detail/        # Detail remote - movie page (port 3002)
├── packages/
│   ├── shared/        # Shared utils, Vite plugins, Tailwind theme
│   ├── ui/            # Design system (Button, Card, etc.)
│   ├── tokens/        # Design tokens (Style Dictionary)
│   ├── http-client/   # TMDB API client (heyAPI + TanStack Query)
│   └── storybook/     # Storybook for UI components
└── scripts/           # Utility scripts (reset, kill-ports)
```

### Project features

- Micro frontends architecture
- Dynamic loading of micro frontends
- HMR enabled not only on host but on remotes as well when working in dev mode (not really full HMR, triggers a full reload)
- Modular and scalable architecture
- Easy to understand and extend
- Types generation in dev mode to allow host/consumer to get types from remote, now it's possible to do it with Vite
- Responsive design
- Tailwind CSS v4 with shared theme tokens
- Easy to add new micro frontends
- Each remote is standalone and can be deployed independently
- For production mode (locally), each part of the application is hosted in a expressJS server

### Testing

This project uses Vitest and React Testing Library for testing. The tests are located in the `components` folder of each package. To run the tests, use the following command at the root of the project:

```bash
pnpm t
```   

Some extra tests will be added in the future, but for now, the focus is on the main features of the project.

#### Coverage

To run the tests with coverage, use the following command at the root of the project:

```bash
pnpm coverage
```

This will generate a coverage report in the `coverage` folder of each package. The coverage report will be generated in HTML format, and you can open it in your browser to see the coverage details.

With Intellij, you can open the coverage report by right-clicking on the `coverage` folder and selecting "Open in Browser". This will open the coverage report in your default browser.

### Issues

No issues for now

### Future Enhancements

- Add test utils in the shared package
- Add tests for error cases
- Add more tests for the components (details)
- Add e2e tests with vitest in browser mode
- Add a detail page for the talent (people) taking part in a movie
- For DX, add a .vscode and .cursor rules for Cursor users

### Acknowledgments

Special thanks to [Nsttt](https://github.com/Nsttt) for his work on the DTS (TypeScript declarations) plugin integration with `@module-federation/vite`. His contributions to the Module Federation ecosystem made it possible to have proper type generation between remotes and host in dev mode, which is essential for a good DX in a micro-frontend architecture.
