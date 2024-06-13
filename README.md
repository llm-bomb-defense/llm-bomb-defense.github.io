This repo hosts the Github Pages website for the paper "How (Not) to Prevent Your LLM from Helping Someone Make a Bomb".

## Development instructions
The website is built using SvelteKit.
It is recommended you work with this project as a submodule of
[github.com/ed1d1a8d/llm-jailbreaks](https://github.com/ed1d1a8d/llm-jailbreaks).

To server the website locally, you should do the following:
1. Install node using a node version manager like [fnm](https://github.com/Schniz/fnm). We use node version v22.2.0.
1. Install dependencies with `npm install`.
2. Start the development server with `npm run dev`.

### Building
Builds and deploys are taken care of automatically by GitHub Actions.
