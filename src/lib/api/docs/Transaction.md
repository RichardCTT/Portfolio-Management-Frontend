# Transaction

## Properties

| Name                 | Type       | Description                                         | Notes                             |
| -------------------- | ---------- | --------------------------------------------------- | --------------------------------- |
| **id**               | **number** | Transaction ID                                      | [optional] [default to undefined] |
| **asset_id**         | **number** | Asset ID                                            | [optional] [default to undefined] |
| **asset_name**       | **string** | Asset name                                          | [optional] [default to undefined] |
| **asset_code**       | **string** | Asset code                                          | [optional] [default to undefined] |
| **asset_type_name**  | **string** | Asset type name                                     | [optional] [default to undefined] |
| **transaction_type** | **string** | Transaction type (IN &#x3D; add, OUT &#x3D; remove) | [optional] [default to undefined] |
| **quantity**         | **number** | Quantity involved in transaction                    | [optional] [default to undefined] |
| **price**            | **number** | Unit price at time of transaction                   | [optional] [default to undefined] |
| **transaction_date** | **string** | Date and time of transaction                        | [optional] [default to undefined] |
| **holding**          | **number** | Asset balance after this transaction                | [optional] [default to undefined] |
| **description**      | **string** | Transaction description or notes                    | [optional] [default to undefined] |

## Example

```typescript
import { Transaction } from './api'

const instance: Transaction = {
  id,
  asset_id,
  asset_name,
  asset_code,
  asset_type_name,
  transaction_type,
  quantity,
  price,
  transaction_date,
  holding,
  description,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
