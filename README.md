# ColorUI-UniAPP-Project
这是uni-app结合colorUI写的APP项目，在不断完善中

## 一、环境搭建
使用 `HBuilderX`可视化界面快速创建项目，`HBuilderX`内置处理了相关环境依赖。

- HBuilderX：内置uni-app编辑及项目模板，[下载地址](https://www.dcloud.io/hbuilderx.html)

- 微信开发者工具：调试预览工具。[下载地址](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)

## 二、创建uni-app项目
### 创建
在`HBuilderX`编辑器中点击工具栏里的`文件 -> 新建 -> 项目`：

![](https://user-gold-cdn.xitu.io/2019/9/12/16d25e465646801e?w=630&h=356&f=png&s=30544)

选择uni-app，输入项目名称，这里有很多模板，选择你所需要的。为了之后表述方便，这里先创建了`ColorUI模板`，为了方便以后引用ColorUI。然后有创建了一个`默认模板`，这个默认模板文件很少，方便以后自由开发。如下两图所示。

![](https://user-gold-cdn.xitu.io/2019/9/13/16d29c6ee89f5620?w=830&h=650&f=png&s=51931)
![](https://user-gold-cdn.xitu.io/2019/9/13/16d29c57b82d1d83?w=830&h=650&f=png&s=45216)

### 项目目录
文件 | 作用
---|---
pages.json |配置页面路由、导航条、选项卡等页面类信息
manifest.json |配置应用名称、appid、logo、版本等打包信息
App.vue |应用配置，用来配置App全局样式以及监听应用的生命周期
main.js|Vue初始化入口文件
static目录|存放应用引用静态资源（如图片、视频等）的地方，注意：静态资源只能存放于此
pages目录|业务页面文件存放目录
components目录|组件文件存放目录

注意：在开发过程中，当你写登录功能后，某个页面你需要经常进入并且多次修改，你每次修改都需要登录后的信息，所以就很麻烦了。你需要一直从登录开始操作，直到你到达这个界面。这时候你就可以用这个了`condition`。

**现在来介绍一下`condition`：**

**condition** 启动模式配置，仅开发期间生效，用于模拟直达页面的场景，如：小程序转发后，用户点击所打开的页面。

**属性说明：**

属性|	类型|	是否必填|	描述
---|---|---|---
current|Number|是|当前激活的模式，list节点的索引值
list|Array|是|启动模式列表

**list说明：**
属性|	类型|	是否必填|	描述
---|---|---|---
name|	String|	是|	启动模式名称
path|	String|是|	启动页面路径
query|	String|	否|	启动参数，可在页面的 onLoad 函数里获得

 在 5+App 里真机运行可直接打开配置的页面，微信开发者工具里需要手动改变编译模式，过程：微信开发工具 -> 工具 -> 编译配置 -> 找到在`condition`里配置的`name`。

 在`pages.josn`里配置`condition`，代码如下：

```
"condition": { //模式配置，仅开发期间生效
    "current": 0, //当前激活的模式（list 的索引项）
    "list": [{
             "name": "jingdian_detail", //模式名称
	     "path": "pages/jingdian_detail/jingdian_detail", //启动页面，必选
	     "query": "id=5d1483336d724301607b2c23" //启动参数，在页面的onLoad函数里面得到。
	   }
    ]
}
```

![](https://user-gold-cdn.xitu.io/2019/9/23/16d5ec340f91df47?w=979&h=453&f=png&s=284310)

## 三、引用ColorUI
有了第二步创建好的模板，我们就可以引用了。

### ColorUI的引入
 首先复制一下`ColorUI`项目目录下的`colorui`目录，然后粘贴到`demo`项目的根目录下，与`pages`目录同级。


![](https://user-gold-cdn.xitu.io/2019/9/13/16d29f99068ca72e?w=242&h=406&f=png&s=11347)

## 详情请看 https://juejin.im/post/5d7a53f0f265da03b9502214
