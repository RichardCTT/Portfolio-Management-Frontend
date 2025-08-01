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
import type { PriceDaily } from './price-daily'

/**
 *
 * @export
 * @interface ApiPriceDailyGet200ResponseData
 */
export interface ApiPriceDailyGet200ResponseData {
  /**
   *
   * @type {Array<PriceDaily>}
   * @memberof ApiPriceDailyGet200ResponseData
   */
  items?: Array<PriceDaily>
  /**
   *
   * @type {number}
   * @memberof ApiPriceDailyGet200ResponseData
   */
  total?: number
  /**
   *
   * @type {number}
   * @memberof ApiPriceDailyGet200ResponseData
   */
  page?: number
  /**
   *
   * @type {number}
   * @memberof ApiPriceDailyGet200ResponseData
   */
  page_size?: number
}
