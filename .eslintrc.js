module.exports = {
    "extends": "google",
    "parserOptions": {
        "ecmaVersion": 8
    },
    "rules": {
        "object-curly-spacing": "off",
        "no-tabs": 0,
        "guard-for-in": 0,
        "max-len": ["error", { "code": 100, "ignoreComments": true }],
        "require-jsdoc": "off",
        "quotes": [2, "double", { "avoidEscape": true, "allowTemplateLiterals": true }],
        "space-before-function-paren": 0,
        "camelcase": 'off',
    }
};