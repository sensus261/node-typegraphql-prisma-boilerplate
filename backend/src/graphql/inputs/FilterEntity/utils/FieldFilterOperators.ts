import { oneLine } from 'common-tags';
import { FindOperator, Like } from 'typeorm';

import {
  StringFilterEntityFieldInput,
  DateFilterEntityFieldInput,
  NumberFilterEntityFieldInput,
  StringListFilterEntityFieldInput,
} from '../FilterEntityTypes';
import { FilterOperation } from '../FilterOperation.enum';

export const getStringFieldFilterOperator = (
  input: StringFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string | FindOperator<string> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    case FilterOperation.CONTAINS: {
      filterFieldBy = Like(`%${value}%`);
      break;
    }
    /* TODO: Add support for filters:
     * - startsWith
     * - endsWith
     * - isAnyOf
     */
    default: {
      throw new Error(
        oneLine`
          [handleStringFieldFilter] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getDateFieldFilterOperator = (
  input: DateFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: Date | FindOperator<Date> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = new Date(value);
      break;
    }
    /* TODO: Add support for filters:
     * - GT
     * - GTE
     * - LT
     * - LTE
     * - NOT
     */
    default: {
      throw new Error(
        oneLine`
          [getDateFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getNumberFieldFilterOperator = (
  input: NumberFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: number | FindOperator<number> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    /* TODO: Add support for filters:
     * - GT
     * - GTE
     * - LT
     * - LTE
     * - NOT
     */
    default: {
      throw new Error(
        oneLine`
          [getNumberFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getOneToOneFieldFilterOperator = (
  input: StringListFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string[] | FindOperator<string[]> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    /* TODO: Add support for filters:
     */
    default: {
      throw new Error(
        oneLine`
          [getOneToOneFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getOneToManyFieldFilterOperator = (
  input: StringListFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string[] | FindOperator<string[]> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    /* TODO: Add support for filters:
     */
    default: {
      throw new Error(
        oneLine`
          [getOneToManyFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getManyToOneFieldFilterOperator = (
  input: StringListFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string[] | FindOperator<string[]> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    /* TODO: Add support for filters:
     */
    default: {
      throw new Error(
        oneLine`
          [getManyToOneFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};

export const getManyToManyFieldFilterOperator = (
  input: StringListFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string[] | FindOperator<string[]> | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = value;
      break;
    }
    /* TODO: Add support for filters:
     */
    default: {
      throw new Error(
        oneLine`
          [getManyToManyFieldFilterOperator] => The filter operation
          '${operation}' was not handled for '${fieldName}' field
          with value '${JSON.stringify(value)}'
        `
      );
    }
  }

  return filterFieldBy;
};
