#本页面的结构:
-UserInfoContainer:页面根堆栈,作为底部导航条的子页面。初始页面总为UserInfoMain。
-UserInfoMain:用户信息主页面
  -按下绑定邮箱进行初次绑定或者编辑,跳转到UserBindMail界面
  -按下绑定手机进行初次绑定或者编辑,跳转到UserBindPhone界面
  -上次登陆时间：只进行展示，不跳转
  -退出登录：只弹出确认框，不跳转
  -已添加的节点数：只进行展示，不跳转
  -通知方式设置：开启或关闭邮箱、短信或应用三种方式的通知

-UserBindMail:用户绑定邮箱界面
-UserBindPhone:用户绑定手机界面

#组件components
-UserNameDisplay:
  --展示用户名
-UserOptionsButton:
  --用户各种操作的按钮
  --属性:
    --pressEvent:按下后触发的函数
    --fixedText:固定展示的文字
