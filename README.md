# Photo Library

A responsive photo library built with Angular that provides an infinite random photo stream, persistent favorites, and individual photo views.

## Features

- Infinite random photo stream
- Custom infinite scrolling using the native `IntersectionObserver` API
- Add photos to favorites by clicking them
- Persistent favorites using `localStorage`
- Favorites gallery
- Individual photo detail view
- Remove photos from favorites
- Responsive photo grid
- Lazy-loaded routes
- Loading indicator while fetching photos
- Angular Material UI
- Unit tests with Vitest

## Tech Stack

- Angular 22
- TypeScript
- SCSS
- Angular Material
- Angular Signals
- RxJS
- Vitest
- Picsum Photos

## Architecture

The application follows a feature-oriented structure with a clear separation of responsibilities:

```text
src/app/
├── core/
│   └── services/
│       ├── photo.ts
│       └── favorites.ts
├── shared/
│   ├── components/
│   │   ├── header/
│   │   ├── photo-card/
│   │   ├── photo-grid/
│   │   └── loading-spinner/
│   └── models/
│       └── photo.model.ts
├── features/
│   ├── photos/
│   │   └── photos-page/
│   ├── favorites/
│   │   └── favorites-page/
│   └── photo-detail/
│       └── photo-detail-page/
├── app.config.ts
├── app.routes.ts
├── app.html
├── app.scss
└── app.ts
```

### Design Decisions

**Standalone components**

The application uses Angular's standalone architecture to keep dependencies explicit and avoid unnecessary NgModules.

**Signals**

Angular Signals are used for local application state such as the photo stream, loading state, and favorites.

**OnPush change detection**

Components use `ChangeDetectionStrategy.OnPush` to reduce unnecessary change detection work and make state changes more predictable.

**Reusable components**

Photo presentation is separated into reusable `PhotoCard` and `PhotoGrid` components. The parent feature decides what selecting a photo means, allowing the same grid to be reused by both the photo stream and favorites.

**Service abstraction**

`PhotoService` owns photo retrieval and simulated API latency, while `FavoritesService` owns favorite state and persistence. Components do not interact directly with `localStorage` or the external image source.

**Infinite scrolling**

Infinite scrolling is implemented using the browser's native `IntersectionObserver` API rather than a third-party infinite-scroll library.

A loading guard prevents concurrent requests, and incoming photos are deduplicated by ID before being added to the stream.

**Persistence**

Favorites are persisted in browser `localStorage`, so they remain available after a page refresh without requiring a backend.

**Lazy loading**

Feature pages are loaded through Angular Router using `loadComponent`, keeping them in separate lazy chunks.

## Getting Started

### Prerequisites

- Node.js 22.23.2 or compatible Node.js version
- npm

### Installation

Clone the repository and install dependencies:

```bash
npm install
```

### Development Server

```bash
ng serve
```

Then open:

```text
http://localhost:4200
```

### Production Build

```bash
ng build
```

The production build is generated in:

```text
dist/photo-library
```

## Testing

Run the unit tests with:

```bash
ng test
```

The test suite covers key application behavior including:

- Favorites state management
- Duplicate favorite prevention
- `localStorage` persistence
- Invalid persisted data handling
- Photo generation
- Unique photo IDs
- Photo data validation
- Infinite-scroll observer initialization
- Component creation and required inputs
- Routing-dependent components

## Routes

| Route         | Description                  |
| ------------- | ---------------------------- |
| `/`           | Infinite photo stream        |
| `/favorites`  | Persistent favorites library |
| `/photos/:id` | Individual favorite photo    |

## Photo Source

Random images are provided by Picsum Photos.

The photo service simulates a real API request with a randomized 200–300 ms delay.

## UI

Angular Material is used for UI components with a custom Azure-based Material theme. The photo grid adapts responsively across desktop, tablet, and mobile layouts.
