
import { useQueries } from '@tanstack/react-query'
import { getAsset } from '../../services/assetApiCalls'
import '../../CSS/inventory.css'
interface InventoryComponentProps {
  inventory: number[]
}


function InventoryComponent(props:InventoryComponentProps) {

  const inventoryQueries = useQueries({
    queries: props.inventory.map((itemId) => {
      return {
        queryKey: ["itemAsset", itemId!],
        queryFn: () => getAsset(itemId.toString(), "item")
      }
    })
  })
  
  return (
    <div className='match-inventory-container'>
      <ol className="match-inventory">
        {inventoryQueries.map((itemQuery, index) => (index <= 3) ? <li className='match-inventory-top-row' key={index}><img className="inventory-item" src={itemQuery.data} /></li> :
        <li key={index}><img className="inventory-item" src={itemQuery.data} /></li>)}
      </ol>
    </div>
  )
}

export default InventoryComponent