# MainPageApi

All URIs are relative to _http://localhost:3000_

| Method                                                                    | HTTP request                              | Description                                |
| ------------------------------------------------------------------------- | ----------------------------------------- | ------------------------------------------ |
| [**apiMainPageSummaryGet**](#apimainpagesummaryget)                       | **GET** /api/main_page/summary            | 获取资产汇总信息(总资产、总盈亏、当日盈亏) |
| [**apiMainPageTotalAssetsHistoryGet**](#apimainpagetotalassetshistoryget) | **GET** /api/main_page/totalAssetsHistory | 获取近10天的总资产变化数据                 |

# **apiMainPageSummaryGet**

> ApiMainPageSummaryGet200Response apiMainPageSummaryGet()

### Example

```typescript
import { MainPageApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new MainPageApi(configuration)

const { status, data } = await apiInstance.apiMainPageSummaryGet()
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ApiMainPageSummaryGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取资产汇总信息 | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiMainPageTotalAssetsHistoryGet**

> ApiMainPageTotalAssetsHistoryGet200Response apiMainPageTotalAssetsHistoryGet()

### Example

```typescript
import { MainPageApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new MainPageApi(configuration)

const { status, data } = await apiInstance.apiMainPageTotalAssetsHistoryGet()
```

### Parameters

This endpoint does not have any parameters.

### Return type

**ApiMainPageTotalAssetsHistoryGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取历史资产数据 | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
