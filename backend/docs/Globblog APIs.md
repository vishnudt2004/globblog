# Globblog APIs

## Introduction

Globblog APIs provide endpoints for authentication, security, blog management, and user management. The API follows RESTful conventions and uses JWT-based authentication managed via HTTP cookies.

### **Authentication & Authorization**

- **Auth Token:** After a successful login or registration, an `authToken` cookie is set in the browser.
- **Middleware Protection:** `Blog`, `Security`, and `User` APIs require authentication.

---

## **Auth**

Handles user authentication, including registration, login, and OAuth-based login.

### **Register**

**Endpoint:** `POST /api/auth/register`

**Description:** Registers a new user (requires `username`, `profile name`, `email`, and `password`). After registration, an **email verification link** is sent to the user's email. The user must open this link to verify their account before it expires. If not verified within **24 hours**, the account will be automatically deleted.

**Body (JSON):**

```json
{
  "username": "", // (Required). Unique identifier for the user.
  "name": "", // (Required). Display name of the user.
  "email": "", // (Required). User’s email for login & verification.
  "password": "" // (Required). Strong password for account security.
}
```

---

### **Login**

**Endpoint:** `POST /api/auth/login`

**Description:** Logs in a user (using username/email and password).

**Body (JSON):**

```json
{
  "username_email": "", // (Required). Either username or email for login.
  "password": "" // (Required). User’s password to authenticate.
}
```

---

### **Logout**

**Endpoint:** `GET /api/auth/logout`

**Description:** Logs out the user and clears the session.

---

### **Email Verification**

**Endpoint:** `GET /api/auth/email-verification/:userId/:token`

**Description:** Verifies user email with a token. The user must open the verification link sent to their email before it expires. If the link is not used within **24 hours**, the account will be deleted.

**Path Parameters:**

- `userId`: ID of the user requesting verification.
- `token`: Unique verification token sent via email.

---

### **Password Reset Request**

**Endpoint:** `POST /api/auth/password-reset/request`

**Description:** Sends a password reset link to the user's email. Only for non-Google OAuth 2.0 users.

**Body (JSON):**

```json
{
  "email": "" // The registered email address to receive the reset link.
}
```

---

### **Password Reset**

**Endpoint:** `POST /api/auth/password-reset/:userId/:token`

**Description:** Resets the user's password using the token sent to their email.

**Path Parameters:**

- `userId`: ID of the user requesting password reset.
- `token`: Unique verification token sent via email.

**Body (JSON):**

```json
{
  "password": "" // The new password to set for the account.
}
```

---

### **Google OAuth2.0**

**Endpoint:** `GET /api/auth/google`

**Description:** Initiates Google OAuth2.0 authentication.

**Note:** This route (`/api/auth/google`) cannot be tested in Postman because Google OAuth requires a browser-based authentication flow.

**How to Test in a Browser:**

- Open `{backend_url}/api/auth/google` in your browser.
- Select a Google account to log in.
- After successful login, you will be redirected to the **corresponding frontend URL** based on the response.
- Make sure your **frontend server is running** to see the correct page.

---

## **Security**

Handles security-related operations like getting the current user, password validation, and OTP verification.

- **Password validation (`validate-password`) and OTP verification (`verify-otp`) act as extra security layers** for risky actions such as **updating/deleting blogs** or **updating/deleting users.**

### **Get Current User**

**Endpoint:** `GET /api/security/current-user`

**Description:** Fetches the currently logged-in user **(from `authToken` stored in cookies)**.

---

### **Validate Password**

**Endpoint:** `POST /api/security/validate-password`

**Description:** Checks if the provided password matches the user's password. (extra security for critical actions)

**Body (JSON):**

```json
{
  "password": "" // Current password for validation.
}
```

---

### **Get OTP**

**Endpoint:** `GET /api/security/get-otp`

**Description:** Generates and sends an OTP for verification.

---

### **Verify OTP**

**Endpoint:** `POST /api/security/verify-otp`

**Description:** Verifies the OTP received via email. (extra security for critical actions)

**Body (JSON):**

