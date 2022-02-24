'use strict';

const Controller = require('egg').Controller;

class carController extends Controller {

  async create() {
    const { ctx } = this;
    const { name, brand, type, pic, color, pl } = ctx.request.body;

    // ctx.validate({
    //   name: { type: 'string', required: true },
    //   brand: { type: 'string', required: true },
    //   type: { type: 'string', required: false },
    //   pic: { type: 'string', required: false },
    //   color: { type: 'string', required: true },
    //   pl: { type: 'string', required: true },
    // }, ctx.request.body);

    await ctx.model.Car.create({
      ...ctx.request.body,
    });

    ctx.body = { success: true, info: '添加成功' };


  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '缺少必要参数' };

    await ctx.model.Car.destroy({
      where: {
        id,
      },
    });

    ctx.body = { success: true, info: '删除成功' };
  }

  async update() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '缺少必要参数' };
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


    await ctx.model.Car.update(updateData, {
      where: {
        id,
      },
    });

    ctx.body = { success: true, info: '修改成功' };

  }

  async getOne() {
    const { ctx } = this;
    const { id } = ctx.params;
    if (!id) return ctx.body = { success: false, info: '缺少必要参数' };
    const res = await ctx.model.Car.findByPk(id);
    ctx.body = { success: true, data: res };
  }

  async getAll() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page = 1, limit = 30, name, brand } = ctx.request.body;
    const offset = (page - 1) * limit;
    const where = {};
    if (name) where.name = { [Op.like]: name + '%' };
    if (brand) where.brand = { [Op.like]: brand + '%' };

    const res = await ctx.model.Car.findAndCountAll({
      where,
      limit,
      offset,
    });

    ctx.body = { success: true, data: res };
  }


}

module.exports = carController;
