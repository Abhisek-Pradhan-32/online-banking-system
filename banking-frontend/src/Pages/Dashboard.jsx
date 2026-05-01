import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";
import { motion } from "framer-motion";
import {
  Shield, LogOut, Wallet, Send, ArrowUpDown,
  Search, Download, TrendingUp, TrendingDown,
  IndianRupee, Plus
} from "lucide-react";

function Dashboard() {

  const [receiverEmail, setReceiverEmail] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);
  const [balance, setBalance] = useState(0);

  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("ALL");

  const token = localStorage.getItem("token");
  const userEmail = localStorage.getItem("email");

  const navigate = useNavigate();

  const loadBalance = async () => {
    const res = await api.get("/account/balance", {
      headers: { Authorization: "Bearer " + token }
    });
    setBalance(res.data);
  };

  const loadHistory = async () => {
    const res = await api.get("/transfer/history", {
      headers: { Authorization: "Bearer " + token }
    });
    setTransactions(res.data);
  };

  useEffect(() => {
    loadBalance();
    loadHistory();
  }, []);

  const transfer = async () => {
    try {
      const res = await api.post(
        "/transfer",
        {
          receiverEmail,
          amount: parseFloat(amount)
        },
        {
          headers: {
            Authorization: "Bearer " + token
          }
        }
      );

      alert(res.data);

      setReceiverEmail("");
      setAmount("");

      loadBalance();
      loadHistory();

    } catch {
      alert("Transfer Failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  const filteredTransactions = useMemo(() => {

    return transactions.filter((tx) => {

      const isDebit = tx.senderEmail === userEmail;
      const otherUser = isDebit
        ? tx.receiverEmail
        : tx.senderEmail;

      const matchSearch =
        otherUser.toLowerCase()
          .includes(search.toLowerCase());

      const matchFilter =
        filter === "ALL" ||
        (filter === "DEBIT" && isDebit) ||
        (filter === "CREDIT" && !isDebit);

      return matchSearch && matchFilter;
    });

  }, [transactions, search, filter]);

  const downloadCSV = () => {

    let csv =
      "Type,User,Amount,Date\n";

    filteredTransactions.forEach((tx) => {

      const isDebit =
        tx.senderEmail === userEmail;

      const row = [
        isDebit ? "Debit" : "Credit",
        isDebit
          ? tx.receiverEmail
          : tx.senderEmail,
        tx.amount,
        new Date(tx.createdAt)
          .toLocaleString()
      ].join(",");

      csv += row + "\n";
    });

    const blob =
      new Blob([csv], {
        type: "text/csv"
      });

    const url =
      window.URL.createObjectURL(blob);

    const a =
      document.createElement("a");

    a.href = url;
    a.download =
      "statement.csv";

    a.click();
  };

  const payNow = async (amount) => {

    const token = localStorage.getItem("token");

    const res = await api.post(
      "/payment/create-order?amount=" + amount,
      {},
      {
        headers: {
          Authorization: "Bearer " + token
        }
      }
    );

    const data = res.data;

    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY,
      amount: data.amount,
      currency: "INR",
      name: "Online Banking",
      description: "Add Money",
      order_id: data.id,

      handler: async function (response) {

        const token = localStorage.getItem("token");

        await api.post(
          "/payment/verify",
          {
            paymentId: response.razorpay_payment_id,
            orderId: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: amount
          },
          {
            headers: {
              Authorization: "Bearer " + token
            }
          }
        );

        alert("Money Added Successfully");
        loadBalance();
      }
    }

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <div className="dashboard-page">

      {/* Header */}
      <header className="dashboard-header">
        <div className="dashboard-logo">
          <div className="dashboard-logo-icon">
            <Shield size={18} color="white" />
          </div>
          <span className="dashboard-logo-text">SecureBank</span>
        </div>

        <div className="dashboard-user-info">
          <span className="user-email">{userEmail}</span>
          <button
            onClick={logout}
            className="btn-logout"
            id="logout-button"
          >
            <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <LogOut size={14} />
              Logout
            </span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="dashboard-content">

        {/* Balance Card */}
        <motion.div
          className="balance-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          style={{ animation: 'none' }}
        >
          <p className="balance-label">
            <Wallet size={16} style={{ display: 'inline', verticalAlign: 'middle', marginRight: '6px' }} />
            Available Balance
          </p>
          <h2 className="balance-amount">
            ₹ {balance.toLocaleString('en-IN')}
          </h2>
          <div className="balance-actions">
            <button
              onClick={() => payNow(1000)}
              className="btn-add-money"
              id="add-money-button"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} />
                Add ₹1,000
              </span>
            </button>
            <button
              onClick={() => payNow(5000)}
              className="btn-add-money"
              id="add-money-5000-button"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Plus size={16} />
                Add ₹5,000
              </span>
            </button>
          </div>
        </motion.div>

        {/* Transfer Money */}
        <motion.div
          className="section-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          style={{ animation: 'none' }}
        >
          <h2 className="section-title">
            <span className="section-title-icon">
              <Send size={16} color="#818cf8" />
            </span>
            Transfer Money
          </h2>

          <div className="transfer-grid">
            <input
              value={receiverEmail}
              placeholder="Receiver Email"
              className="dash-input"
              onChange={(e) => setReceiverEmail(e.target.value)}
              id="transfer-receiver"
            />

            <input
              value={amount}
              placeholder="Amount (₹)"
              className="dash-input"
              onChange={(e) => setAmount(e.target.value)}
              id="transfer-amount"
            />

            <button
              onClick={transfer}
              className="btn-send"
              id="transfer-button"
            >
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                <Send size={15} />
                Send
              </span>
            </button>
          </div>
        </motion.div>

        {/* Transaction History */}
        <motion.div
          className="section-card"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          style={{ animation: 'none' }}
        >
          <h2 className="section-title">
            <span className="section-title-icon">
              <ArrowUpDown size={16} color="#818cf8" />
            </span>
            Transaction History
          </h2>

          <div className="filter-bar">
            <div className="input-wrapper" style={{ flex: 1 }}>
              <Search size={16} className="input-icon" />
              <input
                placeholder="Search by user..."
                className="auth-input"
                style={{ paddingLeft: '44px' }}
                onChange={(e) => setSearch(e.target.value)}
                id="search-transactions"
              />
            </div>

            <select
              className="dash-select"
              onChange={(e) => setFilter(e.target.value)}
              id="filter-transactions"
            >
              <option value="ALL">All Transactions</option>
              <option value="CREDIT">Credit Only</option>
              <option value="DEBIT">Debit Only</option>
            </select>

            <button
              onClick={downloadCSV}
              className="btn-download"
              id="download-csv-button"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <Download size={14} />
                Download CSV
              </span>
            </button>
          </div>

          <div className="table-wrapper">
            {filteredTransactions.length === 0 ? (
              <div className="empty-state">
                <div className="empty-state-icon">📊</div>
                <p className="empty-state-text">No transactions found</p>
              </div>
            ) : (
              <table className="tx-table">
                <thead>
                  <tr>
                    <th>Type</th>
                    <th>User</th>
                    <th>Amount</th>
                    <th>Date</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredTransactions.map((tx) => {

                    const isDebit =
                      tx.senderEmail === userEmail;

                    return (
                      <tr key={tx.id}>
                        <td>
                          {isDebit ? (
                            <span className="badge-debit">
                              <TrendingDown size={12} />
                              Debit
                            </span>
                          ) : (
                            <span className="badge-credit">
                              <TrendingUp size={12} />
                              Credit
                            </span>
                          )}
                        </td>

                        <td>
                          {isDebit
                            ? tx.receiverEmail
                            : tx.senderEmail}
                        </td>

                        <td className={isDebit ? 'amount-debit' : 'amount-credit'}>
                          {isDebit ? "- ₹" : "+ ₹"}
                          {tx.amount.toLocaleString('en-IN')}
                        </td>

                        <td>
                          {new Date(
                            tx.createdAt
                          ).toLocaleString()}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </motion.div>

      </div>
    </div>
  );
}

export default Dashboard;