Add a new controller to an existing module in this Express.js backend.

Arguments: $ARGUMENTS
(Format: "<module> <action> <HTTP_METHOD> <route_path>" — e.g. "Booking cancel PUT /cancel/:id")

## Steps

### 1. Create the controller file
Path: `src/modules/<Module>/Controller/<action>.controller.ts`

Template:
```ts
import { asyncHandler } from "../../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import prisma from "../../../config/prisma";
import ServerError from "../../../utils/api.errors.utils";

export const <action>Controller = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    // Extract params/body
    // Validate with ServerError if needed
    // Prisma query
    res.status(200).json({ code: 200, status: "OK", data: ... });
  }
);
```

### 2. Export from the barrel `<module>.controller.ts`
Add the new export to `src/modules/<Module>/<module>.controller.ts`.

### 3. Register the route in `<module>.module.ts`
Add the route with the correct HTTP method, path, and middleware:
```ts
router.<method>("<path>", <middlewares>, <action>Controller);
```

Choose middleware from `src/middleware/authentication/` based on who can access this route:
- `userMiddleware` — any authenticated user (optional auth, falls through if no token)
- `activeMiddleware` — any active authenticated user
- `patientMiddleware` — patients only
- `doctorMiddleware` — doctors only
- `adminMiddleware` — admins only
- `pendingMiddleware` — users awaiting OTP verification

### 4. Add Swagger JSDoc to `<module>.swagger.ts`
Document the new endpoint following the JSDoc block format in `src/modules/authentication/auth.swagger.ts`.

## Response format
All responses must use: `{ code: number, status: string, data?: any, message?: string }`

## Error handling
```ts
next(new ServerError("Not found", 404));
return;
```
Always `return` after calling `next()` with an error.
