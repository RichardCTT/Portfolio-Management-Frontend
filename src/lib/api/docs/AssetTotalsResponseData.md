# AssetTotalsResponseData


## Properties

Name | Type | Description | Notes
------------ | ------------- | ------------- | -------------
**date** | **string** | Analysis date | [optional] [default to undefined]
**totalValueUSD** | **number** | Total portfolio value in USD | [optional] [default to undefined]
**assetTypes** | [**AssetTotalsResponseDataAssetTypes**](AssetTotalsResponseDataAssetTypes.md) |  | [optional] [default to undefined]
**summary** | [**AssetTotalsResponseDataSummary**](AssetTotalsResponseDataSummary.md) |  | [optional] [default to undefined]

## Example

```typescript
import { AssetTotalsResponseData } from './api';

const instance: AssetTotalsResponseData = {
    date,
    totalValueUSD,
    assetTypes,
    summary,
};
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
