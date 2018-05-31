
项目创建步骤：

1、先按照官方 vue-cli（v3.0.0-beta.11） 的步骤一路走下来，注意参考：https://majing.io/posts/10000017191170， 这里会教你从一开始就配置好 css 预处理配置、单元测试、router、vuex 等。注意：运行 vue create my-project 的时候要用 windows 自带的 git bash 面板，否则不能正常的上下选择选项。

2、在根目录下新建文件 vue.config.js，然后再在里面新增自定义配置，比如对 scss 的支持，具体步骤请参考：https://github.com/vuejs/vue-cli/blob/dev/docs/css.md
但是要安装相关插件：npm install -D sass-loader node-sass，当然，如果你在最开始运行 vue-cli 的时候就已经配置好了这些就不用在这一步进行手动配置了。

3、如果是用 windows 自带的 git bash 面板安装 cnpm i，则所有命令：npm run dev/npm run test 都要用 windows 自带的 git bash 面板，否则会报错，反之如果是用 GIT BASH 面板安装 cnpm i，则所有命令都要用 GIT BASH 面板运行。

4、