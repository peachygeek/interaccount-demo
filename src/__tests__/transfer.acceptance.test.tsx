import { render, screen, waitFor } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import App from "../App"

test("initial render matches snapshot", () => {
  const { container } = render(<App />)
  expect(container).toMatchSnapshot()
})

test("successful transfer updates both balances and logs transaction", async () => {
  const { container } = render(<App />)

  const input = screen.getByPlaceholderText("Enter amount")
  const button = screen.getByText("Transfer")

  await userEvent.type(input, "1000")
  await userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText("R49000")).toBeInTheDocument()
    expect(screen.getByText("R3000")).toBeInTheDocument()
    expect(screen.getByText("R1000")).toBeInTheDocument()
    expect(screen.getByText("Success")).toBeInTheDocument()
  })

  expect(screen.queryByText("No transactions yet")).not.toBeInTheDocument()
  expect(container).toMatchSnapshot()
})

test("shows insufficient funds when amount exceeds balance", async () => {
  const { container } = render(<App />)

  const input = screen.getByPlaceholderText("Enter amount")

  await userEvent.type(input, "99999")

  expect(screen.getByText("Insufficient funds")).toBeInTheDocument()
  expect(screen.getByText("Transfer")).toBeDisabled()
  expect(container).toMatchSnapshot()
})

test("transfer button is disabled for zero or negative amount", async () => {
  render(<App />)

  const button = screen.getByText("Transfer")

  expect(button).toBeDisabled()
})

test("multiple transfers update balances correctly", async () => {
  const { container } = render(<App />)

  const input = screen.getByPlaceholderText("Enter amount")
  const button = screen.getByText("Transfer")

  await userEvent.type(input, "5000")
  await userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText("R45000")).toBeInTheDocument()
    expect(screen.getByText("R7000")).toBeInTheDocument()
  })

  await userEvent.clear(input)
  await userEvent.type(input, "2000")
  await userEvent.click(button)

  await waitFor(() => {
    expect(screen.getByText("R43000")).toBeInTheDocument()
    expect(screen.getByText("R9000")).toBeInTheDocument()
  })

  const successLabels = screen.getAllByText("Success")
  expect(successLabels).toHaveLength(2)
  expect(container).toMatchSnapshot()
})
