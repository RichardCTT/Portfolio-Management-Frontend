# PriceDaily

## Properties

| Name            | Type       | Description  | Notes                             |
| --------------- | ---------- | ------------ | --------------------------------- |
| **id**          | **number** | 价格记录ID   | [optional] [default to undefined] |
| **asset_id**    | **number** | 资产ID       | [default to undefined]            |
| **date**        | **string** | 价格日期     | [default to undefined]            |
| **price**       | **number** | 当日价格     | [default to undefined]            |
| **create_date** | **string** | 记录创建时间 | [optional] [default to undefined] |

## Example

```typescript
import { PriceDaily } from './api'

const instance: PriceDaily = {
  id,
  asset_id,
  date,
  price,
  create_date,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
