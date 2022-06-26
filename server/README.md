# Backend for Winder

## Developing

```bash
git clone https://github.com/bimarshak7/winder/
cd winder/server
npm install
npm run devStart
```

## Socket

-   Join the socket like so

```
const {io} = require("socket.io-client")
const socket = io("http://localhost:4000", {withCredentials: true})
```

-   Handle 2 socket events: `chat` and `notification`

```
socket.on('chat', (payload)=>{
    // append the message details to the chat box
})
```

-   `chat`'s payload will be `{_id, content, createdAt}`
-   `notification`'s payload will be `{_id, title, type}`

## **`/auth`**

### `/register`

**Description**: Create a new user and loads the client cookies with accessToken and refreshToken

**Method**: `Post`

**Authentication**: not required

**Request**
Field|Description|
-|-|
email|email address of the user
password|password of the user
dob|date of birth in js date format
gender|either 'male', 'female' or 'other'
firstName|first name of the user
lastName|last name of the user

**Response**
Field|Description|
-|-|
success|True if the registration was success, false otherwise
error|error message description if the task wasn't completed

### `/login`

**Description**: Login with an email and password and loads the client cookies with accessToken and refreshToken

**Method**: `Post`

**Authentication**: Not Required

**Request**
Field|Description
-|-|
email|email address of the user
password|password of the user

**Response**
Field|Description
-|-
success|True if the registration was success, False otherwise
error|error message description if the task wasn't completed

### `/logout`

**Description**: Logs out. Clears all the tokens of the user.

**Method**: `Delete`

**Authentication**: Required

**Response**
Field|Description
-|-
success|True or False

## **`/explore`**

### `/`

**Description**: Get a list of user recommendations

**Method**: `GET`

**Authentication**: Required

**Response**
Field|Description
-|-
success|True or False
userList|An array of users: `[{name, university, program, batch, bio, passion, _id}]`

### `/accept`

**Description**: Like the user and send request

**Method**: `POST`

**Authentication**: Required

**Request**
Field|Description
-|-
whom|user_id of the accepted user

**Response**
Field|Description
-|-
success|True or False
matched|True if the user has been matched, False otherwise

## **`/messages`**

### `/`

**Description**: Get the conversation list of the user

**Method**: `GET`

**Authentication**: Required

**Response**
Field|Description
-|-
success|True or False
data|`[id, user, unreadCount]`
error|Error message if success is False

id: Unique id of the chat
user: User id of the other user
unreadCount: No of unread messages. If negative the other user hasn't read last `n` messages

### `/:id`

**Description**: Get the message list in batch with user `id`

**Method**: `GET`

**Authentication**: Required

**Request**
Query|Description
-|-
cursor|Either empty or a data string

**Response**
Field|Description
-|-
success|True or False
nextCursor|Either undefined or date string, this is to be stored and sent from the frontend for next batch of messages
data|Array of messages: `[content, sender: Boolean, createdAt]`
error|Error message if success is False

### `/:id`

**Description**: Send message to the user `id`, this stores the message in the database and send msg to the receiver through websocket as well

**Method**: `POST`

**Authentication**: Required

**Request**
Field|Description
-|-
content|Actual message content

**Response**
Field|Description
-|-
success|True or False
id|unique identifier of the created message id, can be used as key in frontend
status|'delivered' if the receiver got the message in real time, 'sent' otherwise
error|Error message if success is False

## **`/notification`**

### `/`

**Description**: Get a list of notifications of the user

**Method**: `GET`

**Authentication**: Required

**Response**
Field|Description
-|-
success|True or False
data|Array of notifications: `[_id, title, type: 0 if Liked, 1 if Matched, 2 if Poromotions]`
error|Error message if success if False

### `/:id`

**Description**: Content of the notification with id: `id`

**Method**: `GET`

**Authentication**: Required

**Response**
Field|Description
-|-
success|True of False
notification|Full notification detail: `{_id, type, title, content}`

## **`/changepassword`**

### `/:id`

**Method**: `POST`

**Description**: Send email with reset link if that email exists. Response is static no matter the result

**Method**: `POST`

**Authentication**: Not Required

**Request**
Field|Description
-|-
email|email associated with the user's account

