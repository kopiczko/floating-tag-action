module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        "ecmaVersion": 8
    },
    plugins: [
        '@typescript-eslint',
    ],
    extends: [
        'eslint:recommended',
        'plugin:@typescript-eslint/recommended',
    ],
    env: {
        "node": true,
        "es6": true,
    },
}
