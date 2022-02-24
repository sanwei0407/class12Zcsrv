'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;

  // 需要curd 处理的 api

  const routers = [ 'car', 'user', 'order' ];
  const prefix = '/api';

  routers.forEach(_name => {
    const name = prefix + '/' + _name;
    // 获取单个
    router.get(`${name}/:id`, controller[_name].getOne);
    // 获取全部
    router.post(`${name}/getAll`, controller[_name].getAll);
    // 创建
    router.post(`${name}/create`, controller[_name].create);
    // 更新
    router.post(`${name}/update`, controller[_name].update);
    // 删除
    router.post(`${name}/del`, controller[_name].delete);
  });


  // 其他的api


};
