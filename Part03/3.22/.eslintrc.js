module.exports = {
    'env': {
        'commonjs': true,
        'es2021': true,
        'node': true    
    },
    'extends': 'eslint:recommended',
    'parserOptions': {
        'ecmaVersion': 'latest'
    },
    "rules": {
        'quotes': 'off',
        'semi': [
            'error',
            'never'
        ],
        'eqeqeq': 'error',
        'no-trailing-spaces': 'error',
        'object-curly-spacing': [
            'error', 'always'
        ],
        'arrow-spacing': [
            'error', { 'before': true, 'after': true }
        ],
        'no-console': 0,
        'no-unused-vars': 0,
        'linebreak-style': 0,
        'object-curly-spacing': 0,
        'no-trailing-spaces':0,
        'no-dupe-keys':0
    },
}
