# @vasic-digital/media-browser

React entity browser components for Catalogizer media browsing. Provides EntityBrowser, EntityGrid, EntityCard, TypeSelector, and Pagination components.

## Install

```bash
npm install @vasic-digital/media-browser @vasic-digital/media-types
```

## Usage

```tsx
import { EntityBrowser } from '@vasic-digital/media-browser'

function App() {
  return (
    <EntityBrowser
      types={types}
      entities={entities}
      total={100}
      limit={24}
      offset={0}
      onTypeSelect={(type) => setType(type)}
      onSearch={(q) => setQuery(q)}
      onEntityClick={(entity) => navigate(`/entity/${entity.id}`)}
      onPageChange={(page) => setPage(page)}
    />
  )
}
```

## License

MIT
