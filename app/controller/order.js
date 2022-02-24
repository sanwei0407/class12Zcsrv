'use strict';

const Controller = require('egg').Controller;

class orderController extends Controller {

  async create() {
    const { ctx } = this;
    const { uid, startDate, endDate, fee, yj, linkPhone, linkMan, carId } = ctx.request.body;

    ctx.validate({
      uid: { type: 'number', required: true },
      startDate: { type: 'number', required: true },
      endDate: { type: 'number', required: true },
      fee: { type: 'number', required: true },
      yj: { type: 'number', required: true },
      linkPhone: { type: 'string', required: true },
      linkMan: { type: 'string', required: true },
      carId: { type: 'number', required: true },
    }, ctx.request.body);

    await ctx.model.Order.create({
      ...ctx.request.body,
    });

    ctx.body = { success: true, info: '添加成功' };


  }

  async delete() {
    const { ctx } = this;
    const { id } = ctx.request.body;
    if (!id) return ctx.body = { success: false, info: '缺少必要参数' };

    await ctx.model.Order.destroy({
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


    await ctx.model.Order.update(updateData, {
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
    const res = await ctx.model.Order.findByPk(id);
    ctx.body = { success: true, data: res };
  }

  async getAll() {
    const { ctx, app } = this;
    const { Op } = app.Sequelize;
    const { page = 1, limit = 30, username, phone, oid, sdate, edate } = ctx.request.body;
    const offset = (page - 1) * limit;
    const where = {};

    if (username || phone) {
      const _u = await ctx.model.User.findAll({
        where: {
          [Op.or]: [
            { username },
            { phone },
          ],
        },
        attributes: [ 'uid' ],
      });
      where.uid = {
        [Op.in]: _u.map(item => item.uid),
      };
    }
    const fmSdate = sdate ? new Date(sdate) : null;
    const fmEdate = edate ? new Date(edate) : null;

    if (fmSdate && !fmEdate) where.startDate = { [Op.gte]: fmSdate };
    if (!fmSdate && fmEdate) where.startDate = { [Op.lte]: fmEdate };
    if (fmSdate && fmEdate)where.startDate = { [Op.between]: [ fmSdate, fmEdate ] };

    if (oid) where.oid = oid;


    const res = await ctx.model.Order.findAndCountAll({
      where,
      limit,
      offset,
    });

    ctx.body = { success: true, data: res };
  }


}

module.exports = orderController;
