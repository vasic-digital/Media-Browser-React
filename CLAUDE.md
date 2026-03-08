# CLAUDE.md - Media-Browser-React

## Overview

React entity browser components for Catalogizer media browsing, providing type-filtered grid views with search, pagination, and entity detail navigation.

**Package**: `@vasic-digital/media-browser`

## Build & Test

```bash
npm install
npm run build        # tsc
npm run test         # vitest run
npm run lint         # tsc --noEmit
npm run clean        # rm -rf dist
```

## Code Style

- TypeScript strict mode
- PascalCase components, camelCase functions
- Imports grouped: React, third-party, internal (`@vasic-digital/*`)
- Tests: Vitest with React Testing Library and jsdom environment
- All elements have `data-testid` attributes for testing

## Package Structure

| Path | Purpose |
|------|---------|
| `src/index.ts` | Re-exports all components and prop types |
| `src/EntityBrowser.tsx` | Top-level browser with search bar, type selector, and entity grid |
| `src/EntityGrid.tsx` | Responsive grid of EntityCards with pagination; handles loading/empty states |
| `src/EntityCard.tsx` | Single entity display: title, year, type, rating, truncated description |
| `src/TypeSelector.tsx` | Pill-button selector for filtering by MediaType |
| `src/Pagination.tsx` | Prev/Next pagination with page info; auto-hides for single-page results |
| `src/__tests__/` | Component tests for EntityCard, Pagination, TypeSelector |
| `src/__tests__/setup.ts` | Test setup (jsdom) |

## Key Exports

- `EntityBrowser` -- Full-featured browser component; shows TypeSelector when no type/search is active, switches to EntityGrid when filtering. Props: `types`, `entities`, `total`, `limit`, `offset`, callbacks for `onTypeSelect`, `onSearch`, `onEntityClick`, `onPageChange`, optional `onBack`
- `EntityGrid` -- Responsive CSS grid of EntityCards with optional pagination; handles loading spinner and empty state
- `EntityCard` -- Clickable card for a MediaEntity showing title with year, humanized type name (underscores replaced), star rating, and truncated description (120 chars). Keyboard accessible (Enter/Space)
- `TypeSelector` -- Row of pill buttons for MediaType selection; active type highlighted with blue background
- `Pagination` -- Offset-based pagination: computes currentPage/totalPages from offset+limit; renders Prev/Next buttons with "page / total" display; returns null for single-page results

## Dependencies

- **Peer**: `react ^18.0.0`, `@tanstack/react-query ^5.0.0`
- **Internal**: `@vasic-digital/media-types` (MediaEntity, MediaType)

## Design Patterns

- **Composition**: EntityBrowser composes TypeSelector + EntityGrid; EntityGrid composes EntityCard + Pagination
- **Controlled filtering**: Browser state (selected type, search query) managed externally via callbacks; internal input state for search field
- **Callback delegation**: All navigation actions (type select, entity click, page change, back) delegated to parent via props
- **Presentational**: No data fetching; all data passed as props

## Commit Style

Conventional Commits: `feat(media-browser): description`
