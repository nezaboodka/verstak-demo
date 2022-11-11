import { css } from "@emotion/css"

const Classes = {
  Panel: css`
    margin: 0.5rem;
    padding: 1rem;
    box-shadow: 0.025rem 0.025rem 0.35rem 0 gray;
    border-radius: 0.25rem;
    background-color: white;
  `,
  PanelTitle: css`
    font-weight: bold;
  `,
  Brand: css`
    color: blue;
    background-color: rgba(0, 0, 255, 0.1);
    border: 1px solid blue;
  `,
  Important: css`
    color: #029111;
    background-color: #fef5f4;
    border: 1px solid #D30505;
  `,
  Hint: css`
    font-size: smaller;
    border: 1px solid silver;
  `,
}

export default Classes
