# AI Studio — Project Design Document (PDD)

**Version:** 1.0  
**Date:** 2026-08-25  
**Status:** Draft for Review  
**Author:** Engineering Team  

---

## 1. Introduction

This document provides the technical design for AI Studio, a multi-agent AI SaaS platform. It serves as the authoritative reference for developers, architects, and DevOps engineers during implementation.

**Prerequisites:** Project Requirements Document (PRD) v1.0

---

## 2. System Architecture

### 2.1 High-Level Architecture

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                              CLIENT LAYER                                    │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐                       │
│  │   Web App    │  │   CDN /      │  │   Static     │                       │
│  │  (Next.js)   │  │   CloudFront │  │   Assets     │                       │
│  └──────┬───────┘  └──────────────┘  └──────────────┘                       │
└─────────┼────────────────────────────────────────────────────────────────────┘
          │ HTTPS / WSS
┌─────────▼────────────────────────────────────────────────────────────────────┐
│                            API GATEWAY LAYER                                 │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Kong / AWS API Gateway — Rate Limiting, Auth, SSL Termination     │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────┬────────────────────────────────────────────────────────────────────┘
          │
┌─────────▼────────────────────────────────────────────────────────────────────┐
│                         APPLICATION LAYER                                    │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │  Auth       │  │  Chat       │  │  Agent      │  │  Notification│        │
│  │  Service    │  │  Service    │  │  Service    │  │  Service     │        │
│  │  (Node.js)  │  │  (Node.js)  │  │  (Python)   │  │  (Node.js)   │        │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘        │
└─────────┼────────────────┼────────────────┼────────────────┼────────────────┘
          │                │                │                │
┌─────────▼────────────────▼────────────────▼────────────────▼────────────────┐
│                          MESSAGE QUEUE                                       │
│  ┌─────────────────────────────────────────────────────────────────────┐    │
│  │  Redis Streams / RabbitMQ — Async AI processing, events            │    │
│  └─────────────────────────────────────────────────────────────────────┘    │
└─────────┬────────────────────────────────────────────────────────────────────┘
          │
┌─────────▼────────────────────────────────────────────────────────────────────┐
│                          DATA LAYER                                          │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ PostgreSQL  │  │    Redis    │  │    S3       │  │ Elasticsearch│        │
│  │ (Primary)   │  │  (Cache /   │  │  (Files /   │  │   (Search)   │        │
│  │             │  │   Sessions) │  │   Backups)  │  │              │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└──────────────────────────────────────────────────────────────────────────────┘
          │
┌─────────▼────────────────────────────────────────────────────────────────────┐
│                      EXTERNAL INTEGRATIONS                                   │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐        │
│  │ OpenAI API  │  │ Anthropic   │  │ CoinGecko   │  │   SendGrid  │        │
│  │             │  │   Claude    │  │   API       │  │  (Email)    │        │
│  └─────────────┘  └─────────────┘  └─────────────┘  └─────────────┘        │
└──────────────────────────────────────────────────────────────────────────────┘
```

### 2.2 Service Descriptions

| Service | Technology | Responsibility | Scaling |
|---------|-----------|----------------|---------|
| Web App | Next.js 14 (App Router) | SSR/CSR UI, client-side state | Static + Edge |
| Auth Service | Node.js + Express | JWT issuance, OAuth, password reset | 3-10 pods |
| Chat Service | Node.js + Express | Message CRUD, conversation management | 5-20 pods |
| Agent Service | Python + FastAPI | AI orchestration, tool calling, streaming | 5-20 pods |
| Notification Service | Node.js + Express | Push, email, in-app notifications | 2-5 pods |
| Gateway | Kong / AWS API Gateway | Routing, rate limiting, auth middleware | Managed |

### 2.3 Communication Patterns

| Pattern | Use Case | Technology |
|---------|----------|------------|
| Synchronous REST | CRUD operations, auth | HTTP/JSON |
| Server-Sent Events | AI response streaming | SSE over HTTP |
| WebSocket | Real-time status, notifications | Socket.io |
| Async Message Queue | Background AI processing, events | Redis Streams |

---

## 3. Database Design

### 3.1 Entity Relationship Diagram

```
┌─────────────┐       ┌─────────────────┐       ┌─────────────┐
│    users    │       │  conversations  │       │   agents    │
├─────────────┤       ├─────────────────┤       ├─────────────┤
│ id (PK)     │◄──────┤ id (PK)         │──────►│ id (PK)     │
│ email (UQ)  │  1:N  │ user_id (FK)    │  N:1  │ name        │
│ password    │       │ agent_id (FK)   │       │ slug (UQ)   │
│ display_name│       │ title           │       │ description │
│ avatar_url  │       │ created_at      │       │ icon        │
│ role        │       │ updated_at      │       │ status      │
│ created_at  │       │ is_deleted      │       │ config      │
└─────────────┘       └────────┬────────┘       └─────────────┘
                               │
                               │ 1:N
                               ▼
                        ┌─────────────┐
                        │  messages   │
                        ├─────────────┤
                        │ id (PK)     │
                        │ conv_id(FK) │
                        │ role        │
                        │ content     │
                        │ content_type│
                        │ metadata    │
                        │ created_at  │
                        └──────┬──────┘
                               │ 1:N
                               ▼
                        ┌─────────────┐
                        │ attachments │
                        ├─────────────┤
                        │ id (PK)     │
                        │ msg_id (FK) │
                        │ file_name   │
                        │ file_url    │
                        │ file_size   │
                        │ mime_type   │
                        └─────────────┘

