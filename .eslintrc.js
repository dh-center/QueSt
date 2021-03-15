module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: [ '@typescript-eslint' ],
  extends: [
    '@react-native-community',
    'codex/ts',
  ],
  rules: {
    'prettier/prettier': 'off',
    'react-hooks/exhaustive-deps': 'off',
    'eslint-comments/no-unlimited-disable': 'off',
    'no-use-before-define': 'off',
    '@typescript-eslint/no-use-before-define': 'off',
    '@typescript-eslint/no-magic-numbers': 'off',
  },
};
