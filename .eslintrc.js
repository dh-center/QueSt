module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  extends: [
    '@react-native-community',
    'codex'
  ],
  rules: {
    'prettier/prettier': 'off',
    'eslint-comments/no-unlimited-disable': 'off'
  }
};