```json
{
  "otp": "" // One-time password received via email.
}
```

---

## **Blog**

Handles all blog-related operations, including fetching, creating, updating, and deleting blog posts.

### **Get Blogs**

**Endpoint:** `GET /api/blog`

**Description:** Retrieves a list of all blogs with query parameters for filtering and sorting options.

**Query Parameters:**

- `filterType`: Leave empty for default blog retrieval. Valid values: latest, trending, search.
- `page`: Page number for pagination.
- `limit`: Number of blogs per page.
- `dateRange`: (Only for trending filter). Format: startDate_endDate.
- `sortBy`: (Only for search filter). Comparable fields: readsCount, createdAt.
- `order`: (Only for search filter). Sorting order ('asc' or 'desc').
- `fields`: (Only for search filter). Specifies which fields to return. Default: ["title", "summary", "tags"].
- `search`: (Only for search filter). Search term.

---

### **Get Blog**

**Endpoint:** `GET /api/blog/:id`

**Description:** Fetches details of a specific blog by ID.

**Path Parameters:**

- `id`: Blog ID to fetch.

---

### **Create Blog**

**Endpoint:** `POST /api/blog`

**Description:** Creates a new blog (requires title, content, summary, tags, and an optional cover image).

**Body (Form Data):**

| Field   | description                    |
| ------- | ------------------------------ |
| title   | Blog title.                    |
| content | Full content of the blog.      |
| summary | Short summary of the blog.     |
| tags    | Tags related to the blog.      |
| image   | Blog cover image. \[Optional\] |

---

### **Update Blog**

**Endpoint:** `PATCH /api/blog/:id`

**Description:** Updates an existing blog (accepts title, content, summary, tags, and an optional cover image).

**Path Parameters:**

- `id`: Blog ID to update.

**Body (Form Data):**

| Field   | description                              |
| ------- | ---------------------------------------- |
| title   | New title.                               |
| content | Updated content.                         |
| summary | New summary.                             |
| tags    | Updated tags.                            |
| image   | New cover image. \[Optional, Removable\] |

---

### **Delete Blog**

**Endpoint:** `DELETE /api/blog/:id`

**Description:** Deletes a blog by ID.

**Path Parameters:**

- `id`: Blog ID to delete.

---

### **Update Read Count**

**Endpoint:** `PATCH /api/blog/read-count/:id`

**Description:** Increments the read count for a blog.

#### **Read Count Logic:**

- Checks for a `read_{blogId}` cookie.
- If it doesn’t exist and `countRead: true` is passed, the read count is incremented.
- If it exists, the read is already counted and won’t be incremented again.

**Path Parameters:**

- `id`: Blog ID to update read count.

**Body (JSON):**

```json
{
  "countRead": true // true to count a read.
}
```

---

## **User**

Manages user profiles, fetching user details, updating profiles, and deleting users.

### **Get Users**

**Endpoint:** `GET /api/user/`

**Description:** Retrieves a list of all users.

---

### **Get User**

**Endpoint:** `GET /api/user/:id`

**Description:** Fetches details of a specific user.

**Path Parameters:**

- `id`: User ID to fetch.

---

### **Update User**

**Endpoint:** `PATCH /api/user/:id`

**Description:** Updates user profile (accepts name, about, social media profiles, and an optional profile image).

**Path Parameters:**

- `id`: User ID to update.

**Body (Form Data):**

| Field               | description                              |
| ------------------- | ---------------------------------------- |
| name                | New name.                                |
| about               | Updated bio.                             |
| socialMediaProfiles | Updated social links.                    |
| image               | Profile picture. \[Optional, Removable\] |

---

### **Delete User**

**Endpoint:** `DELETE /api/user/:id`

**Description:** Deletes a user account by ID.

**Path Parameters:**

- `id`: User ID to delete.

---

## **General**

Handles general API responses, such as 404 (Page Not Found).

### **404 Page Not Found**

**Endpoint:** `GET /unavailable`

**Description:** Returns a `404 Page Not Found` response for undefined routes. Can be ANY HTTP request method.