**Response**
Field|Description
-|-
message|"done"

### `/:token`

**Description**: Changes password if the token is not expired

**Method**: `POST`

**Authentication**: Not Required

**Request**
Field|Description
-|-
password|new password to be set

**Response**
Field|Description
-|-
success|True or False
error|Error message if success if False

## **`/settings`**

### `/`

**Description**: Fetch currently logged in user data

**Method**: `GET`

**Authentication**: Required

**Response**
Field|Description
-|-
success|`True` or `False`
user|userdata if fetched successfully
error|error message

### `/`

**Description**: Verifies email of user in \<token>

**Method**: `PATCH`

**Authentication**: Required

**Request**
Field|Description
-|-
genderPreference|New preferred gender form [options](#options)
programPreference|New preferred program from [options](#options)
universityPreference|New preferred university from [options](#options)
agePreference|New preferred age from [options](#options)
gender|New gender from [options](#options)
bio|New preferred bio
passion|New passions from [options](#options)
university|New university from [options](#options)
program|New program from [options](#options)
batch|New batch
email|New preferred email (Currently Not supported)

**Response**:
Field|Description
-|-
genderPreference|`true` if updated else `false`
programPreference|`true` if updated else `false`
universityPreference|`true` if updated else `false`
agePreference|`true` if updated else `false`
gender|`true` if updated else `false`
bio|`true` if updated else `false`
passion|`true` if updated else `false`
university|`true` if updated else `false`
program|`true` if updated else `false`
batch|`true` if updated else `false`
email|`true` if updated else `false`
any invalid property|`Invalid property. FBI open up.`
success|`true` if successfully saved else `false`

### `/options`

**Description**: Fetch available options

**Method**: `GET`

**Authentication**: Not Required

**Response**:
Field|Description
-|-
gender|`[-1, 0, 1]`
programs|`["BArch", "BCE", "BCT", "BEL", "BEX", "BME", "BAM", "BGE"]`
universities|`["TU","PU","PoU","KU","NSU","MWU","FWU","LBU","AFU","BPKHS","GU"]`
age|`[18, 50]`
passions|`["Photography", "Reading", "Sports", "Anime", "Manga", "Coding", "Gym", "Walking", "Traveling", "Hiking", "Cricket", "Football", "Movies", "Netflix", "Skateboarding", "Singing", "Coffee", "Electronic Music", "Vlogging", "Fishing", "Camping", "Picnicking", "Yoga"]`

### `/verifyemail`

**Description**: Sends a verification email

**Method**: `POST`

**Authentication**: Required

**Response**
Field|Description
-|-
success|`True` or `False`

### `/verifyemail/<token>`

**Description**: Verifies email of user in \<token>

**Method**: `POST`

**Authentication**: Not Required

**Response**:
Field|Description
-|-
success|`True` or `False`
message|`Token Expired` alert if stale token

### `/changepassword`

**Description**: Verifies email of user in \<token>

**Method**: `PATCH`

**Authentication**: Required

**Request**:
Field|Description
-|-
oldPassword|Current password
newPassword|New password to replace old one

**Response**:
Field|Description
-|-
success|`True` or `False`
message|`Unauthorized` if old password is wrong

### `/img`

**Description**: Upload user's image if there is vacant space.

**Method**: `POST`

**Authentication**: Required

**Request**:
Field|Description
-|-
file|Image file to be uploaded; must be less than 3MB; accepted fileType: 'jpg', 'jpeg', 'gif', 'png'; accepted mimeType: 'image/jpg', 'image/jpeg', 'image/gif', 'image/png'

**Response**:
Field|Description
-|-
success|`True` or `False`
id|id of the image, is used to fetch the image
error|error message if something went wrong

### `/img/:id`

**Description**: Get the image identified by `id`

**Method**: `GET`

**Authentication**: Not Required

**Request**:
param|description
-|-
id|id of the image, provided in [userDetails](#1)

### `/img/:id`

**Description**: Delete the image identified by `id` only if it belongs to the logged in user.

**Method**: `DELETE`

**Authentication**: Required

**Request**:
param|description
-|-
id|id of the image, provided in [userDetails](#1)
