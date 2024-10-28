export type Data = {
  label: string
  value: number
  totalDataPoints: number
}

export type PageProps = Promise<{
  locale: string
}>
