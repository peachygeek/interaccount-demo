import { useState } from "react"

export default function TransferForm({ balance, onTransfer }: any) {

  const [amount, setAmount] = useState(0)

  return (
    <div>

      <input
        type="number"
        placeholder="Enter amount"
        onChange={(e) => setAmount(Number(e.target.value))}
      />

      {amount > balance && (
        <p style={{ color: "red" }}>
          Insufficient funds
        </p>
      )}

      <button
        disabled={amount <= 0 || amount > balance}
        onClick={() => onTransfer(amount)}
      >
        Transfer
      </button>

    </div>
  )
}
