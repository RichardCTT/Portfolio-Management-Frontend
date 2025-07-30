# PriceDailyApi

All URIs are relative to _http://localhost:3000_

| Method                                                                | HTTP request                             | Description                        |
| --------------------------------------------------------------------- | ---------------------------------------- | ---------------------------------- |
| [**apiPriceDailyDebugTimezonePost**](#apipricedailydebugtimezonepost) | **POST** /api/price_daily/debug-timezone | 调试时区问题 - 检查日期处理        |
| [**apiPriceDailyGet**](#apipricedailyget)                             | **GET** /api/price_daily                 | 获取某资产的所有价格记录           |
| [**apiPriceDailyIdDelete**](#apipricedailyiddelete)                   | **DELETE** /api/price_daily/{id}         | 删除价格记录                       |
| [**apiPriceDailyIdGet**](#apipricedailyidget)                         | **GET** /api/price_daily/{id}            | 获取单个价格记录详情               |
| [**apiPriceDailyPost**](#apipricedailypost)                           | **POST** /api/price_daily                | 创建/更新价格记录                  |
| [**apiPriceDailyRangePost**](#apipricedailyrangepost)                 | **POST** /api/price_daily/range          | 获取特定资产在时间范围内的价格数据 |

# **apiPriceDailyDebugTimezonePost**

> apiPriceDailyDebugTimezonePost(apiPriceDailyDebugTimezonePostRequest)

### Example

```typescript
import {
  PriceDailyApi,
  Configuration,
  ApiPriceDailyDebugTimezonePostRequest,
} from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let apiPriceDailyDebugTimezonePostRequest: ApiPriceDailyDebugTimezonePostRequest //

const { status, data } = await apiInstance.apiPriceDailyDebugTimezonePost(
  apiPriceDailyDebugTimezonePostRequest
)
```

### Parameters

| Name                                      | Type                                      | Description | Notes |
| ----------------------------------------- | ----------------------------------------- | ----------- | ----- |
| **apiPriceDailyDebugTimezonePostRequest** | **ApiPriceDailyDebugTimezonePostRequest** |             |       |

### Return type

void (empty response body)

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: Not defined

### HTTP response details

| Status code | Description | Response headers |
| ----------- | ----------- | ---------------- |
| **200**     | 调试信息    | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPriceDailyGet**

> ApiPriceDailyGet200Response apiPriceDailyGet()

### Example

```typescript
import { PriceDailyApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let assetId: number //资产的唯一标识符 (optional) (default to undefined)
let page: number //页码 (optional) (default to undefined)
let pageSize: number //每页条目数 (optional) (default to undefined)

const { status, data } = await apiInstance.apiPriceDailyGet(
  assetId,
  page,
  pageSize
)
```

### Parameters

| Name         | Type         | Description      | Notes                            |
| ------------ | ------------ | ---------------- | -------------------------------- |
| **assetId**  | [**number**] | 资产的唯一标识符 | (optional) defaults to undefined |
| **page**     | [**number**] | 页码             | (optional) defaults to undefined |
| **pageSize** | [**number**] | 每页条目数       | (optional) defaults to undefined |

### Return type

**ApiPriceDailyGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取价格记录列表 | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPriceDailyIdDelete**

> ApiAssetTypesIdDelete200Response apiPriceDailyIdDelete()

### Example

```typescript
import { PriceDailyApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let id: number //价格记录ID (default to undefined)

const { status, data } = await apiInstance.apiPriceDailyIdDelete(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 价格记录ID  | defaults to undefined |

### Return type

**ApiAssetTypesIdDelete200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 价格记录删除成功 | -                |
| **404**     | 价格记录未找到   | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPriceDailyIdGet**

> ApiPriceDailyPost200Response apiPriceDailyIdGet()

### Example

```typescript
import { PriceDailyApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let id: number //价格记录ID (default to undefined)

const { status, data } = await apiInstance.apiPriceDailyIdGet(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 价格记录ID  | defaults to undefined |

### Return type

**ApiPriceDailyPost200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取价格记录详情 | -                |
| **404**     | 价格记录未找到       | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPriceDailyPost**

> ApiPriceDailyPost200Response apiPriceDailyPost(apiPriceDailyPostRequest)

### Example

```typescript
import { PriceDailyApi, Configuration, ApiPriceDailyPostRequest } from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let apiPriceDailyPostRequest: ApiPriceDailyPostRequest //

const { status, data } = await apiInstance.apiPriceDailyPost(
  apiPriceDailyPostRequest
)
```

### Parameters

| Name                         | Type                         | Description | Notes |
| ---------------------------- | ---------------------------- | ----------- | ----- |
| **apiPriceDailyPostRequest** | **ApiPriceDailyPostRequest** |             |       |

### Return type

**ApiPriceDailyPost200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 价格记录更新成功 | -                |
| **201**     | 价格记录创建成功 | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiPriceDailyRangePost**

> ApiPriceDailyRangePost200Response apiPriceDailyRangePost(apiPriceDailyRangePostRequest)

### Example

```typescript
import {
  PriceDailyApi,
  Configuration,
  ApiPriceDailyRangePostRequest,
} from './api'

const configuration = new Configuration()
const apiInstance = new PriceDailyApi(configuration)

let apiPriceDailyRangePostRequest: ApiPriceDailyRangePostRequest //

const { status, data } = await apiInstance.apiPriceDailyRangePost(
  apiPriceDailyRangePostRequest
)
```

### Parameters

| Name                              | Type                              | Description | Notes |
| --------------------------------- | --------------------------------- | ----------- | ----- |
| **apiPriceDailyRangePostRequest** | **ApiPriceDailyRangePostRequest** |             |       |

### Return type

**ApiPriceDailyRangePost200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取价格数据列表 | -                |
| **400**     | 参数错误             | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
