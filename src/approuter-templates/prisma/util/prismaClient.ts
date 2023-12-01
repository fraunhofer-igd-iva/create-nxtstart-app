// https://www.prisma.io/docs/guides/other/troubleshooting-orm/help-articles/nextjs-prisma-client-dev-practices
import { PrismaClient } from '@/prisma/.prisma/client'

const prismaClientSingleton = () => {
  const client = new PrismaClient({
    log: ['query', 'info', 'warn', 'error'],
  })
  // prisma returns unexpected and unintuitive results for undefined filters, this prevents those results and throws an error if undefined filters are applied
  // https://github.com/prisma/prisma/issues/5149
  client.$use(async (params, next) => {
    if (hasUndefinedValue(params.args?.where)) throw new Error(`Invalid where: ${JSON.stringify(params.args.where)}`)
    return next(params.args)
  })
  return client
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClientSingleton | undefined
}

export const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

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
