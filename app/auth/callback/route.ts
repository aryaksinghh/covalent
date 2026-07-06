import { NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { prisma } from "@/prisma_setup/main"

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')

  let next = searchParams.get('next') ?? '/dashboard'
  if (!next.startsWith('/')) {
    next = '/dashboard'
  }

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const { data: { user } } = await supabase.auth.getUser();
      if (user) {
        const fetch_existing_user = await prisma.user.findUnique({ where: { id: user.id } })
        if (!fetch_existing_user) {
          const inserting_user = await prisma.user.create({
            data: {
              id: user.id,
              name: user.user_metadata.name,
              email: user.email || "",
              avatar: user.user_metadata.avatar_url,
              role: "none",
              country: "none",
              experience: "none"
            },
          });
          if(!inserting_user) console.log("error inserting the user in db") 
        }
      } else{
        console.log("user not found from session")
      }
      const forwardedHost = request.headers.get('x-forwarded-host')
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}