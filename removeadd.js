// 兼容 Quantumult X 的写法
var url = $request.url;
var body = $response.body;
var obj = {};

try {
  obj = JSON.parse(body);

  // 屏蔽启动页广告配置
  if (url.indexOf("inhouse") !== -1 && obj.data) {
    obj.data.splash = null;
    obj.data.advert_list = [];
    obj.data.banner = [];
  }

  // 屏蔽初始化中的广告字段
  if (url.indexOf("getinfo") !== -1 && obj.data) {
    obj.data.advertisement = {};
  }

  // 去除推荐视频中的广告内容
  if (url.indexOf("specialTopic") !== -1 && obj.data && obj.data.list) {
    obj.data.list = obj.data.list.filter(function(item) {
      return !item.is_ad;
    });
  }

} catch (e) {
  console.log("广告脚本解析失败：" + e);
}

$done({ body: JSON.stringify(obj) });
