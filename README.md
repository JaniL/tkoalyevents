# tkoalyevents

Retrieve events from TKO-äly's public calendar feed.

⚠️ This project is currently not actively maintained.

## Requirements

- Node.js 18+

## Usage

### Promise API (recommended)

```javascript
const tkoalyevents = require('tkoalyevents')

async function main() {
  const events = await tkoalyevents()
  console.log(events[0])
}

main().catch(console.error)
```

Promise API event schema:

```javascript
{
  id: 2907,
  uid: '2907',
  title: 'Gurula Smash Weekly #17',
  start: 2026-03-16T16:00:00.000Z,
  end: null,
  location: 'Gurula, DK115, Exactum',
  description: '...',
  url: 'https://tko-aly.fi/event/2907',
  created: 2026-03-13T19:09:30.000Z,
  updated: null,
  allDay: false
}
```

### Callback API (deprecated)

The callback API is deprecated and will be removed in a future major version.
Use the Promise API instead.

```javascript
const tkoalyevents = require('tkoalyevents')

tkoalyevents(function(events) {
  console.log(events)
})
```

Callback API preserves legacy field names for backwards compatibility:

```javascript
[
  {
    id: 2907,
    user_id: null,
    name: 'Gurula Smash Weekly #17',
    created: 2026-03-13T19:09:30.000Z,
    starts: 2026-03-16T16:00:00.000Z,
    registration_starts: null,
    registration_ends: null,
    cancellation_starts: null,
    cancellation_ends: null,
    location: 'Gurula, DK115, Exactum',
    category: null,
    description: '...',
    price: null,
    map: 'https://tko-aly.fi/event/2907',
    max_participants: null,
    realised_participants: null,
    membership_required: null,
    outsiders_allowed: null,
    template: null,
    responsible: null,
    show_responsible: null,
    avec: null,
    deleted: null
  }
]
```

Notes:

- Data comes from `https://ics.tko-aly.fi/`.
- Some legacy callback fields are always `null` because they are not available in the ICS feed.
