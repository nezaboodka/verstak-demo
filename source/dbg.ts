import { RtSystem, LoggingLevel } from "reactronic"
import { WebDriver } from "verstak"

const IS_DBG = process.env.NODE_ENV !== "production"

export function configureDebugging(): void {
  RtSystem.setLoggingMode(false)
  RtSystem.setLoggingMode(IS_DBG, LoggingLevel.ErrorsOnly)
  RtSystem.setProfilingMode(false, {
    asyncActionDurationWarningThreshold: 300,
    mainThreadBlockingWarningThreshold: 10,
    repetitiveUsageWarningThreshold: 5,
    garbageCollectionSummaryInterval: Number.MAX_SAFE_INTEGER,
  })
  // ReactiveTreeNode.setDefaultLoggingOptions(LoggingLevel.ErrorsOnly)
  WebDriver.blinkingEffect = true
}
