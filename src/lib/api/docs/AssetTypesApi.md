# AssetTypesApi

All URIs are relative to _http://localhost:3000_

| Method                                              | HTTP request                     | Description      |
| --------------------------------------------------- | -------------------------------- | ---------------- |
| [**apiAssetTypesGet**](#apiassettypesget)           | **GET** /api/asset_types         | 获取所有资产类型 |
| [**apiAssetTypesIdDelete**](#apiassettypesiddelete) | **DELETE** /api/asset_types/{id} | 删除资产类型     |
| [**apiAssetTypesIdGet**](#apiassettypesidget)       | **GET** /api/asset_types/{id}    | 获取单个资产类型 |
| [**apiAssetTypesIdPut**](#apiassettypesidput)       | **PUT** /api/asset_types/{id}    | 更新资产类型     |
| [**apiAssetTypesPost**](#apiassettypespost)         | **POST** /api/asset_types        | 创建资产类型     |

# **apiAssetTypesGet**

> ApiAssetTypesGet200Response apiAssetTypesGet()

### Example

```typescript
import { AssetTypesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetTypesApi(configuration)

let page: number //页码 (optional) (default to undefined)
let pageSize: number //每页条目数 (optional) (default to undefined)

const { status, data } = await apiInstance.apiAssetTypesGet(page, pageSize)
```

### Parameters

| Name         | Type         | Description | Notes                            |
| ------------ | ------------ | ----------- | -------------------------------- |
| **page**     | [**number**] | 页码        | (optional) defaults to undefined |
| **pageSize** | [**number**] | 每页条目数  | (optional) defaults to undefined |

### Return type

**ApiAssetTypesGet200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description          | Response headers |
| ----------- | -------------------- | ---------------- |
| **200**     | 成功获取资产类型列表 | -                |
| **500**     | 服务器错误           | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetTypesIdDelete**

> ApiAssetTypesIdDelete200Response apiAssetTypesIdDelete()

### Example

```typescript
import { AssetTypesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetTypesApi(configuration)

let id: number //资产类型ID (default to undefined)

const { status, data } = await apiInstance.apiAssetTypesIdDelete(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 资产类型ID  | defaults to undefined |

### Return type

**ApiAssetTypesIdDelete200Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description                  | Response headers |
| ----------- | ---------------------------- | ---------------- |
| **200**     | 资产类型删除成功             | -                |
| **404**     | 资产类型未找到               | -                |
| **409**     | 资产类型关联了资产，无法删除 | -                |
| **500**     | 服务器错误                   | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetTypesIdGet**

> ApiAssetTypesPost201Response apiAssetTypesIdGet()

### Example

```typescript
import { AssetTypesApi, Configuration } from './api'

const configuration = new Configuration()
const apiInstance = new AssetTypesApi(configuration)

let id: number //资产类型ID (default to undefined)

const { status, data } = await apiInstance.apiAssetTypesIdGet(id)
```

### Parameters

| Name   | Type         | Description | Notes                 |
| ------ | ------------ | ----------- | --------------------- |
| **id** | [**number**] | 资产类型ID  | defaults to undefined |

### Return type

**ApiAssetTypesPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: Not defined
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 成功获取资产类型 | -                |
| **404**     | 资产类型未找到   | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetTypesIdPut**

> ApiAssetTypesPost201Response apiAssetTypesIdPut(apiAssetTypesIdPutRequest)

### Example

```typescript
import { AssetTypesApi, Configuration, ApiAssetTypesIdPutRequest } from './api'

const configuration = new Configuration()
const apiInstance = new AssetTypesApi(configuration)

let id: number //资产类型ID (default to undefined)
let apiAssetTypesIdPutRequest: ApiAssetTypesIdPutRequest //

const { status, data } = await apiInstance.apiAssetTypesIdPut(
  id,
  apiAssetTypesIdPutRequest
)
```

### Parameters

| Name                          | Type                          | Description | Notes                 |
| ----------------------------- | ----------------------------- | ----------- | --------------------- |
| **apiAssetTypesIdPutRequest** | **ApiAssetTypesIdPutRequest** |             |                       |
| **id**                        | [**number**]                  | 资产类型ID  | defaults to undefined |

### Return type

**ApiAssetTypesPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **200**     | 资产类型更新成功 | -                |
| **404**     | 资产类型未找到   | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiAssetTypesPost**

> ApiAssetTypesPost201Response apiAssetTypesPost(apiAssetTypesPostRequest)

### Example

```typescript
import { AssetTypesApi, Configuration, ApiAssetTypesPostRequest } from './api'

const configuration = new Configuration()
const apiInstance = new AssetTypesApi(configuration)

let apiAssetTypesPostRequest: ApiAssetTypesPostRequest //

const { status, data } = await apiInstance.apiAssetTypesPost(
  apiAssetTypesPostRequest
)
```

### Parameters

| Name                         | Type                         | Description | Notes |
| ---------------------------- | ---------------------------- | ----------- | ----- |
| **apiAssetTypesPostRequest** | **ApiAssetTypesPostRequest** |             |       |

### Return type

**ApiAssetTypesPost201Response**

### Authorization

No authorization required

### HTTP request headers

- **Content-Type**: application/json
- **Accept**: application/json

### HTTP response details

| Status code | Description      | Response headers |
| ----------- | ---------------- | ---------------- |
| **201**     | 资产类型创建成功 | -                |
| **500**     | 服务器错误       | -                |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)
