# Architecture -- Media-Browser-React

## Purpose

React entity browser components for Catalogizer media browsing. Provides type-filtered grid views with search, pagination, and entity detail navigation. Purely presentational -- no data fetching; all data passed as props.

## Structure

```
src/
  index.ts              Re-exports all components and prop types
  EntityBrowser.tsx     Top-level browser with search bar, type selector, and entity grid
  EntityGrid.tsx        Responsive grid of EntityCards with pagination; handles loading/empty states
  EntityCard.tsx        Single entity display: title, year, type, rating, truncated description
  TypeSelector.tsx      Pill-button selector for filtering by MediaType
  Pagination.tsx        Prev/Next pagination with page info; auto-hides for single-page results
  __tests__/            Component tests
```

## Key Components

- **`EntityBrowser`** -- Top-level composition: shows TypeSelector when no type/search is active, switches to EntityGrid when filtering. Delegates all actions to parent via callbacks
- **`EntityGrid`** -- Responsive CSS grid of EntityCards with optional Pagination; handles loading spinner and empty state
- **`EntityCard`** -- Clickable card showing title with year, humanized type name, star rating, truncated description (120 chars). Keyboard accessible
- **`TypeSelector`** -- Row of pill buttons for MediaType selection with active highlighting
- **`Pagination`** -- Offset-based: computes currentPage/totalPages from offset+limit; Prev/Next buttons

## Data Flow

```
Parent provides: types, entities, total, limit, offset, callbacks
    |
    EntityBrowser -> TypeSelector (onTypeSelect) + EntityGrid (entities, onEntityClick, onPageChange)
        |
        EntityGrid -> EntityCard[] (onClick -> onEntityClick) + Pagination (onPageChange)
```

## Dependencies

- React 18+ (peer)
- `@vasic-digital/media-types` -- MediaEntity, MediaType

## Testing Strategy

Vitest with React Testing Library and jsdom. Tests cover EntityCard rendering and click handling, Pagination page calculation and navigation, TypeSelector active state, and data-testid attribute presence.
