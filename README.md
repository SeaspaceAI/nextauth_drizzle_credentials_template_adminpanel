## Introduction

This is a starting template for authentication with Next.js and postgres using Auth.js and Drizzle adapter (ORM).<br/>
It's set up only for credentials auth with all the necessary set up for other third-party providers like Google, Github and other including buttons, providers checks and so on<br/>
It also has the ```role``` field set up in user schema with default value of ```user``` but no further work was done regarding authorization.

## Features

Features include:
- Register with an email
- basic password strength check
- confirm email
- reset password
- one basic api endpoint for changing username
- protected pages
- protected user route
- error handling
- toast notifications  

## Getting Started

1. Create your postgres db.
2. After clonning the repo add all the necessary env variables
You  will need to add some mailing variables. Default is set up for gmail but you can use your own SMTP server. If you want to use gmail you will need to generate application password. Read more here [gmailpass](https://support.google.com/accounts/answer/185833?hl=en#zippy=)
3. Install dependencies with ```npm i```
4. migrate the shcema ```npx drizzle-kit push:pg```
5. If everything went well you should be able to run development server with ```npm run dev```

## Guides

Nextjs: https://nextjs.org/docs<br/>
Authjs: https://authjs.dev/<br/>
Drizzle: https://orm.drizzle.team/docs/overview
