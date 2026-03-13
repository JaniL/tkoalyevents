let deprecationWarningShown = false

export function emitCallbackDeprecationWarning(): void {
  if (deprecationWarningShown) {
    return
  }

  deprecationWarningShown = true
  process.emitWarning(
    'Callback API is deprecated and will be removed in a future major version. Use Promise API: await tkoalyevents().',
    'DeprecationWarning'
  )
}

export function emitCallbackRuntimeWarning(error: Error): void {
  process.emitWarning(
    `Failed to fetch calendar events in deprecated callback API: ${error.message}`,
    'RuntimeWarning'
  )
}
