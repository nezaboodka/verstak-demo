import { ReactiveSystem, LoggingLevel } from "reactronic"

const IS_DBG = process.env.NODE_ENV !== "production"

export function configureDebugging(): void {
  ReactiveSystem.setLoggingMode(false)
  ReactiveSystem.setLoggingMode(IS_DBG, LoggingLevel.ErrorsOnly)
  ReactiveSystem.setProfilingMode(false, {
    asyncActionDurationWarningThreshold: 300,
    mainThreadBlockingWarningThreshold: 10,
    repetitiveUsageWarningThreshold: 5,
    garbageCollectionSummaryInterval: Number.MAX_SAFE_INTEGER,
  })
  // ReactiveNode.setDefaultLoggingOptions(LoggingLevel.ErrorsOnly)
}
