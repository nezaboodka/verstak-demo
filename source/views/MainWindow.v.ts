import { block } from "verstak"
import { App } from "models/App"
import { WorkspacePanel } from "./WorkspacePanel.v"

export function MainWindow(name: string, app: App) {
  return (
    block(name, { rx: true }, e => {
      e.id = name
      WorkspacePanel("WorkspacePanel", app)
    })
  )
}