┌─────────────┐       ┌─────────────────┐
│notifications│       │   user_sessions │
├─────────────┤       ├─────────────────┤
│ id (PK)     │       │ id (PK)         │
│ user_id(FK) │◄──────┤ user_id (FK)    │
│ type        │  N:1  │ token_hash      │
│ title       │       │ expires_at      │
│ body        │       │ created_at      │
│ is_read     │       │ ip_address      │
│ action_url  │       │ user_agent      │
│ created_at  │       └─────────────────┘
└─────────────┘
```

### 3.2 Schema Definitions

#### Table: `users`
```sql
CREATE TABLE users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           VARCHAR(255) NOT NULL UNIQUE,
    password_hash   VARCHAR(255) NOT NULL,
    display_name    VARCHAR(100),
    avatar_url      VARCHAR(500),
    role            VARCHAR(20) DEFAULT 'user' CHECK (role IN ('user', 'admin')),
    email_verified  BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW(),
    deleted_at      TIMESTAMPTZ
);

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_role ON users(role);
```

#### Table: `agents`
```sql
CREATE TABLE agents (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name            VARCHAR(100) NOT NULL,
    slug            VARCHAR(50) NOT NULL UNIQUE,
    description     TEXT,
    icon            VARCHAR(50),
    status          VARCHAR(20) DEFAULT 'online' CHECK (status IN ('online', 'offline', 'busy')),
    capabilities    JSONB DEFAULT '[]',
    config          JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

-- Seed data
INSERT INTO agents (name, slug, description, icon, capabilities) VALUES
('ChatBot', 'chatbot', 'General AI assistant for everyday questions and tasks.', 'Message', '["text", "markdown", "code"]'),
('Crypto Agent', 'crypto', 'Analyze cryptocurrency markets using technical indicators and market data.', 'Data', '["text", "chart", "metrics", "realtime"]'),
('CV Maker', 'cv', 'Professional resume creation and optimization.', 'Document', '["text", "form", "pdf", "upload"]');
```

#### Table: `conversations`
```sql
CREATE TABLE conversations (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    agent_id        UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
    title           VARCHAR(200) DEFAULT 'New conversation',
    is_deleted      BOOLEAN DEFAULT FALSE,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_conversations_user ON conversations(user_id, updated_at DESC);
CREATE INDEX idx_conversations_agent ON conversations(agent_id);
CREATE INDEX idx_conversations_user_agent ON conversations(user_id, agent_id, updated_at DESC);
```

#### Table: `messages`
```sql
CREATE TABLE messages (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    conversation_id UUID NOT NULL REFERENCES conversations(id) ON DELETE CASCADE,
    role            VARCHAR(20) NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
    content         TEXT NOT NULL,
    content_type    VARCHAR(20) DEFAULT 'text' CHECK (content_type IN ('text', 'markdown', 'chart', 'form', 'image', 'file')),
    metadata        JSONB DEFAULT '{}',
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_messages_conversation ON messages(conversation_id, created_at ASC);
CREATE INDEX idx_messages_created ON messages(created_at DESC);
```

#### Table: `attachments`
```sql
CREATE TABLE attachments (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    message_id      UUID NOT NULL REFERENCES messages(id) ON DELETE CASCADE,
    file_name       VARCHAR(255) NOT NULL,
    file_url        VARCHAR(500) NOT NULL,
    file_size       INTEGER NOT NULL,
    mime_type       VARCHAR(100) NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_attachments_message ON attachments(message_id);
```

#### Table: `notifications`
```sql
CREATE TABLE notifications (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id         UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    type            VARCHAR(50) NOT NULL,
    title           VARCHAR(200) NOT NULL,
    body            TEXT,
    is_read         BOOLEAN DEFAULT FALSE,
    action_url      VARCHAR(500),
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_notifications_user ON notifications(user_id, created_at DESC);
CREATE INDEX idx_notifications_unread ON notifications(user_id, is_read) WHERE is_read = FALSE;
```

### 3.3 Data Flow — Conversation Lifecycle

```
User sends message
        │
        ▼
┌───────────────┐
│  Chat Service │───► Validate auth, rate limit
│   (REST API)  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  PostgreSQL   │───► Save user message
│   (messages)  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Redis Stream │───► Publish "ai.process" event
│   (Queue)     │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│ Agent Service │───► Fetch conversation context
│   (Consumer)  │     Call LLM API with system prompt
└───────┬───────┘
        │
        ▼
┌───────────────┐
│   LLM API     │───► Streaming response tokens
│ (OpenAI/etc)  │
└───────┬───────┘
        │
        ▼
┌───────────────┐
│  Agent Service│───► Parse structured content (charts, tables)
│   (Processor) │     Enrich with external data if needed
└───────┬───────┘
        │
        ├───► SSE Stream ──► Client receives tokens in real-time
        │
        ▼
┌───────────────┐
│  PostgreSQL   │───► Save complete AI message
│   (messages)  │
└───────────────┘
```

---

## 4. API Design

### 4.1 Authentication

#### POST /v1/auth/register
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!",
  "display_name": "John Doe"
}

Response: 201 Created
{
  "user": {
    "id": "uuid",
    "email": "user@example.com",
    "display_name": "John Doe"
  },
  "token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token"
}
```

#### POST /v1/auth/login
```json
Request:
{
  "email": "user@example.com",
  "password": "SecurePass123!"
}

Response: 200 OK
{
  "token": "jwt_access_token",
  "refresh_token": "jwt_refresh_token",
  "expires_in": 3600
}
```

#### POST /v1/auth/refresh
```json
Request:
{
  "refresh_token": "jwt_refresh_token"
}

Response: 200 OK
{
  "token": "new_jwt_access_token",
  "expires_in": 3600
}
```

### 4.2 Conversations

#### GET /v1/conversations
```json
Query Params:
  ?agent_slug=crypto&limit=20&offset=0&search=bitcoin

Response: 200 OK
{
  "conversations": [
    {
      "id": "uuid",
      "title": "Analyze Bitcoin market",
      "agent": {
        "id": "uuid",
        "name": "Crypto Agent",
        "slug": "crypto",
        "icon": "Data"
      },
      "message_count": 12,
      "last_message_at": "2026-08-25T10:43:00Z",
      "created_at": "2026-08-25T10:30:00Z"
    }
  ],
  "total": 45,
  "limit": 20,
  "offset": 0
}
```

#### POST /v1/conversations
```json
Request:
{
  "agent_slug": "crypto"
}

Response: 201 Created
{
  "id": "uuid",
  "title": "New conversation",
  "agent_id": "uuid",
  "created_at": "2026-08-25T10:30:00Z"
}
```

#### GET /v1/conversations/:id/messages
```json
Query Params:
  ?limit=50&before_id=uuid

Response: 200 OK
{
  "messages": [
    {
      "id": "uuid",
      "role": "user",
      "content": "Can you analyze the current Bitcoin market?",
      "content_type": "text",
      "metadata": {},
      "created_at": "2026-08-25T10:42:00Z"
    },
    {
      "id": "uuid",
      "role": "assistant",
      "content": "## Bitcoin market overview\n\nBitcoin is currently showing positive momentum...",
      "content_type": "markdown",
      "metadata": {
        "chart_data": { ... },
        "metrics": { ... }
      },
      "created_at": "2026-08-25T10:43:00Z"
    }
  ],
  "has_more": false
}
```

### 4.3 Chat Streaming

#### POST /v1/conversations/:id/messages/stream
```json
Request:
{
  "content": "What about Ethereum?",
  "attachments": []
}

Response: text/event-stream

event: message_start
data: {"message_id": "uuid", "role": "assistant"}

event: content_block_delta
data: {"type": "text", "text": "Ethereum"}

event: content_block_delta
data: {"type": "text", "text": " is currently"}

event: content_block_delta
data: {"type": "chart", "chart_type": "line", "data": { ... }}

event: message_stop
data: {"message_id": "uuid", "usage": {"input_tokens": 45, "output_tokens": 320}}
```

### 4.4 Agents

#### GET /v1/agents
```json
Response: 200 OK
{
  "agents": [
    {
      "id": "uuid",
      "name": "ChatBot",
      "slug": "chatbot",
      "description": "General AI assistant",
      "icon": "Message",
      "status": "online",
      "capabilities": ["text", "markdown", "code"]
    },
    {
      "id": "uuid",
      "name": "Crypto Agent",
      "slug": "crypto",
      "description": "Market and cryptocurrency analysis",
      "icon": "Data",
      "status": "online",
      "capabilities": ["text", "chart", "metrics", "realtime"]
    },
    {
      "id": "uuid",
      "name": "CV Maker",
      "slug": "cv",
      "description": "Professional resume creation",
      "icon": "Document",
      "status": "online",
      "capabilities": ["text", "form", "pdf", "upload"]
    }
  ]
}
```

### 4.5 Notifications

#### GET /v1/notifications
```json
Query Params:
  ?limit=20&unread_only=true

Response: 200 OK
{
  "notifications": [
    {
      "id": "uuid",
      "type": "agent_completion",
      "title": "CV Ready",
      "body": "Your resume has been generated and is ready for download.",
      "is_read": false,
      "action_url": "/cv-maker/download/uuid",
      "created_at": "2026-08-25T10:45:00Z"
    }
  ],
  "unread_count": 3
}
```

#### PATCH /v1/notifications/:id/read
```json
Response: 204 No Content
```

### 4.6 Error Handling

All errors follow RFC 7807 (Problem Details):

```json
{
  "type": "https://api.aistudio.com/errors/rate-limit-exceeded",
  "title": "Rate limit exceeded",
  "status": 429,
  "detail": "You have exceeded the limit of 20 messages per minute.",
  "instance": "/v1/conversations/uuid/messages",
  "retry_after": 45
}
```

---

## 5. UI/UX Component Architecture

### 5.1 Design System Tokens

```typescript
// colors.ts
export const colors = {
  background: {
    main: '#F8FAFC',
    sidebar: '#F5F7FA',
    card: '#FFFFFF',
    input: '#FFFFFF',
  },
  text: {
    primary: '#111827',
    secondary: '#64748B',
    muted: '#94A3B8',
  },
  border: {
    default: '#E5E7EB',
    hover: '#CBD5E1',
  },
  accent: {
    primary: '#6366F1',
    primaryHover: '#4F46E5',
    soft: '#EEF2FF',
  },
  status: {
    online: '#10B981',
    offline: '#94A3B8',
    busy: '#F59E0B',
    error: '#DC2626',
    success: '#059669',
  },
  chart: {
    price: '#6366F1',
    ma: '#94A3B8',
    resistance: '#DC2626',
    support: '#059669',
    volume: '#CBD5E1',
  }
};

// spacing.ts
export const spacing = {
  xs: '4px',
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  '3xl': '32px',
};

// radius.ts
export const radius = {
  sm: '4px',
  md: '6px',
  lg: '8px',
  xl: '10px',
  '2xl': '12px',
  full: '9999px',
};
```

### 5.2 Component Hierarchy

```
App
├── TopNavigation
│   ├── BrandLogo
│   ├── AgentTabs
│   │   └── AgentTab (×3)
│   └── UserActions
│       ├── NotificationBell
│       ├── UserAvatar
│       └── ProfileDropdown
├── Layout
│   ├── Sidebar
│   │   ├── NewChatButton
│   │   ├── SearchBox
│   │   └── ConversationList
│   │       ├── SectionHeader
│   │       └── ConversationItem (×N)
│   └── MainContent
│       ├── AgentHeader
│       │   ├── AgentIcon
│       │   ├── AgentInfo
│       │   └── StatusIndicator
│       ├── ChatArea
│       │   └── MessageThread
│       │       ├── UserMessage
│       │       │   ├── Avatar
│       │       │   ├── MessageBubble
│       │       │   └── Timestamp
│       │       └── AIMessage
│       │           ├── AgentAvatar
│       │           ├── MessageBubble
│       │           │   ├── MarkdownRenderer
│       │           │   ├── ChartEmbed
│       │           │   │   └── SVGChart
│       │           │   └── MetricsPanel
│       │           └── Timestamp
│       └── Composer
│           ├── AttachmentButton
│           ├── TextInput (auto-resize textarea)
│           ├── SendButton
│           └── Disclaimer
```

### 5.3 State Management

```typescript
// Global Store (Zustand)
interface AppState {
  // Auth
  user: User | null;
  isAuthenticated: boolean;

  // Agents
  agents: Agent[];
  activeAgent: Agent | null;

  // Conversations
  conversations: Conversation[];
  activeConversation: Conversation | null;
  searchQuery: string;

  // Messages
  messages: Message[];
  isLoading: boolean;
  streamingContent: string;

  // UI
  sidebarOpen: boolean;
  notifications: Notification[];
  unreadCount: number;
}

// Local State (React useState)
// - Composer textarea content
// - Dropdown open/close
// - Hover states
// - Animation triggers
```

### 5.4 Responsive Breakpoints

| Breakpoint | Width | Layout Behavior |
|------------|-------|-----------------|
| Desktop | ≥1280px | Full layout: sidebar 280px + main flexible |
| Tablet | 1024–1279px | Sidebar collapses to 64px icon-only; hover to expand |
| Mobile | <1024px | Out of scope for Phase 1 |

---

## 6. Security Architecture

### 6.1 Authentication Flow

```
┌─────────┐         ┌─────────────┐         ┌─────────────┐
│  Client │────────►│ Auth Service│────────►│  PostgreSQL │
│         │  HTTPS  │             │         │   (users)   │
│         │◄────────│             │◄────────│             │
└────┬────┘  JWT    └─────────────┘         └─────────────┘
     │
     │ (Every request)
     ▼
┌─────────────┐
│ API Gateway │───► Verify JWT signature
│   (Kong)    │     Check expiration
└──────┬──────┘     Extract user_id
       │
       ▼
┌─────────────┐
│  Services   │───► Authorization check
│             │     (user owns resource?)
└─────────────┘
```

### 6.2 JWT Structure

```json
{
  "sub": "user-uuid",
  "email": "user@example.com",
  "role": "user",
  "iat": 1724601600,
  "exp": 1724605200,
  "jti": "unique-token-id"
}
```

### 6.3 Security Measures

| Layer | Measure | Implementation |
|-------|---------|----------------|
| Transport | TLS 1.3 | Let's Encrypt certificates, HSTS headers |
| Authentication | JWT + Refresh tokens | Access token: 1h, Refresh token: 7d |
| Authorization | RBAC | Middleware checks role and ownership |
| Input | Validation | Zod schemas on all endpoints |
| Output | Sanitization | DOMPurify for HTML, escape for SQL |
| Rate Limiting | Token bucket | Redis-backed, per-user and per-IP |
| CORS | Strict origin | Whitelist: `https://aistudio.com` |
| Headers | Security headers | CSP, X-Frame-Options, X-Content-Type-Options |
| Secrets | Management | AWS Secrets Manager / HashiCorp Vault |

### 6.4 Data Privacy (GDPR)

- **Right to Access:** `/v1/user/data-export` returns all user data in JSON
- **Right to Deletion:** `/v1/user/account` DELETE triggers 30-day grace period, then purge
- **Consent:** Explicit opt-in for marketing emails during registration
- **Data Minimization:** Only collect email, name, and conversation data necessary for service
- **Breach Notification:** Automated alerts; user notification within 72 hours

---

## 7. AI/LLM Integration Design

### 7.1 Agent Orchestration Pattern

```
┌─────────────────────────────────────────────────────────────┐
│                     Agent Service                            │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐         │
│  │   Router    │  │  Context    │  │   Tool      │         │
│  │             │  │  Builder    │  │  Executor   │         │
│  └──────┬──────┘  └──────┬──────┘  └──────┬──────┘         │
│         │                │                │                 │
│         ▼                ▼                ▼                 │
│  ┌─────────────────────────────────────────────────────┐   │
│  │              LLM API Client                          │   │
│  │  (OpenAI GPT-4 / Anthropic Claude / Self-hosted)    │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
```

### 7.2 System Prompts

#### Crypto Agent System Prompt
```
You are the Crypto Agent for AI Studio, a professional cryptocurrency market analyst.
Your capabilities:
- Analyze market trends using technical indicators
- Generate SVG-compatible chart data (price, moving averages, volume)
- Provide structured metrics: current price, 24h change, volume, RSI

Rules:
- Always provide data in structured JSON within markdown code blocks when generating charts
- Use professional, concise language
- Include risk disclaimers when giving investment-related information
- Format numerical data with appropriate precision (2 decimal places for prices, 1 for percentages)
```

#### CV Maker System Prompt
```
You are the CV Maker Agent for AI Studio, an expert resume writer and career coach.
Your capabilities:
- Guide users through structured resume creation
- Analyze uploaded resumes and suggest improvements
- Generate ATS-friendly resume content

Rules:
- Ask clarifying questions when information is missing
- Use action-oriented bullet points for experience sections
- Ensure content is quantifiable and achievement-focused
- Maintain professional tone throughout
```

### 7.3 Tool Calling Schema

```json
{
  "tools": [
    {
      "type": "function",
      "function": {
        "name": "get_crypto_price",
        "description": "Get current cryptocurrency price and 24h stats",
        "parameters": {
          "type": "object",
          "properties": {
            "symbol": {"type": "string", "enum": ["BTC", "ETH", "SOL"]},
            "currency": {"type": "string", "default": "USD"}
          },
          "required": ["symbol"]
        }
      }
    },
    {
      "type": "function",
      "function": {
        "name": "generate_chart_data",
        "description": "Generate chart data for visualization",
        "parameters": {
          "type": "object",
          "properties": {
            "symbol": {"type": "string"},
            "timeframe": {"type": "string", "enum": ["1H", "4H", "1D", "1W"]},
            "indicators": {"type": "array", "items": {"type": "string"}}
          },
          "required": ["symbol", "timeframe"]
        }
      }
    }
  ]
}
```

### 7.4 Streaming Protocol

```typescript
// Server-side (Node.js/SSE)
async function* streamAIResponse(conversationId: string, userMessage: string) {
  const context = await buildContext(conversationId);
  const stream = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [...context, { role: 'user', content: userMessage }],
    stream: true,
    tools: getAgentTools(activeAgent),
  });

  yield { event: 'message_start', data: { message_id: generateUUID() } };

  for await (const chunk of stream) {
    if (chunk.choices[0]?.delta?.content) {
      yield {
        event: 'content_block_delta',
        data: { type: 'text', text: chunk.choices[0].delta.content }
      };
    }
    if (chunk.choices[0]?.delta?.tool_calls) {
      yield {
        event: 'content_block_delta',
        data: { type: 'tool_call', tool_call: chunk.choices[0].delta.tool_calls[0] }
      };
    }
  }

  yield { event: 'message_stop', data: { usage: stream.usage } };
}

// Client-side (React)
function useStreamingChat() {
  const [streamingContent, setStreamingContent] = useState('');

  const sendMessage = async (conversationId: string, content: string) => {
    const eventSource = new EventSource(
      `/v1/conversations/${conversationId}/messages/stream`,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    eventSource.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'text') {
        setStreamingContent(prev => prev + data.text);
      }
      if (data.type === 'chart') {
        renderChart(data.chart_data);
      }
    };

    eventSource.addEventListener('message_stop', () => {
      eventSource.close();
      setStreamingContent('');
    });
  };

  return { sendMessage, streamingContent };
}
```

---

## 8. External Integrations

### 8.1 LLM Providers

| Provider | Use Case | Fallback Order |
|----------|----------|----------------|
| OpenAI GPT-4 | Primary for all agents | 1st |
| Anthropic Claude 3 | Fallback for long context | 2nd |
| Self-hosted Llama 3 | Cost-sensitive operations | 3rd |

### 8.2 Crypto Data Provider

| Provider | Endpoint | Rate Limit | Data |
|----------|----------|------------|------|
| CoinGecko | `/simple/price`, `/coins/{id}/market_chart` | 10-30 calls/min (free) | Price, volume, market cap, chart data |
| CoinMarketCap | `/v1/cryptocurrency/quotes/latest` | 10k calls/month (free) | Price, rank, percent change |

**Caching Strategy:** Redis with 60-second TTL for real-time data, 5-minute TTL for historical charts.

### 8.3 Email Service

| Provider | Use Case |
|----------|----------|
| SendGrid | Transactional emails (welcome, password reset, notifications) |
| AWS SES | Bulk/marketing emails (future) |

### 8.4 File Storage

| Service | Use Case |
|---------|----------|
| AWS S3 | User uploads (resumes, attachments), generated PDFs |
| CloudFront CDN | Static assets, user avatars |

---

## 9. Deployment Architecture

### 9.1 Infrastructure (AWS)

```
┌─────────────────────────────────────────────────────────────────┐
│                         Route 53                                │
│                    (aistudio.com)                               │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      CloudFront CDN                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Static     │  │  S3 Assets  │  │  API Cache  │             │
│  │  (Next.js)  │  │  (Images)   │  │  (Edge)     │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                    Application Load Balancer                    │
│              (SSL termination, health checks)                   │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      EKS Cluster                                │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  Frontend   │  │  API Pods   │  │  Worker     │             │
│  │  (Next.js)  │  │  (Node.js)  │  │  (Python)   │             │
│  │  3 replicas │  │  5 replicas │  │  3 replicas │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
│  ┌─────────────┐  ┌─────────────┐                               │
│  │  HPA        │  │  Ingress    │                               │
│  │  (CPU/RAM)  │  │  (Nginx)    │                               │
│  └─────────────┘  └─────────────┘                               │
└─────────────────────────────────────────────────────────────────┘
                          │
┌─────────────────────────▼───────────────────────────────────────┐
│                      Data Layer                                 │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐             │
│  │  RDS        │  │  ElastiCache│  │  OpenSearch │             │
│  │ PostgreSQL  │  │   Redis     │  │  (Search)   │             │
│  │ (Multi-AZ)  │  │  (Cluster)  │  │             │             │
│  └─────────────┘  └─────────────┘  └─────────────┘             │
└─────────────────────────────────────────────────────────────────┘
```

### 9.2 CI/CD Pipeline

```
Developer pushes to feature branch
              │
              ▼
┌─────────────────────────────┐
│  GitHub Actions — PR Check  │
│  - Lint (ESLint, Ruff)      │
│  - Unit tests (Jest, Pytest)│
│  - Type check (TypeScript)  │
│  - Build check              │
└─────────────┬───────────────┘
              │ Pass
              ▼
        Code Review
              │ Approved
              ▼
        Merge to main
              │
              ▼
┌─────────────────────────────┐
│  GitHub Actions — Deploy    │
│  - Run integration tests    │
│  - Build Docker images      │
│  - Push to ECR              │
│  - Deploy to staging EKS    │
│  - Run E2E tests (Playwright│
└─────────────┬───────────────┘
              │ Pass
              ▼
        Manual approval
              │
              ▼
        Deploy to production
              │
              ▼
        Smoke tests + monitoring
```

### 9.3 Environment Strategy

| Environment | Purpose | Data |
|-------------|---------|------|
| Local | Developer workstations | Seeded test data |
| Dev | Feature integration | Synthetic data |
| Staging | Pre-release validation | Anonymized production snapshot |
| Production | Live users | Real user data |

---

## 10. Monitoring & Observability

### 10.1 Metrics & Alerting

| Metric | Tool | Threshold | Alert Channel |
|--------|------|-----------|---------------|
| API latency (p99) | Datadog / Prometheus | > 500ms | PagerDuty |
| Error rate | Datadog / Prometheus | > 1% | PagerDuty |
| CPU utilization | CloudWatch | > 80% | Slack |
| Memory utilization | CloudWatch | > 85% | Slack |
| DB connections | CloudWatch | > 80% of max | PagerDuty |
| LLM API latency | Custom | > 5s | Slack |
| User sign-up rate | Mixpanel | Drop > 30% | Email |

### 10.2 Logging Standards

```json
{
  "timestamp": "2026-08-25T10:43:00.123Z",
  "level": "info",
  "service": "chat-service",
  "correlation_id": "abc-123-def",
  "user_id": "user-uuid",
  "conversation_id": "conv-uuid",
  "event": "message_sent",
  "duration_ms": 45,
  "metadata": {
    "agent_slug": "crypto",
    "message_length": 120,
    "has_attachments": false
  }
}
```

### 10.3 Tracing

- Distributed tracing via OpenTelemetry
- Trace propagation through all services
- Key spans: HTTP request, DB query, LLM API call, cache lookup

---

## 11. Testing Strategy

### 11.1 Test Pyramid

```
         ┌─────────┐
         │   E2E   │  ← Playwright (critical user journeys)
         │   10%   │
        ┌┴─────────┴┐
        │ Integration│  ← Supertest + TestContainers
        │    30%    │
       ┌┴───────────┴┐
       │    Unit      │  ← Jest (frontend), Pytest (backend)
       │    60%      │
       └─────────────┘
```

### 11.2 Test Cases

| ID | Type | Description |
|----|------|-------------|
| TC-001 | Unit | Auth service validates password strength |
| TC-002 | Unit | Message renderer correctly parses markdown tables |
| TC-003 | Unit | Chart component renders SVG with provided data |
| TC-004 | Integration | Creating conversation persists to DB and returns correct agent |
| TC-005 | Integration | Streaming endpoint emits SSE events in correct order |
| TC-006 | Integration | Rate limiter blocks requests after threshold |
| TC-007 | E2E | User can register, login, start chat, and receive AI response |
| TC-008 | E2E | User can switch agents and see correct conversation history |
| TC-009 | E2E | Search filters conversations in real-time |
| TC-010 | Performance | Load test: 1000 concurrent chat sessions |

---

## 12. Disaster Recovery

### 12.1 Backup Strategy

| Data | Frequency | Retention | Method |
|------|-----------|-----------|--------|
| PostgreSQL | Daily full + hourly WAL | 30 days | RDS automated backups + cross-region snapshot |
| Redis | Hourly RDB | 7 days | ElastiCache backup |
| S3 objects | Continuous | 90 days | Versioning + lifecycle to Glacier |

### 12.2 Recovery Objectives

| Metric | Target |
|--------|--------|
| RPO (Recovery Point Objective) | 1 hour |
| RTO (Recovery Time Objective) | 4 hours |
| Cross-region failover | Manual trigger, < 30 min |

---

## 13. Appendices

### Appendix A: Technology Stack Summary

| Layer | Technology | Version |
|-------|-----------|---------|
| Frontend | Next.js | 14.x |
| Frontend | React | 18.x |
| Frontend | TypeScript | 5.x |
| Frontend | Tailwind CSS | 3.x |
| Frontend | Zustand | 4.x |
| Frontend | React Query | 5.x |
| Backend API | Node.js | 20 LTS |
| Backend API | Express / Fastify | 4.x / 4.x |
| Backend AI | Python | 3.11 |
| Backend AI | FastAPI | 0.110+ |
| Database | PostgreSQL | 16 |
| Cache | Redis | 7.x |
| Search | OpenSearch | 2.x |
| Queue | Redis Streams | 7.x |
| Container | Docker | 24.x |
| Orchestration | Kubernetes (EKS) | 1.29+ |
| Gateway | Kong | 3.x |
| Monitoring | Datadog / Prometheus | Latest |
| CI/CD | GitHub Actions | N/A |
| IaC | Terraform | 1.7+ |

### Appendix B: Glossary

| Term | Definition |
|------|------------|
| SSE | Server-Sent Events — HTTP-based server-to-client streaming |
| HPA | Horizontal Pod Autoscaler — Kubernetes auto-scaling |
| RPO | Recovery Point Objective — maximum acceptable data loss |
| RTO | Recovery Time Objective — maximum acceptable downtime |
| EKS | Elastic Kubernetes Service — AWS managed Kubernetes |
| ECR | Elastic Container Registry — AWS Docker registry |
| WAL | Write-Ahead Log — PostgreSQL transaction log |

---

## 14. Document Control

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 0.1 | 2026-08-20 | Engineering Lead | Initial draft |
| 1.0 | 2026-08-25 | Engineering Team | Review complete, approved for implementation |

---

## 15. Approval

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Engineering Lead | | | |
| Security Lead | | | |
| DevOps Lead | | | |
| Product Owner | | | |
