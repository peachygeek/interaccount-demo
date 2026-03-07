import { useState } from "react"
import TransferForm from "./components/TransferForm"
import { processTransfer } from "./services/transactionService"

export default function App() {

  const [balanceA, setBalanceA] = useState(5000)
  const [balanceB, setBalanceB] = useState(2000)
  const [transactions, setTransactions] = useState<any[]>([])

  const handleTransfer = async (amount: number) => {

    try {

      const newBalance = await processTransfer(amount, balanceA)

      setBalanceA(newBalance)
      setBalanceB(balanceB + amount)

      setTransactions([
        { amount, status: "Success" },
        ...transactions
      ])

    } catch {
      alert("Transfer failed")
    }
  }

  return (
    <div style={{ padding: 40 }}>
      <h1>Inter Account Transfer Demo</h1>

      <h2>Account A: R{balanceA}</h2>
      <h2>Account B: R{balanceB}</h2>

      <TransferForm
        balance={balanceA}
        onTransfer={handleTransfer}
      />

      <h2>Transactions</h2>

      {transactions.map((t, i) => (
        <p key={i}>
          R{t.amount} - {t.status}
        </p>
      ))}
    </div>
  )
}
