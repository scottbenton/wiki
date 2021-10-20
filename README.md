![Willo Wiki Logo](/public/branding/wordmark/WilloWordmark256.png)

## Environments

| Environment | URL                                        | Branch |
| ----------- | ------------------------------------------ | ------ |
| Prod        | [willo.wiki](https://willo.wiki)           | prod   |
| Beta        | [beta.willo.wiki](https://beta.willo.wiki) | beta   |

## Features

![Mockup of a Wiki Page](/public/images/WikiPageMockup.png)

Willo wiki is a note tacking application that stores your notes (called pages), in a tree structure. It features the ability to store multiple wiki projects in the cloud, so you can access and edit them anywhere. Pages can be edited with a rich text editor, allowing for content to look exactly how you want it to.

## Development

### General

1. Clone the project

2. Install dependencies: `npm run setup:dev`

3. Set up a firebase project with authentication, functions, and a firestore database

### UI Setup

1. Move the following information from the firebase project into your environment variables. For local development, I recommend creating a `.env.local` file in the root of this application, setting the following variables in.

```
NEXT_PUBLIC_FIREBASE_PROJECT_ID=PROJECT_ID_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=AUTH_DOMAIN_HERE
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=API_KEY_HERE
```

2. Run `npm run dev` to start up the application

### Functions Setup

1. Create a `.firebaserc` file in your `firebase/` folder, and populate it with the following information:

```json
{
  "projects": {
    "dev": "INSERT_PROJECT_ID_HERE",
    "prod": "INSERT_PROJECT_ID_HERE"
  },
  "targets": {}
}
```

If you only plan to play around with the project locally, only the `dev` instance is necessary.

2. You should also populate the following environment variables so your npm scripts work properly.

```
FIREBASE_CI_TOKEN="INSERT_TOKEN_HERE"
FIREBASE_CI_ENV="dev"
```

`FIREBASE_CI_TOKEN` should be filled in with the outputted token from running the command `firebase login:ci`. `FIREBASE_CI_ENV` should be set to one of your projects from the previous step.
