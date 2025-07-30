# AssetsApi

All URIs are relative to _http://localhost:3000_

| Method                                      | HTTP request                | Description                    |
| ------------------------------------------- | --------------------------- | ------------------------------ |
| [**apiAssetsGet**](#apiassetsget)           | **GET** /api/assets         | 获取所有资产(包括价格对比)     |
| [**apiAssetsIdDelete**](#apiassetsiddelete) | **DELETE** /api/assets/{id} | 删除资产                       |
| [**apiAssetsIdGet**](#apiassetsidget)       | **GET** /api/assets/{id}    | 获取单个资产详情(包括价格对比) |
| [**apiAssetsIdPut**](#apiassetsidput)       | **PUT** /api/assets/{id}    | 更新资产信息                   |
| [**apiAssetsPost**](#apiassetspost)         | **POST** /api/assets        | 创建资产                       |

# **apiAssetsGet**

> ApiAssetsGet200Response apiAssetsGet()

### Example

```typescript
import { AssetsApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetsApi(configuration)

let page: number //页码 (optional) (default to undefined)
let pageSize: number //每页条目数 (optional) (default to undefined)
let assetTypeId: number //筛选特定类型的资产 (optional) (default to undefined)

const { status, data } = await apiInstance.apiAssetsGet(
  page,
  pageSize,
  assetTypeId
)
```

### Parameters

| Name            | Type         | Description        | Notes                            |
| --------------- | ------------ | ------------------ | -------------------------------- |
| **page**        | [**number**] | 页码               | (optional) defaults to undefined |
| **pageSize**    | [**number**] | 每页条目数         | (optional) defaults to undefined |
| **assetTypeId** | [**number**] | 筛选特定类型的资产 | (optional) defaults to undefined |

### Return type

**ApiAssetsGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 成功获取资产列表 | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetsIdDelete**

> ApiAssetTypesIdDelete200Response apiAssetsIdDelete()

### Example

```typescript
import { AssetsApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetsApi(configuration)

let id: number //资产ID (default to undefined)

const { status, data } = await apiInstance.apiAssetsIdDelete(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 资产ID      | defaults to undefined |

### Return type

**ApiAssetTypesIdDelete200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | 资产删除成功 | -                |
| **404**     | 资产未找到   | -                |
| **500**     | 服务器错误   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetsIdGet**

> ApiAssetsPost201Response apiAssetsIdGet()

### Example

```typescript
import { AssetsApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetsApi(configuration)

let id: number //资产ID (default to undefined)

const { status, data } = await apiInstance.apiAssetsIdGet(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 资产ID      | defaults to undefined |

### Return type

**ApiAssetsPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 成功获取资产详情 | -                |
| **404**     | 资产未找到       | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetsIdPut**

> ApiAssetsPost201Response apiAssetsIdPut(apiAssetsIdPutRequest)

### Example

```typescript
import { AssetsApi, Configuration, ApiAssetsIdPutRequest } from './api'

const configuration = new Configuration()
const apiInstance = new AssetsApi(configuration)

let id: number //资产ID (default to undefined)
let apiAssetsIdPutRequest: ApiAssetsIdPutRequest //

const { status, data } = await apiInstance.apiAssetsIdPut(
  id,
  apiAssetsIdPutRequest
)
```

### Parameters

| Name                      | Type                      | Description | Notes                 |
| ------------------------- | ------------------------- | ----------- | --------------------- |
| **apiAssetsIdPutRequest** | **ApiAssetsIdPutRequest** |             |                       |
| **id**                    | [**number**]              | 资产ID      | defaults to undefined |

### Return type

**ApiAssetsPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **200**     | 资产更新成功 | -                |
| **404**     | 资产未找到   | -                |
| **500**     | 服务器错误   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetsPost**

> ApiAssetsPost201Response apiAssetsPost(apiAssetsPostRequest)

### Example

```typescript
import { AssetsApi, Configuration, ApiAssetsPostRequest } from './api'

const configuration = new Configuration()
const apiInstance = new AssetsApi(configuration)

let apiAssetsPostRequest: ApiAssetsPostRequest //

const { status, data } = await apiInstance.apiAssetsPost(apiAssetsPostRequest)
```

### Parameters

| Name                     | Type                     | Description | Notes |
| ------------------------ | ------------------------ | ----------- | ----- |
| **apiAssetsPostRequest** | **ApiAssetsPostRequest** |             |       |

### Return type

**ApiAssetsPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description  | Response headers |
| ----------- | ------------ | ---------------- |
| **201**     | 资产创建成功 | -                |
| **500**     | 服务器错误   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
