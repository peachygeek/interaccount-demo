export const processTransfer = async (
  amount: number,
  balance: number
) => {

  await new Promise(r => setTimeout(r, 1000))

  if (amount > balance) {
    throw new Error("Insufficient funds")
  }

  return balance - amount
}
