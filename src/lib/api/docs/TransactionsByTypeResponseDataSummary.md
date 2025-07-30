# TransactionsByTypeResponseDataSummary

## Properties

| Name                   | Type       | Description                               | Notes                             |
| ---------------------- | ---------- | ----------------------------------------- | --------------------------------- |
| **total_in_quantity**  | **number** | Total quantity added (IN transactions)    | [optional] [default to undefined] |
| **total_out_quantity** | **number** | Total quantity removed (OUT transactions) | [optional] [default to undefined] |
| **net_quantity**       | **number** | Net quantity (IN - OUT)                   | [optional] [default to undefined] |
| **total_in_value**     | **number** | Total value of IN transactions            | [optional] [default to undefined] |
| **total_out_value**    | **number** | Total value of OUT transactions           | [optional] [default to undefined] |
| **net_value**          | **number** | Net value (IN - OUT)                      | [optional] [default to undefined] |

## Example

```typescript
import { TransactionsByTypeResponseDataSummary } from './api'

const instance: TransactionsByTypeResponseDataSummary = {
  total_in_quantity,
  total_out_quantity,
  net_quantity,
  total_in_value,
  total_out_value,
  net_value,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
