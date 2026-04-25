import Card from '../../ui/Card'
import BudgetCategory from '../BudgetCategory'

function BudgetCategories({ categories }) {
  return (
    <Card title="Budget Categories" description="Spending control by category">
      {categories.map((category) => (
        <BudgetCategory key={category.id} category={category} />
      ))}
    </Card>
  )
}

export default BudgetCategories
