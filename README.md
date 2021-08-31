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

1. Clone the project
2. Install dependencies: `npm i`
3. Set up a firebase project with authentication and a firestore database.
4. Move the following information from the firebase project into your environment variables. For local development, I recommend creating a `.env.local` file in the root of this application, setting the following variables in.

```
--- .env.local ---
NEXT_PUBLIC_FIREBASE_PROJECT_ID=PROJECT_ID_HERE
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=AUTH_DOMAIN_HERE
NEXT_PUBLIC_FIREBASE_PUBLIC_API_KEY=API_KEY_HERE
```

5. Run `npm run dev` to start up the application
