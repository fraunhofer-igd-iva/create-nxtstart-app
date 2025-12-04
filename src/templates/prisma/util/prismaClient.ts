import 'dotenv/config'
// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '../prisma/generated/client'
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'

const adapter = new PrismaBetterSqlite3({
  url: process.env.DATABASE_URL as string,
})

const prismaClientSingleton = () => {
  return new PrismaClient({
    adapter,
    log: ['query', 'info', 'warn', 'error'],
   }).$extends({
    query: {
      $allOperations(params) {
        const { args, query } = params
        // prisma returns unexpected and unintuitive results for undefined filters, this prevents those results and throws an error if undefined filters are applied
        // https://github.com/prisma/prisma/issues/5149
        if (hasUndefinedValue(args.where)) {
          throw new Error(`Invalid where: ${JSON.stringify(params.args.where)}`)
        } else {
          return query(args)
        }
      },
    },
  })
}

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>
} & typeof global

export const prisma = globalThis.prismaGlobal ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma

function hasUndefinedValue<T>(obj: T): boolean {
  if (typeof obj !== 'object' || obj === null) return false
  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue
    const value = obj[key]
    if (value === undefined) return true
    if (typeof value === 'object' && !Array.isArray(value)) if (hasUndefinedValue(value)) return true
  }
  return false
}
