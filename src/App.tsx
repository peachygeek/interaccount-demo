import { useState } from "react";
import TransferForm from "./components/TransferForm";
import { processTransfer } from "./services/transactionService";
import type { Transaction } from "./types/transaction";

export default function App() {
  const [balanceA, setBalanceA] = useState(50000);
  const [balanceB, setBalanceB] = useState(2000);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const logTransaction = (amount: number, status: Transaction["status"]) => {
    setTransactions((prev) => [
      {
        id: crypto.randomUUID(),
        amount,
        status,
        date: new Date().toLocaleString(),
      },
      ...prev,
    ]);
  };

  const handleTransfer = async (amount: number) => {
    try {
      const newBalance = await processTransfer(amount, balanceA);
      setBalanceA(newBalance);
      setBalanceB((prev) => prev + amount);
      logTransaction(amount, "Success");
    } catch {
      logTransaction(amount, "Failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-10">
      <h1 className="text-3xl font-bold mb-8">Inter-Account Transfer Demo</h1>

      <div className="grid grid-cols-2 gap-6 mb-8">
        <AccountCard label="Account A" balance={balanceA} />
        <AccountCard label="Account B" balance={balanceB} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Transfer Funds</h2>
        <TransferForm balance={balanceA} onTransfer={handleTransfer} />
      </div>

      <div className="bg-white p-6 rounded-xl shadow">
        <h2 className="text-xl font-semibold mb-4">Transaction History</h2>

        {transactions.length === 0 ? (
          <p className="text-gray-500">No transactions yet</p>
        ) : (
          transactions.map((t) => (
            <TransactionRow key={t.id} transaction={t} />
          ))
        )}
      </div>
    </div>
  );
}

function AccountCard({ label, balance }: { label: string; balance: number }) {
  return (
    <div className="bg-white p-6 rounded-xl shadow">
      <h2 className="text-xl font-semibold">{label}</h2>
      <p className="text-2xl font-bold mt-2">R{balance}</p>
    </div>
  );
}

function TransactionRow({ transaction: t }: { transaction: Transaction }) {
  const statusClass =
    t.status === "Success" ? "text-green-600" : "text-red-600";

  return (
    <div className="flex justify-between border-b py-2">
      <div>
        <p className="font-medium">Transfer</p>
        <p className="text-sm text-gray-500">{t.date}</p>
      </div>
      <div className="text-right">
        <p className="font-medium">R{t.amount}</p>
        <p className={`${statusClass} text-sm`}>{t.status}</p>
      </div>
    </div>
  );
}
