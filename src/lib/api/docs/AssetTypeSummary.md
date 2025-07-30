# AssetTypeSummary

## Properties

| Name           | Type                               | Description                   | Notes                             |
| -------------- | ---------------------------------- | ----------------------------- | --------------------------------- |
| **count**      | **number**                         | Number of assets              | [optional] [default to undefined] |
| **totalPrice** | **number**                         | Total price in USD            | [optional] [default to undefined] |
| **assets**     | [**Array&lt;Asset&gt;**](Asset.md) |                               | [optional] [default to undefined] |
| **percentage** | **number**                         | Percentage of total portfolio | [optional] [default to undefined] |

## Example

```typescript
import { AssetTypeSummary } from './api'

const instance: AssetTypeSummary = {
  count,
  totalPrice,
  assets,
  percentage,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
