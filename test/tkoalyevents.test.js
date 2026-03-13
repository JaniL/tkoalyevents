const assert = require('node:assert/strict')
const fs = require('node:fs/promises')
const path = require('node:path')
const test = require('node:test')

const fixturePath = path.join(__dirname, 'fixtures', 'sample.ics')

function loadLibrary() {
  const modulePath = path.join(__dirname, '..', 'dist', 'index.js')
  const distPath = path.join(__dirname, '..', 'dist')

  for (const key of Object.keys(require.cache)) {
    if (key.startsWith(distPath)) {
      delete require.cache[key]
    }
  }

  delete require.cache[require.resolve(modulePath)]
  return require(modulePath)
}

test('Promise API returns modern event schema with Date objects', async () => {
  const fixture = await fs.readFile(fixturePath, 'utf8')
  const originalFetch = global.fetch
  global.fetch = async () => ({
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => fixture,
  })

  try {
    const tkoalyevents = loadLibrary()
    const events = await tkoalyevents()

    assert.equal(events.length, 2)
    assert.equal(events[0].id, 2907)
    assert.equal(events[0].uid, '2907')
    assert.equal(events[0].title, 'Gurula Smash Weekly #17')
    assert.ok(events[0].start instanceof Date)
    assert.ok(events[0].end instanceof Date)
    assert.ok(events[0].created instanceof Date)
    assert.ok(events[0].updated instanceof Date)
    assert.equal(events[0].allDay, false)

    assert.equal(events[1].id, null)
    assert.equal(events[1].uid, 'event-no-number')
    assert.equal(events[1].allDay, true)
    assert.ok(events[1].start instanceof Date)
  } finally {
    global.fetch = originalFetch
  }
})

test('Callback API returns legacy schema and emits deprecation warning', async () => {
  const fixture = await fs.readFile(fixturePath, 'utf8')
  const originalFetch = global.fetch
  const originalEmitWarning = process.emitWarning
  const warnings = []

  global.fetch = async () => ({
    ok: true,
    status: 200,
    statusText: 'OK',
    text: async () => fixture,
  })

  process.emitWarning = (warning, type) => {
    warnings.push({ warning: String(warning), type })
  }

  try {
    const tkoalyevents = loadLibrary()

    const events = await new Promise((resolve) => {
      tkoalyevents((legacyEvents) => resolve(legacyEvents))
    })

    assert.equal(events.length, 2)
    assert.equal(events[0].name, 'Gurula Smash Weekly #17')
    assert.ok(events[0].starts instanceof Date)
    assert.ok(events[0].created instanceof Date)
    assert.equal(events[0].map, 'https://tko-aly.fi/event/2907')
    assert.equal(events[0].registration_starts, null)
    assert.equal(events[0].membership_required, null)
    assert.equal(events[1].id, null)

    assert.equal(warnings.length, 1)
    assert.equal(warnings[0].type, 'DeprecationWarning')
    assert.match(warnings[0].warning, /Callback API is deprecated/)
  } finally {
    global.fetch = originalFetch
    process.emitWarning = originalEmitWarning
  }
})

test('Promise API rejects on fetch failure', async () => {
  const originalFetch = global.fetch
  global.fetch = async () => ({
    ok: false,
    status: 503,
    statusText: 'Service Unavailable',
    text: async () => '',
  })

  try {
    const tkoalyevents = loadLibrary()
    await assert.rejects(() => tkoalyevents(), /Failed to fetch events/)
  } finally {
    global.fetch = originalFetch
  }
})

test('Callback API returns empty array when fetch fails', async () => {
  const originalFetch = global.fetch
  const originalEmitWarning = process.emitWarning
  const warnings = []

  global.fetch = async () => {
    throw new Error('network down')
  }

  process.emitWarning = (warning, type) => {
    warnings.push({ warning: String(warning), type })
  }

  try {
    const tkoalyevents = loadLibrary()
    const events = await new Promise((resolve) => {
      tkoalyevents((legacyEvents) => resolve(legacyEvents))
    })

    assert.deepEqual(events, [])
    assert.equal(warnings.length, 2)
    assert.equal(warnings[0].type, 'DeprecationWarning')
    assert.equal(warnings[1].type, 'RuntimeWarning')
    assert.match(warnings[1].warning, /Failed to fetch calendar events/)
  } finally {
    global.fetch = originalFetch
    process.emitWarning = originalEmitWarning
  }
})
