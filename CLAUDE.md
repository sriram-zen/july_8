# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.3.1 project with TypeScript, styled using Tailwind CSS v4 and shadcn/ui components. The project follows the App Router pattern and includes Supabase integration for backend functionality.

## Development Commands

- `npm run dev` - Start development server on http://localhost:3000
- `npm run build` - Build the production application
- `npm run start` - Start production server
- `npm run lint` - Run ESLint for code linting

## Architecture

### Project Structure
- **App Router**: Uses Next.js 15 App Router in `src/app/`
- **Components**: UI components in `src/components/ui/` (shadcn/ui), custom components in `src/components/`
- **Utilities**: 
  - `src/lib/utils.ts` - Contains `cn()` utility for class merging (clsx + tailwind-merge)
  - `src/utils/utils.ts` - Contains `encodedRedirect()` for URL redirects with encoded messages
- **Hooks**: Custom React hooks in `src/hooks/`

### Key Technologies
- **UI Framework**: shadcn/ui with Radix UI primitives
- **Styling**: Tailwind CSS v4 with CSS variables, "new-york" style theme
- **State Management**: React Hook Form with Zod validation
- **Database**: Supabase with SSR support
- **Theme**: next-themes for dark/light mode switching
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization

### Path Aliases
- `@/*` maps to `src/*`
- `@/components` for components
- `@/lib/utils` for utilities
- `@/hooks` for custom hooks

### Component Conventions
- Components use Tailwind CSS classes
- shadcn/ui components follow the "new-york" style variant
- Theme switching is handled via next-themes with system preference support
- Forms use react-hook-form with Zod schemas for validation

### Database Integration
The project includes Supabase client setup with SSR support for server-side data fetching.