Generate or update Swagger/OpenAPI JSDoc documentation for a module in this project.

Module: $ARGUMENTS

## Instructions

Read the module file at `src/modules/<Module>/<module>.module.ts` to get all routes, then read each controller to understand request body, params, query, and responses.

Write JSDoc swagger annotations in `src/modules/<Module>/<module>.swagger.ts`.

## Required format

```ts
/**
 * @swagger
 * tags:
 *   name: <ModuleName>
 *   description: <short description>
 */

/**
 * @swagger
 * /api/v1/<module>/<path>:
 *   <method>:
 *     summary: <one line>
 *     tags: [<ModuleName>]
 *     security:
 *       - bearerAuth: []        # include only if protected route
 *     parameters:               # for path/query params
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:              # for POST/PUT
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [field1]
 *             properties:
 *               field1:
 *                 type: string
 *                 example: value
 *     responses:
 *       200:
 *         description: Success
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 code:
 *                   type: integer
 *                   example: 200
 *                 status:
 *                   type: string
 *                   example: OK
 *                 data:
 *                   type: object
 *       400:
 *         description: Bad request
 *       401:
 *         description: Unauthorized
 *       404:
 *         description: Not found
 */
```

## Rules
- All API paths start with `/api/v1/`
- Use `bearerAuth` security for any route that uses authentication middleware
- Document all response codes that the controller actually returns
- For multipart/form-data routes (file upload via multer), use `content: multipart/form-data`
- Reference `src/modules/authentication/auth.swagger.ts` as the style reference
- Import the swagger file in `src/swagger.ts` if not already imported
