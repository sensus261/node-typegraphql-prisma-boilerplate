import { Prisma } from '@prisma/client';
import { oneLine } from 'common-tags';

import { StringFilterEntityFieldInput } from '../FilterEntityTypes';
import { FilterOperation } from '../FilterOperation.enum';

export const getStringFieldFilterOperator = (
  input: StringFilterEntityFieldInput,
  fieldName: string
) => {
  const { operation, value } = input;
  let filterFieldBy: string | Prisma.StringFilter | undefined = undefined;

  switch (operation) {
    // Handle each filter operation
    case FilterOperation.EQUALS: {
      filterFieldBy = {
        equals: value,
      };
      break;
    }
    case FilterOperation.CONTAINS: {
      filterFieldBy = {
        contains: value,
      };
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
