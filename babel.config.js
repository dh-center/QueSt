module.exports = {
  presets: [ 'module:metro-react-native-babel-preset' ],
  plugins: [
    ['relay', { schema: 'schema.graphql' } ],
    ['module:react-native-dotenv', {
      moduleName: '@env',
      path: '.env',
      blacklist: null,
      whitelist: null,
      safe: false,
      allowUndefined: true,
    } ],
  ],
};
