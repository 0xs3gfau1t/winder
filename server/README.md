# Backend for Winder

## Developing

```bash
git clone https://github.com/bimarshak7/winder/
cd winder/server
npm install
npm run devStart
```

## /auth

### /register

Description: Create a new user and loads the client cookies with accessToken and refreshToken  
Method: Post  
Authentication: not required

Request
Field|Description|
-|-|
email|email address of the user
password|password of the user
dob|date of birth in js date format
gender|either 'male', 'female' or 'other'
firstName|first name of the user
lastName|last name of the user

Response
Field|Description|
-|-|
success|True if the registration was success, false otherwise
error|error message description if the task wasn't completed

### /login

Description: Login with an email and password and loads the client cookies with accessToken and refreshToken  
Method: Post  
Authentication: Not Required

Request
Field|Description
-|-|
email|email address of the user
password|password of the user

Response
Field|Description
-|-
success|True if the registration was success, False otherwise
error|error message description if the task wasn't completed

### /logout

Description: Logs out. Clears all the tokens of the user.  
Method: Delete  
Authentication: Required

Response
Field|Description
-|-
success|True or False

## /explore

### /

Description: Get a list of user recommendations  
Method: GET  
Authentication: Required

Response
Field|Description
-|-
success|True or False
userList|An array of users: `[{name, university, program, batch, bio, passion, _id}]`

### /accept

Description: Like the user and send request  
Method: POST  
Authentication: Required

Request
Field|Description
-|-
whom|user_id of the accepted user

Response
Field|Description
-|-
success|True or False
matched|True if the user has been matched, False otherwise

## /messages

### /

Description: Get the conversation list of the user  
Method: GET  
Authentication: Required

Response
Field|Description
-|-
success|True or False
data|Array of conversation list: `[users:Array, stat, unreadCount]`
error|Error message if success is False

### /:id

Description: Get the message list in batch with user `id`  
Method: GET  
Authentication: Required

Request
Query|Description
-|-
cursor|Either empty or a data string

Response
Field|Description
-|-
success|True or False
nextCursor|Either undefined or date string, this is to be stored and sent from the frontend for next batch of messages
data|Array of messages: `[content, sender: Boolean, createdAt]`
error|Error message if success is False

### /:id

Description: Send message to the user `id`, this stores the message in the database and send msg to the receiver through websocket as well  
Method: POST  
Authenticatin: Required

Request
Field|Description
-|-
content|Actual message content

Response
Field|Description
-|-
success|True or False
id|unique identifier of the created message id, can be used as key in frontend
status|'delivered' if the receiver got the message in real time, 'sent' otherwise
error|Error message if success is False

## /notification

### /

Description: Get a list of notifications of the user
Method: GET
Authentication: Required

Response
Field|Description
-|-
success|True or False
data|Array of notifications: `[_id, title, type: 0 if Liked, 1 if Matched, 2 if Poromotions]`
error|Error message if success if False

### /:id

Description: Content of the notification with id: `id`
Method: GET
Authentication: Required

Response
Field|Description
-|-
success|True of False
notification|Full notification detail: `{_id, type, title, content}`

## /changepassword

### /:id

Method: POST  
Description: Send email with reset link if that email exists. Response is static no matter the result  
Method: POST  
Authentication: Not Required

Request
Field|Description
-|-
email|email associated with the user's account

Response
Field|Description
-|-
message|"done"

### /:token

Description: Changes password if the token is not expired  
Method: POST  
Authentication: Not Required

Request
Field|Description
-|-
password|new password to be set

Response
Field|Description
-|-
success|True or False
error|Error message if success if False
