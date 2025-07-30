# AssetTypeResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**date** | **string** | Analysis date | [optional] [default to undefined]
**assetType** | **string** | Asset type name | [optional] [default to undefined]
**totalValueUSD** | **number** | Total value in USD | [optional] [default to undefined]
**totalPrice** | **number** | Total price in USD | [optional] [default to undefined]
**assets** | [**Array&lt;Asset&gt;**](Asset.md) |  | [optional] [default to undefined]
**summary** | [**AssetTypeResponseDataSummary**](AssetTypeResponseDataSummary.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AssetTypeResponseData } from './api';

const instance: AssetTypeResponseData = {
    date,
    assetType,
    totalValueUSD,
    totalPrice,
    assets,
    summary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
