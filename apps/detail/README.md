# Detail Remote

Micro-frontend remote to display movie details.

## Standalone Mode

To run the remote in standalone mode:

```bash
pnpm detail:dev
```

Server starts on http://localhost:3002

### Testing with a Movie ID

In standalone mode, you need to access a URL with a valid movie ID:

```
http://localhost:3002/detail/840464
```

Examples of popular movie IDs:
- `840464` - Werewolves
- `550` - Fight Club
- `238` - The Godfather

## Remote Mode (consumed by host)

When this remote is consumed by the host, navigation happens automatically from the movie list.
