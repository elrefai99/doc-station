/**
 * @swagger
 * /payment/call-back/paymob:
 *   post:
 *     summary: Paymob payment callback webhook
 *     description: Webhook endpoint for Paymob to send transaction callback notifications. This endpoint verifies the HMAC signature and updates the order payment status.
 *     tags: [Payment]
 *     parameters:
 *       - in: query
 *         name: hmac
 *         required: true
 *         schema:
 *           type: string
 *         description: HMAC SHA-512 signature for callback verification
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *
 */
