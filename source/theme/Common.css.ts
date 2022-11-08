import { Render } from "verstak"

export const Content: Render<HTMLElement> = e => {
  e.style.margin = "1rem"
  e.style.border = "1px solid gray"
}

export const Brand: Render<HTMLElement> = e => {
  e.style.color = "blue"
  e.style.backgroundColor = "rgba(0, 0, 255, 0.1)"
  e.style.border = "1px solid blue"
}

export const Important: Render<HTMLElement> = e => {
  e.style.color = "red"
  e.style.backgroundColor = "rgba(255, 0, 0, 0.1)"
  e.style.border = "1px solid red"
}

export const Unimportant: Render<HTMLElement> = e => {
  e.style.color = "silver"
  e.style.fontSize = "smaller"
  e.style.border = "1px solid silver"
}
