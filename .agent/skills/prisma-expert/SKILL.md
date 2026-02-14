# Prisma Expert

## Description
Prisma ORM mastery including migrations, query optimization, and advanced patterns.

## Coverage
- Database schema design
- Migration management
- Query optimization
- Type safety
- Performance tuning

## Core Features

### Schema Design
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String?
  posts     Post[]
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}

model Post {
  id        String   @id @default(cuid())
  title     String
  content   String?
  published Boolean  @default(false)
  author    User     @relation(fields: [authorId], references: [id])
  authorId  String
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Query Patterns
- **Eager Loading**: `include` and `select`
- **Filtering**: `where` clauses with complex conditions
- **Pagination**: `skip` and `take` with cursor-based pagination
- **Transactions**: `prisma.$transaction()`
- **Batch Operations**: `createMany`, `updateMany`

### Performance Optimization
1. **Index Strategy**: Proper database indexing
2. **Query N+1 Prevention**: Eager loading relationships
3. **Connection Pooling**: Database connection management
4. **Caching**: Application-level caching strategies
5. **Raw SQL**: Complex queries with `prisma.$queryRaw`

### Migration Management
```bash
# Create migration
npx prisma migrate dev --name init

# Apply migration
npx prisma migrate deploy

# Reset database
npx prisma migrate reset

# Generate client
npx prisma generate
```

## Advanced Patterns
- **Multi-tenancy**: Schema-based isolation
- **Soft Deletes**: `deletedAt` timestamp patterns
- **Audit Trails**: Automatic change tracking
- **Data Seeding**: Development data population

## Integration
- Next.js API routes
- Server components
- Testing with test databases
- CI/CD pipeline integration

## Tools
- Prisma Studio for database management
- Prisma CLI for migrations
- Database introspection
- Query logging

## References
- Prisma Documentation
- Database Design Patterns
- Performance Tuning Guide
