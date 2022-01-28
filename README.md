### 搭建基本环境

```shell script
vue create admin

npm i js-cookie

npm install --save normalize.css

npm i element-ui -S

https://github.com/webpack-contrib/sass-loader/releases/tag/v11.0.0
npm install sass-loader@10.1.1
npm install node-sass
npm install sass-resources-loader

npm install svg-sprite-loader -D
```

### 路由器

```shell script
npm install vue-router
```

### vuex

```shell script
npm install vuex --save
```

### axios

```shell script
npm install axios
```

### mock

```shell script
npm install mockjs
```

### 动态主题

#### 定义主题

```scss
// 亮
$light-theme: (
    background-color:#fff,
    border-color:#008080,
    color:#333
);

// 暗
$dark-theme: (
    background-color:#ccc,
    border-color:#545c64,
    color:#ccc
);

// 所有主题
$themes: (
    light-theme:$light-theme,
    dark-theme:$dark-theme
);

// 生成主题
@mixin theme($key) {
  @each $themeName, $theme in $themes {
    [data-theme = #{$themeName}] & {
      #{$key}: map_get($theme, $key);
    }
  }
}
```

#### 使用主题

```scss
.nav {
    @include theme(border-color);
    @include theme(background-color);
    @include theme(color);
}
```
```vue
<div id="app" :data-theme="theme">
    <router-view/>
</div>
```

#### 切换主题

```javascript
function changeTheme(val) {
    const theme = val ? 'light-theme' : 'dark-theme'
    this.$store.commit('app/SET_THEME', theme)
}
```
