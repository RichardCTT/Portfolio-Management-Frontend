# ApiTransactionsSellPost201ResponseData

## Properties

| Name                 | Type                              | Description  | Notes                             |
| -------------------- | --------------------------------- | ------------ | --------------------------------- |
| **transaction**      | [**Transaction**](Transaction.md) |              | [optional] [default to undefined] |
| **total_received**   | **number**                        | 总收到金额   | [optional] [default to undefined] |
| **new_cash_balance** | **number**                        | 新的现金余额 | [optional] [default to undefined] |

## Example

```typescript
import { ApiTransactionsSellPost201ResponseData } from './api'

const instance: ApiTransactionsSellPost201ResponseData = {
  transaction,
  total_received,
  new_cash_balance,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
