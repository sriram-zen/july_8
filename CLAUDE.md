# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build production application
- `npm run start` - Start production server
- `npm run lint` - Run Next.js linting

### Testing
- No test framework configured yet

## Architecture

This is a Next.js 15 application using the App Router with TypeScript, featuring:

### Authentication Stack
- **Supabase Auth**: Complete authentication system with server-side rendering
- **Server Actions**: Authentication actions in `src/actions/auth.ts` (signUp, signIn, forgotPassword, resetPassword, signOut)
- **Protected Routes**: Routes under `/protected` require authentication, enforced by middleware logic in `src/utils/supabase/middleware.ts`
- **Auth Routing**: Authenticated users are redirected from `/` to `/protected`

### UI Framework
- **shadcn/ui**: Component library with Radix UI primitives and Tailwind CSS
- **Theme System**: Dark/light mode using next-themes
- **Component Structure**: UI components in `src/components/ui/`, custom components in `src/components/`

### Project Structure
- **App Router**: All pages in `src/app/` directory
- **Server Components**: Default rendering pattern with Supabase SSR integration
- **Auth Pages**: Grouped in `src/app/(auth-pages)/` route group
- **Path Aliases**: `@/` mapped to `src/` directory

### Key Patterns
- **Supabase Integration**: 
  - Server client: `src/utils/supabase/server.ts` (for Server Components)
  - Client components use browser client from `src/utils/supabase/client.ts`
  - Middleware handles session refresh and route protection
- **Error Handling**: `encodedRedirect` utility for form error/success messages
- **Environment Check**: `hasEnvVars` utility warns when Supabase environment variables are missing

### Development Notes
- Environment variables required: `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- The app redirects authenticated users from root to `/protected`
- Authentication state is managed server-side with cookies via Supabase SSR
- Form submissions use Server Actions pattern