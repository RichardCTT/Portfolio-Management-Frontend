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

import type { Configuration } from '../configuration'
import type { AxiosPromise, AxiosInstance, RawAxiosRequestConfig } from 'axios'
import globalAxios from 'axios'
// Some imports not used depending on template conditions
// @ts-ignore
import {
  DUMMY_BASE_URL,
  assertParamExists,
  setApiKeyToObject,
  setBasicAuthToObject,
  setBearerAuthToObject,
  setOAuthToObject,
  setSearchParams,
  serializeDataIfNeeded,
  toPathString,
  createRequestFunction,
} from '../common'
// @ts-ignore
import {
  BASE_PATH,
  COLLECTION_FORMATS,
  type RequestArgs,
  BaseAPI,
  RequiredError,
  operationServerMap,
} from '../base'
// @ts-ignore
import type { ErrorResponse } from '../models'
// @ts-ignore
import type { TransactionsByTypeResponse } from '../models'
/**
 * PortfolioAnalysisApi - axios parameter creator
 * @export
 */
export const PortfolioAnalysisApiAxiosParamCreator = function (
  configuration?: Configuration
) {
  return {
    /**
     * Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and  transactions tables to provide comprehensive transaction data with asset and  type information.
     * @summary Get all transactions for assets of a specific type within a date range
     * @param {number} assetTypeId Asset type ID to filter transactions
     * @param {string} [startDate] Start date for filtering transactions (YYYY-MM-DD format). Optional.
     * @param {string} [endDate] End date for filtering transactions (YYYY-MM-DD format). Optional.
     * @param {number} [page] Page number for pagination. Optional.
     * @param {number} [limit] Number of items per page for pagination. Optional.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiPortfolioTransactionsByTypeAssetTypeIdGet: async (
      assetTypeId: number,
      startDate?: string,
      endDate?: string,
      page?: number,
      limit?: number,
      options: RawAxiosRequestConfig = {}
    ): Promise<RequestArgs> => {
      // verify required parameter 'assetTypeId' is not null or undefined
      assertParamExists(
        'apiPortfolioTransactionsByTypeAssetTypeIdGet',
        'assetTypeId',
        assetTypeId
      )
      const localVarPath =
        `/api/portfolio/transactions-by-type/{asset_type_id}`.replace(
          `{${'asset_type_id'}}`,
          encodeURIComponent(String(assetTypeId))
        )
      // use dummy base URL string because the URL constructor only accepts absolute URLs.
      const localVarUrlObj = new URL(localVarPath, DUMMY_BASE_URL)
      let baseOptions
      if (configuration) {
        baseOptions = configuration.baseOptions
      }

      const localVarRequestOptions = {
        method: 'GET',
        ...baseOptions,
        ...options,
      }
      const localVarHeaderParameter = {} as any
      const localVarQueryParameter = {} as any

      if (startDate !== undefined) {
        localVarQueryParameter['start_date'] =
          (startDate as any) instanceof Date
            ? (startDate as any).toISOString().substring(0, 10)
            : startDate
      }

      if (endDate !== undefined) {
        localVarQueryParameter['end_date'] =
          (endDate as any) instanceof Date
            ? (endDate as any).toISOString().substring(0, 10)
            : endDate
      }

      if (page !== undefined) {
        localVarQueryParameter['page'] = page
      }

      if (limit !== undefined) {
        localVarQueryParameter['limit'] = limit
      }

      setSearchParams(localVarUrlObj, localVarQueryParameter)
      let headersFromBaseOptions =
        baseOptions && baseOptions.headers ? baseOptions.headers : {}
      localVarRequestOptions.headers = {
        ...localVarHeaderParameter,
        ...headersFromBaseOptions,
        ...options.headers,
      }

      return {
        url: toPathString(localVarUrlObj),
        options: localVarRequestOptions,
      }
    },
  }
}

/**
 * PortfolioAnalysisApi - functional programming interface
 * @export
 */
export const PortfolioAnalysisApiFp = function (configuration?: Configuration) {
  const localVarAxiosParamCreator =
    PortfolioAnalysisApiAxiosParamCreator(configuration)
  return {
    /**
     * Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and  transactions tables to provide comprehensive transaction data with asset and  type information.
     * @summary Get all transactions for assets of a specific type within a date range
     * @param {number} assetTypeId Asset type ID to filter transactions
     * @param {string} [startDate] Start date for filtering transactions (YYYY-MM-DD format). Optional.
     * @param {string} [endDate] End date for filtering transactions (YYYY-MM-DD format). Optional.
     * @param {number} [page] Page number for pagination. Optional.
     * @param {number} [limit] Number of items per page for pagination. Optional.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    async apiPortfolioTransactionsByTypeAssetTypeIdGet(
      assetTypeId: number,
      startDate?: string,
      endDate?: string,
      page?: number,
      limit?: number,
      options?: RawAxiosRequestConfig
    ): Promise<
      (
        axios?: AxiosInstance,
        basePath?: string
      ) => AxiosPromise<TransactionsByTypeResponse>
    > {
      const localVarAxiosArgs =
        await localVarAxiosParamCreator.apiPortfolioTransactionsByTypeAssetTypeIdGet(
          assetTypeId,
          startDate,
          endDate,
          page,
          limit,
          options
        )
      const localVarOperationServerIndex = configuration?.serverIndex ?? 0
      const localVarOperationServerBasePath =
        operationServerMap[
          'PortfolioAnalysisApi.apiPortfolioTransactionsByTypeAssetTypeIdGet'
        ]?.[localVarOperationServerIndex]?.url
      return (axios, basePath) =>
        createRequestFunction(
          localVarAxiosArgs,
          globalAxios,
          BASE_PATH,
          configuration
        )(axios, localVarOperationServerBasePath || basePath)
    },
  }
}

/**
 * PortfolioAnalysisApi - factory interface
 * @export
 */
export const PortfolioAnalysisApiFactory = function (
  configuration?: Configuration,
  basePath?: string,
  axios?: AxiosInstance
) {
  const localVarFp = PortfolioAnalysisApiFp(configuration)
  return {
    /**
     * Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and  transactions tables to provide comprehensive transaction data with asset and  type information.
     * @summary Get all transactions for assets of a specific type within a date range
     * @param {PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest} requestParameters Request parameters.
     * @param {*} [options] Override http request option.
     * @throws {RequiredError}
     */
    apiPortfolioTransactionsByTypeAssetTypeIdGet(
      requestParameters: PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest,
      options?: RawAxiosRequestConfig
    ): AxiosPromise<TransactionsByTypeResponse> {
      return localVarFp
        .apiPortfolioTransactionsByTypeAssetTypeIdGet(
          requestParameters.assetTypeId,
          requestParameters.startDate,
          requestParameters.endDate,
          requestParameters.page,
          requestParameters.limit,
          options
        )
        .then(request => request(axios, basePath))
    },
  }
}

/**
 * PortfolioAnalysisApi - interface
 * @export
 * @interface PortfolioAnalysisApi
 */
export interface PortfolioAnalysisApiInterface {
  /**
   * Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and  transactions tables to provide comprehensive transaction data with asset and  type information.
   * @summary Get all transactions for assets of a specific type within a date range
   * @param {PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PortfolioAnalysisApiInterface
   */
  apiPortfolioTransactionsByTypeAssetTypeIdGet(
    requestParameters: PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest,
    options?: RawAxiosRequestConfig
  ): AxiosPromise<TransactionsByTypeResponse>
}

/**
 * Request parameters for apiPortfolioTransactionsByTypeAssetTypeIdGet operation in PortfolioAnalysisApi.
 * @export
 * @interface PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest
 */
export interface PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest {
  /**
   * Asset type ID to filter transactions
   * @type {number}
   * @memberof PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGet
   */
  readonly assetTypeId: number

  /**
   * Start date for filtering transactions (YYYY-MM-DD format). Optional.
   * @type {string}
   * @memberof PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGet
   */
  readonly startDate?: string

  /**
   * End date for filtering transactions (YYYY-MM-DD format). Optional.
   * @type {string}
   * @memberof PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGet
   */
  readonly endDate?: string

  /**
   * Page number for pagination. Optional.
   * @type {number}
   * @memberof PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGet
   */
  readonly page?: number

  /**
   * Number of items per page for pagination. Optional.
   * @type {number}
   * @memberof PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGet
   */
  readonly limit?: number
}

/**
 * PortfolioAnalysisApi - object-oriented interface
 * @export
 * @class PortfolioAnalysisApi
 * @extends {BaseAPI}
 */
export class PortfolioAnalysisApi
  extends BaseAPI
  implements PortfolioAnalysisApiInterface
{
  /**
   * Retrieves all transaction records for assets belonging to a specific asset type within an optional date range. The endpoint joins asset_types, assets, and  transactions tables to provide comprehensive transaction data with asset and  type information.
   * @summary Get all transactions for assets of a specific type within a date range
   * @param {PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest} requestParameters Request parameters.
   * @param {*} [options] Override http request option.
   * @throws {RequiredError}
   * @memberof PortfolioAnalysisApi
   */
  public apiPortfolioTransactionsByTypeAssetTypeIdGet(
    requestParameters: PortfolioAnalysisApiApiPortfolioTransactionsByTypeAssetTypeIdGetRequest,
    options?: RawAxiosRequestConfig
  ) {
    return PortfolioAnalysisApiFp(this.configuration)
      .apiPortfolioTransactionsByTypeAssetTypeIdGet(
        requestParameters.assetTypeId,
        requestParameters.startDate,
        requestParameters.endDate,
        requestParameters.page,
        requestParameters.limit,
        options
      )
      .then(request => request(this.axios, this.basePath))
  }
}
