# TransactionsByTypeResponseData

## Properties

| Name                   | Type                                                                                        | Description                  | Notes                             |
| ---------------------- | ------------------------------------------------------------------------------------------- | ---------------------------- | --------------------------------- |
| **asset_type_id**      | **number**                                                                                  | Asset type ID                | [optional] [default to undefined] |
| **asset_type_name**    | **string**                                                                                  | Asset type name              | [optional] [default to undefined] |
| **date_range**         | [**TransactionsByTypeResponseDataDateRange**](TransactionsByTypeResponseDataDateRange.md)   |                              | [optional] [default to undefined] |
| **total_transactions** | **number**                                                                                  | Total number of transactions | [optional] [default to undefined] |
| **transactions**       | [**Array&lt;Transaction&gt;**](Transaction.md)                                              |                              | [optional] [default to undefined] |
| **summary**            | [**TransactionsByTypeResponseDataSummary**](TransactionsByTypeResponseDataSummary.md)       |                              | [optional] [default to undefined] |
| **pagination**         | [**TransactionsByTypeResponseDataPagination**](TransactionsByTypeResponseDataPagination.md) |                              | [optional] [default to undefined] |

## Example

```typescript
import { TransactionsByTypeResponseData } from './api'

const instance: TransactionsByTypeResponseData = {
  asset_type_id,
  asset_type_name,
  date_range,
  total_transactions,
  transactions,
  summary,
  pagination,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
