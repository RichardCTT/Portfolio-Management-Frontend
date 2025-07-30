# ApiTransactionsBuyPostRequest


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**asset_id** | **number** | 要购买的资产ID | [default to undefined]
**quantity** | **number** | 购买数量 | [default to undefined]
**date** | **string** | 购买日期（YYYY-MM-DD格式） | [default to undefined]
**description** | **string** | 交易描述（可选） | [optional] [default to undefined]

## Example

```typescript
import { ApiTransactionsBuyPostRequest } from './api';

const instance: ApiTransactionsBuyPostRequest = {
    asset_id,
    quantity,
    date,
    description,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
