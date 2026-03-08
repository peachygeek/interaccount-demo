import { processTransfer } from "../services/transactionService"

test("returns new balance after successful transfer", async () => {
  const result = await processTransfer(1000, 5000)
  expect(result).toBe(4000)
})

test("throws when amount exceeds balance", async () => {
  await expect(processTransfer(6000, 5000)).rejects.toThrow("Insufficient funds")
})

test("allows transfer of exact balance", async () => {
  const result = await processTransfer(5000, 5000)
  expect(result).toBe(0)
})
