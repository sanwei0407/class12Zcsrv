'use strict';

const Controller = require('egg').Controller;
const util = require('utility');

class carController extends Controller {

  async create() {
    const { ctx } = this;
    const { pwd, phone } = ctx.request.body;

    ctx.validate({
      pwd: { type: 'string', required: true },
      phone: { type: 'string', required: true },
    }, ctx.request.body);

    const u = await ctx.model.User.findOne({
      where: {
        phone,
      },
    });

    // 如果用户就走登录流程
    if (u) {

      const curpwd = util.md5(pwd + u.createdAt.getTime());
      if (curpwd === u.pwd) return ctx.body = { sucess: true, info: '登录成功' };
      ctx.body = { sucess: false, info: '登录失败' };

    } else {

      const newUser = await ctx.model.User.create({
        phone,
      });
      await newUser.update({
        pwd: util.md5(pwd + newUser.createdAt.getTime()),
      });

      ctx.body = { sucess: true, info: '登录成功' };

    }


  }

  async delete() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '缺少必要参数' };

    await ctx.model.User.destroy({
      where: {
        uid,
      },
    });

    ctx.body = { success: true, info: '删除成功' };
  }

  async update() {
    const { ctx } = this;
    const { uid } = ctx.request.body;
    if (!uid) return ctx.body = { success: false, info: '缺少必要参数' };
    const updateData = {};

    // if (name) updateData.name = name;
    // if (brand) updateData.brand = brand;
    // if (type) updateData.type = type;
    // if (pic) updateData.pic = pic;
    // if (color) updateData.color = color;
    // if (pl) updateData.pl = pl;

    for (const key in ctx.request.body) {
      const _val = ctx.request.body[key];
      if (_val) updateData[key] = _val;
    }


    await ctx.model.User.update(updateData, {
      where: {
        uid,
      },
    });

    ctx.body = { success: true, info: '修改成功' };

  }

  async getOne() {
    const { ctx } = this;
    const { uid } = ctx.params;
    if (!uid) return ctx.body = { success: false, info: '缺少必要参数' };
    const res = await ctx.model.User.findByPk(uid, {
      attributes: {
        exclude: [ 'pwd' ],
      },
    });
    ctx.body = { success: true, data: res };
  }

  async getAll() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page = 1, limit = 30, username, phone } = ctx.request.body;
    const offset = (page - 1) * limit;
    const where = {};
    if (username) where.username = { [Op.like]: username + '%' };
    if (phone) where.phone = { [Op.like]: phone + '%' };

    const res = await ctx.model.User.findAndCountAll({
      where,
      limit,
      offset,
    });

    ctx.body = { success: true, data: res };
  }


}

module.exports = carController;
