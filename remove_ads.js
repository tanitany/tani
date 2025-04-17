let url = $request.url;
let obj = JSON.parse($response.body);

// 屏蔽启动页广告配置
if (url.includes("inhouse")) {
  if (obj.data) {
    obj.data.splash = null;
    obj.data.advert_list = [];
    obj.data.banner = [];
  }
}

// 屏蔽初始化中的广告字段
if (url.includes("getinfo")) {
  if (obj.data && obj.data.advertisement) {
    obj.data.advertisement = {};
  }
}

// 去除推荐视频中的广告内容
if (url.includes("specialTopic")) {
  if (obj.data && obj.data.list) {
    obj.data.list = obj.data.list.filter(item => !item.is_ad);
  }
}

$done({ body: JSON.stringify(obj) });
