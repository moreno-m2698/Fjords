
import { useQueries } from '@tanstack/react-query'
import { getItemAssetFromItemId } from '../../services/assetApiCalls'
interface InventoryComponentProps {
  inventory: number[]
}


function InventoryComponent(props:InventoryComponentProps) {

  const inventoryQueries = useQueries({
    queries: props.inventory.map((itemId) => {
      return {
        queryKey: ["itemAsset", itemId!],
        queryFn: () => getItemAssetFromItemId(itemId)
      }
    })
  })
  
  return (
    <ol>
      {inventoryQueries.map((itemQuery) => <img src={itemQuery.data}/>)}
    </ol>
  )
}

export default InventoryComponent