# Socket.IO Documentation

This directory contains the Socket.IO configuration and logic for the EGYStay application. The socket server handles real-time features such as chat, ticketing support, online status tracking, and notifications.

## Namespaces

The application defines several namespaces to segregate logic:

| Namespace | Path | Handler File | Purpose |
|---|---|---|---|
| **Chat** | `/chat` | `chat.socket.ts` | Real-time user-to-user chat. |
| **Ticket** | `/ticket` | `ticket.socket.ts` | Support ticket chat (User <-> Admin). |
| **Online** | `/online` | `online.socket.ts` | Tracks online/offline user status. |
| **Notification**| `/notification` | `notification.socket.ts` | Real-time push notifications. |
| **Payment** | `/payment` | `payemt.socket.ts` | Payment-related real-time updates. |

---

## Authentication

All namespaces use the `socketMiddleware` for authentication.
- **Middleware Path**: `../Middleware/authentication/socket.middleware`
- **Requirement**: A valid token must be provided (typically in `auth` object or headers) to establish a connection.
- **User Data**: Upon connection, `socket.data.user` is populated with the authenticated user's details.

---

## 1. Chat Namespace (`/chat`)

**File**: `src/socket/chat.socket.ts` & `src/socket/hooks/chat/*`

### Client -> Server Events

#### `send_message`
Sends a text message to a specific room (chat ID).

- **Arguments**:
  1. `room` (string): The Chat/Room ID.
  2. `receiverID` (string): The ID of the recipient user.
  3. `text` (string): The message content.

- **Server Action**:
  - Filters bad words.
  - Saves message to `dmModel`.
  - Updates `roomModel` last message.
  - Sends email notification if recipient is offline/configured.
  - Emits `message_sent` to the room.

#### `typing`
Indicates that the user is typing.

- **Arguments**:
  1. `room` (string): The Chat/Room ID.
  2. `receiverID` (string): The recipient ID (used to fetch name).

- **Server Action**:
  - Emits `typing` event to the room with the sender's name.

#### `upload-chat`
Uploads an image file sharing it in the chat.

- **Arguments**:
  1. `file` (Object): `{ buffer: ArrayBuffer, name: string }`
  2. `room` (string): Chat/Room ID.
  3. `receiverID` (string): Recipient ID.
  4. `callback` (Function): Optional acknowledgment.

- **Server Action**:
  - Uploads file to AWS S3 (`v-chat/` folder).
  - Saves message with image URL to DB.
  - Emits `message_sent` to the room.

### Server -> Client Events

#### `message_sent`
Broadcasted to the room when a new message (text or image) is created.

- **Payload Example**:
  ```json
  {
    "_id": "...",
    "chatID": "...",
    "message": "Hello World",
    "image": "https://...",
    "createdAt": "...",
    "senderID": {
      "_id": "user_id",
      "fullname": "John Doe"
    }
  }
  ```

#### `typing`
Broadcasted to the room when the other user is typing.

- **Payload**: `(room_id, sender_full_name)`

---

## 2. Ticket Namespace (`/ticket`)

**File**: `src/socket/ticket.socket.ts` & `src/socket/hooks/tickets/*`

### Client -> Server Events

#### `send_message`
Sends a message within a support ticket.

- **Arguments**:
  1. `room` (string): The Ticket/Room ID.
  2. `receiverID` (string): The ID of the recipient.
  3. `text` (string): The message content.

- **Server Action**:
  - Handled similar to Chat but checks for Admin role.
  - If sender is Admin, the sender name in the broadcast is "Site Admin".
  - Triggers email notifications.

### Server -> Client Events

#### `message_sent`
Broadcasted to the room.

- **Payload Example**:
  ```json
  {
    "_id": "...",
    "message": "We are looking into it.",
    "sender": {
      "_id": "...",
      "fullname": "Site Admin" // or User Name
      "role": "admin" // or user role
    }
  }
  ```

---

## 3. Online Namespace (`/online`)

**File**: `src/socket/online.socket.ts`

- **Purpose**: Automatically updates the `User` model's `online` status.
- **Connection**: Sets `online: true` in DB.
- **Disconnection**: Sets `online: false` and updates `lastOnline` timestamp (with a 500ms delay to handle quick reconnects).

---

## 4. Notification Namespace (`/notification`)

**File**: `src/socket/notification.socket.ts`

- **Purpose**: Targeted realtime notifications.
- **Mechanism**: Maintains a map of `UserID -> SocketID`.
- **Server Events**:
  - `notification:now`: Sends a title/message and link to the user immediately.
  - `notification:count`: Updates notification count badge (implied by usage in other files).

---

## Directory Structure
```
src/socket/
├── hooks/              # Event handlers separated by logic
│   ├── chat/           # Chat-specific hooks (ioChat, ioTyping, ioUpload)
│   └── tickets/        # Ticket-specific hooks (ioChat)
├── Middleware/         # (Imported) Socket Authentication Middleware
├── chat.socket.ts      # Chat namespace setup
├── notification.socket.ts # Notification namespace setup
├── online.socket.ts    # Online presence setup
├── payemt.socket.ts    # Payment namespace (Placeholder/Simple)
├── ticket.socket.ts    # Ticket namespace setup
└── README.md           # This documentation
```
