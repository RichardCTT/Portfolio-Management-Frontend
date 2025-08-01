/* tslint:disable */
/* eslint-disable */
/**
 * Portfolio Management API
 * A comprehensive API for managing investment portfolios, tracking assets, and analyzing portfolio performance. Supports multiple asset types including cash, stocks, bonds, cryptocurrencies, foreign currencies, and futures.
 *
 * The version of the OpenAPI document: 1.0.0
 * Contact: support@portfoliomanagement.com
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

// May contain unused imports in some cases
// @ts-ignore
import type { ApiAnalysisAssetHoldingGet200ResponseData } from './api-analysis-asset-holding-get200-response-data'

/**
 *
 * @export
 * @interface ApiAnalysisAssetHoldingGet200Response
 */
export interface ApiAnalysisAssetHoldingGet200Response {
  /**
   *
   * @type {boolean}
   * @memberof ApiAnalysisAssetHoldingGet200Response
   */
  success?: boolean
  /**
   *
   * @type {ApiAnalysisAssetHoldingGet200ResponseData}
   * @memberof ApiAnalysisAssetHoldingGet200Response
   */
  data?: ApiAnalysisAssetHoldingGet200ResponseData
}
