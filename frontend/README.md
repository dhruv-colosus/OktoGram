# Oktogram: A Web3 Social Media App

Oktogram is a Next.js application that integrates Shadcn for UI components, Okto Wallet for cryptocurrency wallet functionality, and Google OAuth for user authentication. It is a Web3-based social media platform.

## Features

- **Modern UI**: An application built using the best modern UI practices
- **Okto Auth**: Authentication using Okto Custodial Wallet
- **Awarding Posts**: Awarding Posts using Okto Wallet directly to the Poster's Account
- **Giveaways**: Giveaway Feature which gets triggered when a certain amount of likes is reached and someone random from the likers gets a Free NFT

## Getting Started

Follow the steps below to set up the project locally.

### Prerequisites

Make sure you have the following installed on your machine:

- [Node.js](https://nodejs.org/) (version 14.x or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) (npm comes with Node.js)
- [Git](https://git-scm.com/)

### Installation

1. **Clone the repository**:

   ````bash
   git clone https://github.com/dhruv-colosus/oktogram.git
   cd oktogram```

   ````

2. **Installing Dependencies**:

   ````npm install
    or
    yarn install```

   ````

3. **Setup environment variables:**:

   `cp env.sample .env`

DATABASE_URL="your-database-url"
NEXT_PUBLIC_OKTO_CLIENT_API="your-okto-client-api"
NEXT_PUBLIC_GOOGLE_CLIENT_ID="your-google-client-id"
NEXT_PUBLIC_HOST="http://localhost:3000"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
OKTO_SERVER_API_KEY="your-okto-server-api-key"

4. **Run it locally**:
   `npm run dev `
