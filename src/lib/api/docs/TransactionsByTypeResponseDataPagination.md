# TransactionsByTypeResponseDataPagination

## Properties

| Name            | Type        | Description                      | Notes                             |
| --------------- | ----------- | -------------------------------- | --------------------------------- |
| **page**        | **number**  | Current page number              | [optional] [default to undefined] |
| **limit**       | **number**  | Number of items per page         | [optional] [default to undefined] |
| **total_pages** | **number**  | Total number of pages            | [optional] [default to undefined] |
| **has_next**    | **boolean** | Whether there is a next page     | [optional] [default to undefined] |
| **has_prev**    | **boolean** | Whether there is a previous page | [optional] [default to undefined] |

## Example

```typescript
import { TransactionsByTypeResponseDataPagination } from './api'

const instance: TransactionsByTypeResponseDataPagination = {
  page,
  limit,
  total_pages,
  has_next,
  has_prev,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
