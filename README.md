# Mini Roster System - Frontend

A modern, responsive frontend for the shift scheduling system built with Next.js, Apollo Client, and TailwindCSS.

## Features

- ✅ Dashboard with overview statistics
- ✅ Shift listing with filtering
- ✅ Create new shifts
- ✅ View shift details
- ✅ Assign users to shifts
- ✅ Remove assignments
- ✅ User management
- ✅ Responsive design
- ✅ Real-time updates with GraphQL

## Tech Stack

- **Framework**: Next.js 14 (App Router)
- **Styling**: TailwindCSS
- **GraphQL Client**: Apollo Client
- **Icons**: Lucide React
- **Date Handling**: date-fns

## Prerequisites

- Node.js (v18 or higher)
- Backend API running (see backend README)

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd roster-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Configure environment variables:
```bash
cp .env.local.example .env.local
# Edit .env.local with your backend GraphQL URL
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Environment Variables

### Development (.env.local)

NEXT_PUBLIC_GRAPHQL_URL=http://localhost:4000/graphql

### Production (.env.production)
NEXT_PUBLIC_GRAPHQL_URL=https://

## Project Structure
roster-frontend/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout with navigation
│   ├── page.tsx           # Dashboard
│   ├── shifts/            # Shift-related pages
│   └── users/             # User-related pages
├── components/            # Reusable components
│   ├── providers/         # Context providers
│   ├── ui/               # UI components
│   ├── shifts/           # Shift components
│   └── users/            # User components
├── lib/                  # Utility functions
│   ├── apollo-client.ts  # Apollo client setup
│   ├── queries.ts        # GraphQL queries
│   ├── mutations.ts      # GraphQL mutations
│   └── utils.ts          # Helper functions
└── types/                # TypeScript types

## Available Pages

### Dashboard (/)
- Overview statistics
- Open shifts list
- Upcoming shifts (next 7 days)

### Shifts (/shifts)
- List all shifts
- Filter by date range
- Filter by open shifts only
- Create new shift button

### Shift Detail (/shifts/[id])
- View shift details
- See assigned users
- Assign users to shift
- Remove assignments
- Delete shift

### Create Shift (/shifts/create)
- Form to create new shifts
- Date and time selection
- Set maximum assignments

### Users (/users)
- View all active users
- See user roles

## Key Features

### Filtering Shifts
- Filter by start date
- Filter by end date
- Show only open shifts

### Managing Assignments
- Assign users to shifts
- Prevent double assignments
- Check shift capacity
- Remove assignments

### Validation
- Client-side form validation
- Error messages from API
- Loading states

## Deployment to Vercel

1. Push your code to GitHub

2. Go to [Vercel](https://vercel.com) and import your repository

3. Configure environment variables:
   - `NEXT_PUBLIC_GRAPHQL_URL`: Your backend GraphQL endpoint

4. Deploy!

## Development Tips

### Hot Reload
Changes to files will automatically reload the page.

### GraphQL Queries
All queries and mutations are in `lib/queries.ts` and `lib/mutations.ts`.

### Styling
Use TailwindCSS utility classes for styling. Custom components are in `components/ui/`.

### Type Safety
TypeScript types are defined in `types/index.ts`.

## Troubleshooting

### GraphQL Connection Issues
- Ensure backend is running
- Check `NEXT_PUBLIC_GRAPHQL_URL` in `.env.local`
- Verify CORS is enabled on backend

### Build Errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

## License

MIT