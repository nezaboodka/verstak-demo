import { Render } from "verstak"

export const Content: Render<HTMLElement> = e => {
  const z = e.style
  z.margin = "0.5rem"
  z.padding = "0.25rem"
  z.border = "1px solid gray"
}

export const Brand: Render<HTMLElement> = e => {
  const z = e.style
  z.color = "blue"
  z.backgroundColor = "rgba(0, 0, 255, 0.1)"
  z.border = "1px solid blue"
}

export const Important: Render<HTMLElement> = e => {
  const z = e.style
  z.color = "red"
  z.backgroundColor = "rgba(255, 0, 0, 0.1)"
  z.border = "1px solid red"
}

export const Unimportant: Render<HTMLElement> = e => {
  const z = e.style
  z.color = "silver"
  z.fontSize = "smaller"
  z.border = "1px solid silver"
}

export const Center: Render<HTMLElement> = e => {
  const z = e.style
  z.textAlign = "center"
}
