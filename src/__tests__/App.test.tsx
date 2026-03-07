import { render, screen } from "@testing-library/react"
import App from "../App"

test("shows title", () => {
  render(<App />)

  expect(
    screen.getByText("Inter Account Transfer Demo")
  ).toBeInTheDocument()
})
