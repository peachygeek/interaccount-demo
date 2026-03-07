import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

test("successful transfer updates both balances and logs transaction", async () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Enter amount")
  const button = screen.getByText("Transfer")

  await userEvent.type(input, "1000")
  await userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText("Account A: R4000")).toBeInTheDocument()
    expect(screen.getByText("Account B: R3000")).toBeInTheDocument()
    expect(screen.getByText("R1000 - Success")).toBeInTheDocument()
  })
})

test("shows insufficient funds when amount exceeds balance", async () => {
  render(<App />)

  const input = screen.getByPlaceholderText("Enter amount")

  await userEvent.type(input, "9999")

  expect(screen.getByText("Insufficient funds")).toBeInTheDocument()
  expect(screen.getByText("Transfer")).toBeDisabled()
})
