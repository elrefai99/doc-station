Create a new feature module for this Express.js backend following the project's established patterns.

Module name: $ARGUMENTS

## What to create

Scaffold the following files under `src/modules/<ModuleName>/`:

### 1. `<module>.module.ts` — Express Router
```ts
import { Router } from "express";
import { ... } from "./<module>.controller";

const router: Router = Router();

// Define routes here

export default router;
```

### 2. `<module>.controller.ts` — Barrel re-export
```ts
export { ... } from "./Controller/...";
```

### 3. `Controller/<action>.controller.ts` — One file per route handler
Use `asyncHandler` wrapper from `../../../utils/asyncHandler.utils`, `prisma` from `../../../config/prisma`, and `ServerError` from `../../../utils/api.errors.utils`.

Pattern:
```ts
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";

export const myController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // logic
    res.status(200).json({ code: 200, status: "OK", data: ... });
  }
);
```

### 4. `DTO/index.dto.ts` — Request validation classes
Use `class-validator` decorators (`@IsString()`, `@IsNumber()`, `@IsOptional()`, etc.).

### 5. `<module>.swagger.ts` — OpenAPI JSDoc annotations
Follow the pattern in `src/modules/authentication/auth.swagger.ts`. All routes prefixed `/api/v1/<module>`.

## After scaffolding
Register the new module in `src/app.module.ts`:
```ts
import <module>Module from "./modules/<ModuleName>/<module>.module";
app.use("/api/v1/<module>", <module>Module);
```

## Rules
- Use the role-based middleware from `src/middleware/authentication/` (`userMiddleware`, `patientMiddleware`, `doctorMiddleware`, `adminMiddleware`, `activeMiddleware`, `pendingMiddleware`) as appropriate for each route.
- All responses follow `{ code: number, status: string, data?: any, message?: string }`.
- Use `next(new ServerError("message", statusCode))` for errors, then `return`.
- Import path depth depends on nesting: `Controller/` files use `../../../`, `Controller/SubFolder/` use `../../../../`.
- TypeScript strict mode — no implicit any.
