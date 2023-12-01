'use server'

import { redirect } from 'next/navigation'
import { revalidatePath } from 'next/cache'

/**
 * https://nextjs.org/docs/app/building-your-application/data-fetching/forms-and-mutations
 */

// this is similiar to an API endpoint, it only runs on the server
export default async function submit(date: number) {
  // could perform something like inserting data into database, even with authorization (see commented line below, can be used if next auth is used in this project)
  // const session = await getServerSession(authOptions)
  const id = date
  revalidatePath('/[locale]/serverActions', 'page') // revalidate cache if necessary
  redirect(`serverActions/${id}`) // Navigate to new route
}
