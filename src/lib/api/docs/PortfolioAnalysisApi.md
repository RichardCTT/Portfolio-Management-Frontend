# PortfolioAnalysisApi

All URIs are relative to _http://localhost:3000_

| Method                                                                                            | HTTP request                                                | Description                                                            |
| ------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------- |
| [**apiPortfolioTransactionsByTypeAssetTypeIdGet**](#apiportfoliotransactionsbytypeassettypeidget) | **GET** /api/portfolio/transactions-by-type/{asset_type_id} | Get all transactions for assets of a specific type within a date range |

# **apiPortfolioTransactionsByTypeAssetTypeIdGet**

> TransactionsByTypeResponse apiPortfolioTransactionsByTypeAssetTypeIdGet()

Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and transactions tables to provide comprehensive transaction data with asset and type information.

### Example

```typescript
import { PortfolioAnalysisApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new PortfolioAnalysisApi(configuration)

let assetTypeId: number //Asset type ID to filter transactions (default to undefined)
let startDate: string //Start date for filtering transactions (YYYY-MM-DD format). Optional. (optional) (default to undefined)
let endDate: string //End date for filtering transactions (YYYY-MM-DD format). Optional. (optional) (default to undefined)
let page: number //Page number for pagination. Optional. (optional) (default to 1)
let limit: number //Number of items per page for pagination. Optional. (optional) (default to 10)

const { status, data } =
  await apiInstance.apiPortfolioTransactionsByTypeAssetTypeIdGet(
    assetTypeId,
    startDate,
    endDate,
    page,
    limit
  )
```

### Parameters

| Name            | Type         | Description                                                          | Notes                            |
| --------------- | ------------ | -------------------------------------------------------------------- | -------------------------------- |
| **assetTypeId** | [**number**] | Asset type ID to filter transactions                                 | defaults to undefined            |
| **startDate**   | [**string**] | Start date for filtering transactions (YYYY-MM-DD format). Optional. | (optional) defaults to undefined |
| **endDate**     | [**string**] | End date for filtering transactions (YYYY-MM-DD format). Optional.   | (optional) defaults to undefined |
| **page**        | [**number**] | Page number for pagination. Optional.                                | (optional) defaults to 1         |
| **limit**       | [**number**] | Number of items per page for pagination. Optional.                   | (optional) defaults to 10        |

### Return type

**TransactionsByTypeResponse**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                            | Response headers |
| ----------- | ------------------------------------------------------ | ---------------- |
| **200**     | Successfully retrieved transactions for the asset type | -                |
| **400**     | Invalid asset type ID                                  | -                |
| **404**     | Asset type not found                                   | -                |
| **500**     | Internal server error                                  | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
