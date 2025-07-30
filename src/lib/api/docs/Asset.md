# Asset


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**id** | **number** | 资产ID | [optional] [default to undefined]
**name** | **string** | 资产名称 | [default to undefined]
**code** | **string** | 资产编码 | [default to undefined]
**quantity** | **number** | 数量 | [default to undefined]
**price** | **number** | Current price | [optional] [default to undefined]
**valueUSD** | **number** | Value in USD | [optional] [default to undefined]
**percentage** | **number** | Percentage of total portfolio | [optional] [default to undefined]
**asset_type_id** | **number** | 资产类型ID | [default to undefined]
**description** | **string** | 描述 | [optional] [default to undefined]
**create_date** | **string** | 创建时间 | [optional] [default to undefined]

## Example

```typescript
import { Asset } from './api';

const instance: Asset = {
    id,
    name,
    code,
    quantity,
    price,
    valueUSD,
    percentage,
    asset_type_id,
    description,
    create_date,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
