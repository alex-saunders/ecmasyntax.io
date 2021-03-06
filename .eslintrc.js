module.exports = {
    "extends": "airbnb",
    "parser": "babel-eslint",
    "plugins": [
        "react",
        "jsx-a11y",
        "import"
    ],
    "rules": {
        "no-underscore-dangle": "off",
        "linebreak-style": "off",
        "react/forbid-prop-types": "off",
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "arrow-body-style": ["error", "always"],
    },
    "globals": {
        "document": true,
        "location": true,
        "window": true,
    },
    "env": {
        "browser": true,
        "node": true,
        "serviceworker": true,
    },
};