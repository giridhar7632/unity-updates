# Unity Updates

Bringing together Haitians during their darkest moments.

# Development Guide

1. Copy `.env.example` and rename the clone to `.env`.
2. For the supabase variables, ask me (Sabih) for them since they are in my supabase account. I can send over discord.

Things to keep note of:
- Any database changes can update the database by running `drizzle-kit db:update`. This will create the migration file as well as push the changes to the database.
- `yarn run generate` will create migrations.
- `drizzle-kit studio --port 3001` will run drizzle kit studio. Not necessary as supabase dashboard exists.