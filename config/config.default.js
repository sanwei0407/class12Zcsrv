/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1644668453257_3836';

  // add your middleware config here

  // 加载 errorHandler 中间件
  config.middleware = [ 'errorHandler' ];

  // 只对 /api 前缀的 url 路径生效
  config.errorHandler = {
    match: '/api',
  };

  // 图片上传
  config.oss = {
    client: {
      accessKeyId: 'LTAI4G4YMUZnnaKcSZTSvb8Q', // 阿里云账号
      accessKeySecret: 'FaCRX0mW5arsRdgBBNM053kX3l9sRu',
      bucket: 'img1775',
      endpoint: 'oss-cn-shenzhen.aliyuncs.com',
      timeout: '80s',
    },
  };

  // 启用Flie文件模式
  config.multipart = {
    mode: 'file',
    fileExtensions: [ '.pdf', 'doc', 'docx', 'pptx', 'xls', 'xlsx', 'epub', 'apk' ], // 增加对 apk 扩展名的文件支持
    fileSize: '500mb',
  };

  // 配置数据库
  config.sequelize = {
    dialect: 'mysql', // 数据库类型
    database: 'zc', // 数据库名
    host: '45.195.159.207',
    port: 3306,
    username: 'zc',
    password: 'y8dzijmCikww4HEA',
    define: {
      underscored: false, // 禁止把下划线做间隔的表明转变成驼峰
      freezeTableName: true, // 冻结表名 意思是 sequelize会自动把表名添加负数，所以需要冻结避免被修改
      timestamps: true,
    },
  };

  config.cors = {
    origin: '*',
    allowMethods: 'GET,HEAD,OPTIONS,PUT,POST,DELETE,PATCH',
  };
  // 关闭 csrf跨域
  config.security = {
    csrf: {
      enable: false,
    },
  };

  config.mp = {
    appId: 'wxa9f150b39e5d45e7', // 公众平台应用编号
    appSecret: '3acdadfebde54efe0df3d749cdf0bc49', // 公众平台应用密钥
    mchId: '', // 商户平台商家编号
    apiKey: '', // 商户支付密钥
    notifyUrl: '', // 支付结果回调地址
  };


  return {
    ...config,
  };
};
