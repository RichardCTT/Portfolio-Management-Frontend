# Transaction

## Properties

| Name                 | Type       | Description                           | Notes                             |
| -------------------- | ---------- | ------------------------------------- | --------------------------------- |
| **id**               | **number** | 交易记录ID                            | [optional] [default to undefined] |
| **asset_id**         | **number** | 资产ID                                | [default to undefined]            |
| **asset_name**       | **string** | Asset name                            | [optional] [default to undefined] |
| **asset_code**       | **string** | Asset code                            | [optional] [default to undefined] |
| **asset_type_name**  | **string** | Asset type name                       | [optional] [default to undefined] |
| **transaction_type** | **string** | 交易类型(IN&#x3D;入库, OUT&#x3D;出库) | [default to undefined]            |
| **quantity**         | **number** | 交易数量                              | [default to undefined]            |
| **price**            | **number** | 交易单价                              | [default to undefined]            |
| **transaction_date** | **string** | 交易日期                              | [default to undefined]            |
| **holding**          | **number** | 交易后资产余额                        | [default to undefined]            |
| **description**      | **string** | 描述                                  | [optional] [default to undefined] |

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
