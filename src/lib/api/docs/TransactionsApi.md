# TransactionsApi

All URIs are relative to *http://localhost:3000*

|Method | HTTP request | Description|
|------------- | ------------- | -------------|
|[**apiTransactionsBuyPost**](#apitransactionsbuypost) | **POST** /api/transactions/buy | 买入资产|
|[**apiTransactionsGet**](#apitransactionsget) | **GET** /api/transactions | 获取所有交易记录|
|[**apiTransactionsIdDelete**](#apitransactionsiddelete) | **DELETE** /api/transactions/{id} | 删除交易记录|
|[**apiTransactionsIdGet**](#apitransactionsidget) | **GET** /api/transactions/{id} | 获取单个交易记录详情|
|[**apiTransactionsSellPost**](#apitransactionssellpost) | **POST** /api/transactions/sell | 卖出资产|

# **apiTransactionsBuyPost**
> ApiTransactionsBuyPost201Response apiTransactionsBuyPost(apiTransactionsBuyPostRequest)

根据指定日期的价格买入资产，自动从现金账户扣除对应金额

### Example

```typescript
import {
    TransactionsApi,
    Configuration,
    ApiTransactionsBuyPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let apiTransactionsBuyPostRequest: ApiTransactionsBuyPostRequest; //

const { status, data } = await apiInstance.apiTransactionsBuyPost(
    apiTransactionsBuyPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiTransactionsBuyPostRequest** | **ApiTransactionsBuyPostRequest**|  | |


### Return type

**ApiTransactionsBuyPost201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | 资产购买成功 |  -  |
|**400** | 请求参数错误或资金不足 |  -  |
|**404** | 资产未找到或当日无价格数据 |  -  |
|**500** | 服务器错误 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiTransactionsGet**
> ApiTransactionsGet200Response apiTransactionsGet()


### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let page: number; //页码 (optional) (default to undefined)
let pageSize: number; //每页条目数 (optional) (default to undefined)
let assetId: number; //筛选特定资产的交易 (optional) (default to undefined)

const { status, data } = await apiInstance.apiTransactionsGet(
    page,
    pageSize,
    assetId
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **page** | [**number**] | 页码 | (optional) defaults to undefined|
| **pageSize** | [**number**] | 每页条目数 | (optional) defaults to undefined|
| **assetId** | [**number**] | 筛选特定资产的交易 | (optional) defaults to undefined|


### Return type

**ApiTransactionsGet200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 成功获取交易记录列表 |  -  |
|**500** | 服务器错误 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiTransactionsIdDelete**
> ApiAssetTypesIdDelete200Response apiTransactionsIdDelete()


### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let id: number; //交易记录ID (default to undefined)

const { status, data } = await apiInstance.apiTransactionsIdDelete(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | 交易记录ID | defaults to undefined|


### Return type

**ApiAssetTypesIdDelete200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 交易记录删除成功 |  -  |
|**404** | 交易记录未找到 |  -  |
|**500** | 服务器错误 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiTransactionsIdGet**
> ApiTransactionsIdGet200Response apiTransactionsIdGet()


### Example

```typescript
import {
    TransactionsApi,
    Configuration
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let id: number; //交易记录ID (default to undefined)

const { status, data } = await apiInstance.apiTransactionsIdGet(
    id
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **id** | [**number**] | 交易记录ID | defaults to undefined|


### Return type

**ApiTransactionsIdGet200Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: Not defined
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**200** | 成功获取交易记录详情 |  -  |
|**404** | 交易记录未找到 |  -  |
|**500** | 服务器错误 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

# **apiTransactionsSellPost**
> ApiTransactionsSellPost201Response apiTransactionsSellPost(apiTransactionsSellPostRequest)

根据指定日期的价格卖出资产，自动向现金账户添加对应金额

### Example

```typescript
import {
    TransactionsApi,
    Configuration,
    ApiTransactionsSellPostRequest
} from './api';

const configuration = new Configuration();
const apiInstance = new TransactionsApi(configuration);

let apiTransactionsSellPostRequest: ApiTransactionsSellPostRequest; //

const { status, data } = await apiInstance.apiTransactionsSellPost(
    apiTransactionsSellPostRequest
);
```

### Parameters

|Name | Type | Description  | Notes|
|------------- | ------------- | ------------- | -------------|
| **apiTransactionsSellPostRequest** | **ApiTransactionsSellPostRequest**|  | |


### Return type

**ApiTransactionsSellPost201Response**

### Authorization

No authorization required

### HTTP request headers

 - **Content-Type**: application/json
 - **Accept**: application/json


### HTTP response details
| Status code | Description | Response headers |
|-------------|-------------|------------------|
|**201** | 资产卖出成功 |  -  |
|**400** | 请求参数错误或持仓不足 |  -  |
|**404** | 资产未找到或当日无价格数据 |  -  |
|**500** | 服务器错误 |  -  |

[[Back to top]](#) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to Model list]](../README.md#documentation-for-models) [[Back to README]](../README.md)

