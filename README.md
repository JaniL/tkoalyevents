# tkoalyevents

## How to

```javascript
var tkoalyevents = require('tkoalyevents')

tkoalyevents(function(events) {
  console.log(events);
})
```

```javascript

[
  { id: 1094,
    user_id: 797,
    name: 'Yritysvierailu',
    created: 2016-09-03T16:01:10.000Z,
    starts: 2016-10-29T14:00:00.000Z,
    registration_starts: null,
    registration_ends: null,
    cancellation_starts: null,
    cancellation_ends: null,
    location: 'Yritys, Helsinki',
    category: 'Yritysvierailu',
    description: 'Lisää tietoa pian!\r\n\r\n--\r\n\r\nMore information soon!',
    price: null,
    map: null,
    max_participants: null,
    realised_participants: null,
    membership_required: false,
    outsiders_allowed: null,
    template: false,
    responsible: 'Matt Doe',
    show_responsible: false,
    avec: false,
    deleted: false },
]

```
