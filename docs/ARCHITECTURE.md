# Architecture — @vasic-digital/media-browser

## Overview

Stateless React presentation components for browsing Catalogizer media entities. All state (selected type, page, search query) is managed externally and passed as props — making the components fully controllable and testable.

## Design Patterns

- **Controlled Components**: All state flows down as props; events bubble up via callbacks (React's controlled component pattern)
- **Composite**: `EntityBrowser` composes `TypeSelector` and `EntityGrid`; `EntityGrid` composes `EntityCard` and `Pagination`
- **Strategy**: `onEntityClick` and `onTypeSelect` callbacks allow the parent to define navigation strategy

## Component Tree

```
EntityBrowser
  ├── TypeSelector (when no type selected)
  └── EntityGrid
        ├── EntityCard (×N)
        └── Pagination
```
