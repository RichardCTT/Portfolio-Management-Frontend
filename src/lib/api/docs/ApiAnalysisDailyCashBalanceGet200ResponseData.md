# ApiAnalysisDailyCashBalanceGet200ResponseData

## Properties

| Name                | Type                                                                                                                                                   | Description | Notes                             |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ | ----------- | --------------------------------- |
| **asset_info**      | [**ApiAnalysisDailyCashBalanceGet200ResponseDataAssetInfo**](ApiAnalysisDailyCashBalanceGet200ResponseDataAssetInfo.md)                                |             | [optional] [default to undefined] |
| **analysis_period** | [**ApiAnalysisDailyCashBalanceGet200ResponseDataAnalysisPeriod**](ApiAnalysisDailyCashBalanceGet200ResponseDataAnalysisPeriod.md)                      |             | [optional] [default to undefined] |
| **initial_holding** | **string**                                                                                                                                             |             | [optional] [default to undefined] |
| **final_holding**   | **string**                                                                                                                                             |             | [optional] [default to undefined] |
| **total_change**    | **string**                                                                                                                                             |             | [optional] [default to undefined] |
| **daily_balances**  | [**Array&lt;ApiAnalysisDailyCashBalanceGet200ResponseDataDailyBalancesInner&gt;**](ApiAnalysisDailyCashBalanceGet200ResponseDataDailyBalancesInner.md) |             | [optional] [default to undefined] |
| **summary**         | [**ApiAnalysisDailyCashBalanceGet200ResponseDataSummary**](ApiAnalysisDailyCashBalanceGet200ResponseDataSummary.md)                                    |             | [optional] [default to undefined] |

## Example

```typescript
import { ApiAnalysisDailyCashBalanceGet200ResponseData } from './api'

const instance: ApiAnalysisDailyCashBalanceGet200ResponseData = {
  asset_info,
  analysis_period,
  initial_holding,
  final_holding,
  total_change,
  daily_balances,
  summary,
}
```

[[Back to Model list]](../README.md#documentation-for-models) [[Back to API list]](../README.md#documentation-for-api-endpoints) [[Back to README]](../README.md)
