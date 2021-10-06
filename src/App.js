import './App.css'
import Budgets from './features/budgets/Budgets'
import Transactions from './features/transactions/Transactions'

function App() {
	return (
		<div className='App'>
			<Budgets />
			<Transactions />
		</div>
	)
}

export default App
