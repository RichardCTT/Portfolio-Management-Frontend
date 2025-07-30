# ApiTransactionsGet200ResponseDataItemsInner

## Properties

| Name                 | Type       | Description                           | Notes                             |
| -------------------- | ---------- | ------------------------------------- | --------------------------------- |
| **id**               | **number** | 交易记录ID                            | [optional] [default to undefined] |
| **asset_id**         | **number** | 资产ID                                | [optional] [default to undefined] |
| **transaction_type** | **string** | 交易类型(IN&#x3D;入库, OUT&#x3D;出库) | [optional] [default to undefined] |
| **quantity**         | **number** | 交易数量                              | [optional] [default to undefined] |
| **price**            | **number** | 交易单价                              | [optional] [default to undefined] |
| **transaction_date** | **string** | 交易日期                              | [optional] [default to undefined] |
| **holding**          | **number** | 交易后资产余额                        | [optional] [default to undefined] |
| **description**      | **string** | 描述                                  | [optional] [default to undefined] |
| **asset_name**       | **string** | 资产名称                              | [optional] [default to undefined] |
| **asset_code**       | **string** | 资产代码                              | [optional] [default to undefined] |

## Example

```typescript
import { ApiTransactionsGet200ResponseDataItemsInner } from './api'

const instance: ApiTransactionsGet200ResponseDataItemsInner = {
  id,
  asset_id,
  transaction_type,
  quantity,
  price,
  transaction_date,
  holding,
  description,
  asset_name,
  asset_code,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
