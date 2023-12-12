import { RxSystem, LoggingLevel } from "reactronic"

const IS_DBG = process.env.NODE_ENV !== "production"

export function configureDebugging(): void {
  RxSystem.setLoggingMode(false)
  RxSystem.setLoggingMode(IS_DBG, LoggingLevel.ErrorsOnly)
  RxSystem.setProfilingMode(false, {
    asyncActionDurationWarningThreshold: 300,
    mainThreadBlockingWarningThreshold: 10,
    repetitiveUsageWarningThreshold: 5,
    garbageCollectionSummaryInterval: Number.MAX_SAFE_INTEGER,
  })
  // VerstakNode.setDefaultLoggingOptions(LoggingLevel.ErrorsOnly)
}
