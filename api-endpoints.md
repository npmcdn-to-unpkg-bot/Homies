# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `GET /users/new`
- `POST /users`
- `PATCH /users`

### Session

- `GET /session/new`
- `POST /session`
- `DELETE /session`

## JSON API

### Messages

- `GET /api/messages`
- `POST /api/messages`


### Lists

- `GET /api/lists`
- `POST /api/lists`
- `GET /api/lists/:id`
- `PATCH /api/lists/:id`
- `DELETE /api/lists/:id`

### Calendar

- `GET /api/calendar`
- `POST /api/calendar`
- `GET /api/calendar/:event_id`
- `PATCH /api/calendar/:event_id`
- `DELETE /api/calendar/:event_id`

### Bills

- `GET /api/bills`
- `POST /api/bills`
- `GET /api/bills/:transaction_id`
- `PATCH /api/bills/:transaction_id`
- `DELETE /api/bills/:transaction_id`
