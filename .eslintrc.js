module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: 'babel-eslint',
  env: {
    browser: true,
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx'],
      rules: {
        'react-hooks/exhaustive-deps': 'off',
      },
    },
  ],
};
