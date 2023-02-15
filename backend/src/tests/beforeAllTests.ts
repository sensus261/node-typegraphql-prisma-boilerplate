import { PrismaClient } from '@prisma/client';

export const beforeAllTests = async () => {
  beforeEach(async () => {
    const prisma = new PrismaClient();
    const dbSchemaName = 'public';

    // Special fast path to drop data from a postgres database.
    // This is an optimization which is particularly crucial in a unit testing context.
    // This code path takes milliseconds, vs ~7 seconds for a migrate reset + db push
    const tableNames: Record<'tablename', string>[] = await prisma.$queryRaw`
        SELECT tablename FROM pg_tables WHERE schemaname='${dbSchemaName}'
    `;

    for (const { tablename } of tableNames) {
      await prisma.$queryRaw`
        TRUNCATE TABLE \"${dbSchemaName}\".\"${tablename}\" CASCADE;
      `;
    }

    const relNames: Record<'relname', string>[] = await prisma.$queryRaw`
        SELECT c.relname FROM pg_class AS c JOIN pg_namespace AS n ON c.relnamespace = n.oid WHERE c.relkind='S' AND n.nspname='${dbSchemaName}';
    `;

    for (const { relname } of relNames) {
      await prisma.$queryRaw`
        ALTER SEQUENCE \"${dbSchemaName}\".\"${relname}\" RESTART WITH 1;
      `;
    }
  });
};
