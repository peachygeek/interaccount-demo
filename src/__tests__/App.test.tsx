import { render, screen } from "@testing-library/react"
import App from "../App"

test("renders the app with title and initial balances", () => {
  render(<App />)

  expect(screen.getByText("Inter-Account Transfer Demo")).toBeInTheDocument()
  expect(screen.getByText("R50000")).toBeInTheDocument()
  expect(screen.getByText("R2000")).toBeInTheDocument()
})

test("shows empty transaction history on load", () => {
  render(<App />)

  expect(screen.getByText("No transactions yet")).toBeInTheDocument()
})
