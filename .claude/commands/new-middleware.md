Create a new middleware for this Express.js backend.

Arguments: $ARGUMENTS
(Format: "<type> <name>" — e.g. "auth adminOrDoctor" or "validation bookingExists")

## Middleware types and where they live

- **Authentication/role middleware** → `src/middleware/authentication/<name>.middleware.ts`
- **Address/resource middleware** → `src/middleware/address/<name>.middleware.ts`
- **Other validation middleware** → `src/middleware/<name>.middleware.ts`

## Template for auth/role middleware

```ts
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../../config/prisma";
import { UserStatus, UserRole } from "../../generated/prisma";

export const <name>Middleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    const tokenFromAuthHeader = authHeader?.startsWith("Bearer ") ? authHeader.split(" ")[1] : null;
    const token = tokenFromAuthHeader || req.headers.token as string || req.query.token as string || req.cookies.access_token;

    if (!token) {
      res.status(401).json({ code: 401, status: "Unauthorized", message: "Authentication failed" });
      return;
    }

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err: any, decoded: any) => {
      if (err) {
        res.status(403).json({ code: 403, status: "Forbidden", message: "This token has expired. Please request a new one" });
        return;
      }
      const user = await prisma.user.findFirst({
        where: { id: Number(decoded.id), status: UserStatus.ACTIVE, role: UserRole.<ROLE> }
      });
      if (!user) {
        res.status(403).json({ code: 403, status: "Forbidden", message: "The server is refusing to give the requested resource" });
        return;
      }
      req.user = user;
      next();
    });
  }
);
```

## Template for resource validation middleware

```ts
import { asyncHandler } from "../../utils/asyncHandler.utils";
import { NextFunction, Request, Response } from "express";
import prisma from "../../config/prisma";
import ServerError from "../../utils/api.errors.utils";

export const <name>Middleware = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const id = Number(req.params.id);
    const resource = await prisma.<model>.findFirst({ where: { id } });
    if (!resource) {
      next(new ServerError("<Resource> not found", 404));
      return;
    }
    // attach to req if needed: (req as any).<resource> = resource;
    next();
  }
);
```

## Rules
- Always use `asyncHandler` wrapper
- Always `return` after sending a response or calling `next()` with an error
- Export as a named export: `export const <name>Middleware`
- Existing middleware to reference: `src/middleware/authentication/user.middleware.ts`, `src/middleware/authentication/doctor.middleware.ts`
- After creating, import and use in the relevant `*.module.ts` router file
