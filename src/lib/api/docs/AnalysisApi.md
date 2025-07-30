# AnalysisApi

All URIs are relative to _http://localhost:3000_

| Method                                                                      | HTTP request                                | Description                                        |
| --------------------------------------------------------------------------- | ------------------------------------------- | -------------------------------------------------- |
| [**apiAnalysisAssetHoldingGet**](#apianalysisassetholdingget)               | **GET** /api/analysis/asset-holding         | 获取资产持仓分析                                   |
| [**apiAnalysisAssetHoldingSummaryGet**](#apianalysisassetholdingsummaryget) | **GET** /api/analysis/asset-holding/summary | 获取资产持仓简要分析                               |
| [**apiAnalysisAssetTotalsByTypeGet**](#apianalysisassettotalsbytypeget)     | **GET** /api/analysis/asset-totals-by-type  | Get total asset values by type for a specific date |
| [**apiAnalysisDailyCashBalanceGet**](#apianalysisdailycashbalanceget)       | **GET** /api/analysis/daily-cash-balance    | Get daily cash balance for the past N days         |

# **apiAnalysisAssetHoldingGet**

> ApiAnalysisAssetHoldingGet200Response apiAnalysisAssetHoldingGet()

获取指定资产在时间范围内的持仓变化和对应的市值分析

### Example

```typescript
import { AnalysisApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AnalysisApi(configuration)

let assetId: number //资产ID (default to undefined)
let startDate: string //开始日期 (YYYY-MM-DD) (default to undefined)
let endDate: string //结束日期 (YYYY-MM-DD) (default to undefined)

const { status, data } = await apiInstance.apiAnalysisAssetHoldingGet(
  assetId,
  startDate,
  endDate
)
```

### Parameters

| Name          | Type         | Description           | Notes                 |
| ------------- | ------------ | --------------------- | --------------------- |
| **assetId**   | [**number**] | 资产ID                | defaults to undefined |
| **startDate** | [**string**] | 开始日期 (YYYY-MM-DD) | defaults to undefined |
| **endDate**   | [**string**] | 结束日期 (YYYY-MM-DD) | defaults to undefined |

### Return type

**ApiAnalysisAssetHoldingGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description    | Response headers |
| ----------- | -------------- | ---------------- |
| **200**     | 分析结果       | -                |
| **400**     | 参数错误       | -                |
| **404**     | 资产不存在     | -                |
| **500**     | 服务器内部错误 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAnalysisAssetHoldingSummaryGet**

> ApiAnalysisAssetHoldingSummaryGet200Response apiAnalysisAssetHoldingSummaryGet()

获取资产在指定时间范围内持仓变化的简要信息

### Example

```typescript
import { AnalysisApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AnalysisApi(configuration)

let assetId: number //资产ID (default to undefined)
let startDate: string //开始日期 (YYYY-MM-DD) (default to undefined)
let endDate: string //结束日期 (YYYY-MM-DD) (default to undefined)

const { status, data } = await apiInstance.apiAnalysisAssetHoldingSummaryGet(
  assetId,
  startDate,
  endDate
)
```

### Parameters

| Name          | Type         | Description           | Notes                 |
| ------------- | ------------ | --------------------- | --------------------- |
| **assetId**   | [**number**] | 资产ID                | defaults to undefined |
| **startDate** | [**string**] | 开始日期 (YYYY-MM-DD) | defaults to undefined |
| **endDate**   | [**string**] | 结束日期 (YYYY-MM-DD) | defaults to undefined |

### Return type

**ApiAnalysisAssetHoldingSummaryGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | 简要分析结果 | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAnalysisAssetTotalsByTypeGet**

> AssetTotalsResponse apiAnalysisAssetTotalsByTypeGet()

Retrieves the total value of all assets categorized by type (cash, stock, bond, cryptocurrency, foreign currency, futures) for a given date. All values are converted to USD. If no date is provided, defaults to today.

### Example

```typescript
import { AnalysisApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AnalysisApi(configuration)

let date: string //Analysis date (YYYY-MM-DD format). Defaults to today if not provided. (optional) (default to undefined)

const { status, data } = await apiInstance.apiAnalysisAssetTotalsByTypeGet(date)
```

### Parameters

| Name     | Type         | Description                                                           | Notes                            |
| -------- | ------------ | --------------------------------------------------------------------- | -------------------------------- |
| **date** | [**string**] | Analysis date (YYYY-MM-DD format). Defaults to today if not provided. | (optional) defaults to undefined |

### Return type

**AssetTotalsResponse**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                                 | Response headers |
| ----------- | ------------------------------------------- | ---------------- |
| **200**     | Successfully retrieved asset totals by type | -                |
| **500**     | Internal server error                       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAnalysisDailyCashBalanceGet**

> ApiAnalysisDailyCashBalanceGet200Response apiAnalysisDailyCashBalanceGet()

Retrieves daily cash balance changes from today going back the specified number of days

### Example

```typescript
import { AnalysisApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AnalysisApi(configuration)

let days: number //Number of days to look back from today (default 30) (optional) (default to 30)

const { status, data } = await apiInstance.apiAnalysisDailyCashBalanceGet(days)
```

### Parameters

| Name     | Type         | Description                                         | Notes                     |
| -------- | ------------ | --------------------------------------------------- | ------------------------- |
| **days** | [**number**] | Number of days to look back from today (default 30) | (optional) defaults to 30 |

### Return type

**ApiAnalysisDailyCashBalanceGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                               | Response headers |
| ----------- | ----------------------------------------- | ---------------- |
| **200**     | Daily cash balance retrieved successfully | -                |
| **400**     | Invalid parameters                        | -                |
| **500**     | Server error                              | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
