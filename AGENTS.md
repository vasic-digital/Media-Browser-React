# AGENTS.md - Media-Browser-React Multi-Agent Coordination

## Module Identity

- **Package**: `@vasic-digital/media-browser`
- **Role**: React entity browser components for media browsing with type filtering, search, and pagination
- **Peer Dependencies**: `react ^18.0.0`, `@tanstack/react-query ^5.0.0`
- **Internal Dependencies**: `@vasic-digital/media-types`
- **TypeScript**: Strict mode

## Agent Responsibilities

### Media Browser Agent

The Media Browser agent owns all browsing UI components:

1. **EntityBrowser** (`src/EntityBrowser.tsx`) -- Top-level browser with search bar, type selector, and entity grid. Shows `TypeSelector` when no type/search is active, switches to `EntityGrid` when filtering.

2. **EntityGrid** (`src/EntityGrid.tsx`) -- Responsive CSS grid of `EntityCard` components with pagination. Handles loading spinner and empty state.

3. **EntityCard** (`src/EntityCard.tsx`) -- Clickable card displaying title with year, humanized type name, star rating, and truncated description (120 chars). Keyboard accessible (Enter/Space).

4. **TypeSelector** (`src/TypeSelector.tsx`) -- Row of pill buttons for `MediaType` selection with active highlight.

5. **Pagination** (`src/Pagination.tsx`) -- Offset-based pagination with Prev/Next buttons and page counter. Returns null for single-page results.

## Cross-Agent Coordination

### Upstream Dependencies

| Package | What Is Used | Coordinate When |
|---------|-------------|-----------------|
| `@vasic-digital/media-types` | `MediaEntity`, `MediaType` | Entity or type interface changes |

### Coordination Rules

- These are **presentational components**: no data fetching, no side effects. All data is passed via props and all actions are delegated to the parent via callbacks.
- Changes to `EntityBrowser` props affect the host application's page components.
- `EntityCard` click behavior and `onEntityClick` callback signature must stay stable for navigation routing.

## File Map

```
Media-Browser-React/
  src/
    index.ts                           -- Re-exports all components and prop types
    EntityBrowser.tsx                   -- Top-level browser component
    EntityGrid.tsx                      -- Responsive entity grid with pagination
    EntityCard.tsx                      -- Single entity display card
    TypeSelector.tsx                    -- Media type filter pills
    Pagination.tsx                      -- Offset-based page navigation
    __tests__/
      EntityCard.test.tsx              -- Card rendering and interaction tests
      Pagination.test.tsx              -- Pagination logic tests
      TypeSelector.test.tsx            -- Type selector tests
      setup.ts                         -- Test setup (jsdom)
```

## Testing Standards

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
```

Tests use Vitest with React Testing Library and jsdom environment. All elements have `data-testid` attributes.

## Conventions

- Composition: EntityBrowser -> TypeSelector + EntityGrid -> EntityCard + Pagination
- Controlled filtering: browser state managed externally via callbacks
- Callback delegation: all navigation actions (type select, entity click, page change, back) go to parent
- Presentational only: zero data fetching in any component

## Constraints

- **No CI/CD pipelines**: GitHub Actions, GitLab CI/CD, and all automated pipeline configurations are permanently disabled. All testing is local.
- **No data fetching**: Components receive all data via props. API calls belong in the host application.
- **Accessibility**: All interactive elements must remain keyboard accessible.


## ⚠️ MANDATORY: NO SUDO OR ROOT EXECUTION

**ALL operations MUST run at local user level ONLY.**

This is a PERMANENT and NON-NEGOTIABLE security constraint:

- **NEVER** use `sudo` in ANY command
- **NEVER** use `su` in ANY command
- **NEVER** execute operations as `root` user
- **NEVER** elevate privileges for file operations
- **ALL** infrastructure commands MUST use user-level container runtimes (rootless podman/docker)
- **ALL** file operations MUST be within user-accessible directories
- **ALL** service management MUST be done via user systemd or local process management
- **ALL** builds, tests, and deployments MUST run as the current user

### Container-Based Solutions
When a build or runtime environment requires system-level dependencies, use containers instead of elevation:

- **Use the `Containers` submodule** (`https://github.com/vasic-digital/Containers`) for containerized build and runtime environments
- **Add the `Containers` submodule as a Git dependency** and configure it for local use within the project
- **Build and run inside containers** to avoid any need for privilege escalation
- **Rootless Podman/Docker** is the preferred container runtime

### Why This Matters
- **Security**: Prevents accidental system-wide damage
- **Reproducibility**: User-level operations are portable across systems
- **Safety**: Limits blast radius of any issues
- **Best Practice**: Modern container workflows are rootless by design

### When You See SUDO
If any script or command suggests using `sudo` or `su`:
1. STOP immediately
2. Find a user-level alternative
3. Use rootless container runtimes
4. Use the `Containers` submodule for containerized builds
5. Modify commands to work within user permissions

**VIOLATION OF THIS CONSTRAINT IS STRICTLY PROHIBITED.**


