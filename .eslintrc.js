module.exports = {
  root: true,
  env: {
    browser: true,
    node: true
  },
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: [
    'eslint:recommended',
    'plugin:vue/recommended',
    'plugin:prettier/recommended',
    'prettier',
    'plugin:prettier/recommended'
  ],
  // 校验 .vue 文件
  plugins: ['vue', 'prettier'],
  // 自定义规则
  rules: {
    'no-console': 'off',
    'vue/max-attributes-per-line': 'off',
    'prettier/prettier': ['error']
  }
};
