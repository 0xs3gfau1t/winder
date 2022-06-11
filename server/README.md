# Backend for Winder

## Developing
```bash
git clone https://github.com/bimarshak7/winder/
cd winder/server
npm install
npm run devStart
```

## Endpoints

route|endpoint|method|request|body|action
-|-|-|-|-|-|
|/auth|register|POST|`{email, password}`|`{success, error}`|if success, creates new user with given info and loads the browser cookie with accessToken and refreshToken
|/auth|login|POST|`{email, password}`|`{success, error}`|if success, loads the browser cookie with accessToken and refreshToken
|/auth|logout|DELETE|`null`|`{success, error}`|if success, logs out the user
|/explore||GET||`[{name, university, program, batch, bio, passion}]`|provides paginated server specified number of public user data per batch
|/explore|accept|POST|`{whom: _id}`|`{matched: <true/false>}`|returns matched info, if `true`, both of them liked each other