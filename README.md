## Introduction

This is a starting template for authentication with Next.js and postgres using Auth.js and Drizzle adapter (ORM).<br/>
It's set up only for credentials auth with all the necessary set up for other third-party providers like Google, Github and other including buttons, providers checks and so on<br/>
It's meant to be used in a way that admin adds and manages users and not a saas like auth system.
Along with adding users Group model is alse set up.

## Features

Features include:
- Register users with admin
- admin panel for adding and managing users and groups
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
4. migrate the shcema. We have 2 migration commands, first is for creating a migration file ```npm run migration:generate``` and second is for pushing to db ```npm run migration:push```. Also we have created only one command which is combination of those 2 ```npm run migrate```
5. Seed the database. Use ```npm run db:seed``` command. It will create dummy data with 3 groups, 10 users and 1 admin user. Note that password for all users is ```123456``` <br> 
Admin user credentials are:<br>
admin@admin.com<br>
123456
6. If everything went well you should be able to run development server with ```npm run dev```

## Guides

Nextjs: https://nextjs.org/docs<br/>
Authjs: https://authjs.dev/<br/>
Drizzle: https://orm.drizzle.team/docs/overview
