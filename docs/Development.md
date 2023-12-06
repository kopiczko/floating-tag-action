# Development

To update dependencies and update `./dist`:

```bash
alias yarn="docker run -it --rm --name my-yarn-project -v '${PWD}:/usr/src/app:Z' -w /usr/src/app node:20 yarn"

yarn install
yarn lint
yarn dist
```
