import { block, sep } from "verstak"
import { App } from "models/App"
import { WorkspacePanel } from "./WorkspacePanel.v"

export function MainWindow(name: string, app: App) {
  return (
    block(name, { rx: true }, e => {
      WorkspacePanel("workspace-panel1", app)
      WorkspacePanel("workspace-panel2", app)
      WorkspacePanel("workspace-panel3", app)
      sep()
      WorkspacePanel("workspace-panel4", app)
      WorkspacePanel("workspace-panel5", app)
    })
  )
}
