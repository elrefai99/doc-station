/**
 * @swagger
 * /payment:
 *   post:
 *     summary: Payment endpoint
 *     tags: [Payment]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Success
 *       400:
 *         description: Bad Request
 */