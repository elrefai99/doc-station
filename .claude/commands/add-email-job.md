Add an email notification job to a controller using the BullMQ queue system.

Context: $ARGUMENTS
(Describe what the email is for — e.g. "booking cancellation confirmation to patient")

## How the email queue works

Jobs are added via `addJobToQueue` from `src/Queue/Emails/queue.email.ts` and processed by the worker in `src/Queue/Emails/`.

## Usage in a controller

```ts
import { addJobToQueue } from "../../../Queue/Emails/queue.email";

// Inside the asyncHandler:
const emailBody = {
  subject: "Your subject here",
  email: recipientEmail,
  html: `
    <h1>Title</h1>
    <p>Body content with ${dynamicValues}</p>
  `,
  type: "JobTypeName"   // descriptive string for the job type
};
await addJobToQueue("emails", emailBody);
```

## Rules
- Always `await` the `addJobToQueue` call
- Use `req.user?.email` for the authenticated user's email — it's available after auth middleware
- The `html` field is the email body — keep it simple, semantic HTML
- The `type` field is a label for the job (e.g. `"NewBooking"`, `"AccountVerification"`, `"PasswordReset"`)
- Do not throw errors if the email fails — email is a side effect, not the primary response
- Call `addJobToQueue` after the main database operation succeeds, before `res.json()`
- Adjust the import path depth if the controller is nested deeper (e.g. `../../../../Queue/Emails/queue.email`)
