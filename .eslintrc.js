module.exports = {
    "extends": "airbnb",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "no-underscore-dangle": ["error", { "allowAfterThis": true }],
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "arrow-body-style": ["error", "always"],
    }
};