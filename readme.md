
项目创建步骤：

1、先按照官方 vue-cli（v3.0.0-beta.11） 的步骤一路走下来，注意参考：https://majing.io/posts/10000017191170， 这里会教你从一开始就配置好 css 预处理配置、单元测试、router、vuex 等。注意：运行 vue create my-project 的时候要用 windows 自带的 git bash 面板，否则不能正常的上下选择选项。

2、在根目录下新建文件 vue.config.js，然后再在里面新增自定义配置，比如对 scss 的支持，具体步骤请参考：https://github.com/vuejs/vue-cli/blob/dev/docs/css.md
但是要安装相关插件：npm install -D sass-loader node-sass，当然，如果你在最开始运行 vue-cli 的时候就已经配置好了这些就不用在这一步进行手动配置了。

3、如果是用 windows 自带的 git bash 面板安装 cnpm i，则所有命令：npm run dev/npm run test 都要用 windows 自带的 git bash 面板，否则会报错，反之如果是用 GIT BASH 面板安装 cnpm i，则所有命令都要用 GIT BASH 面板运行。

4、



修改 element.ui 的源码步骤：

1、从官网拉取代码：git clone https://github.com/ElemeFE/element.git

2、这一步很重要，要通过 yarn install 去安装依赖，所以要先安装 yarn：npm install -g yarn

3、然后针对自己要修改的组件进行修改...

4、然后就是打包：npm run dist，这一步如果报错，可以先把那两个字体文件移除，等打包完之后，再将这两个文件放到 dist 目录的相应位置

5、将打包好的这个 dist 文件夹整个替换掉我们原有项目下的 ./node_modules/element-ui/lib 文件夹，这样就可以了，生不生效全凭运气了。