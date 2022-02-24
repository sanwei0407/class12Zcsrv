const Service = require('egg').Service;
const fs = require('fs'); // 引入node的文件处理模块
const utils = require('utility'); // 引入一个工具库

class CommonService extends Service {

  // @author 777
  // @last update 2020年11月12日 16:15
  // @公共的图片上传
  // fileList文件列表  type 文件类型
  async upload(ctx, _type) {
    const file = ctx.request.files[0];
    const ext = file.filename.split('.')
      .pop(); // 得到文件后缀
    const _date = utils.YYYYMMDD('');
    const type = _type ? _type : 'common';
    const normalPath = `${type}/${_date}`; // 路径
    let newFileName = Date.now() + '.' + ext;
    try {
      // 处理文件，比如上传到云端
      console.log('do upload to the oss');
      // 如果是doc xlsx xls文件 就使用原来的文件名称
      if (ext === 'doc' || ext === 'xlsx' || ext === 'xls' || ext === 'pdf') {
        newFileName = file.filename.split(' ')
          .join('');
      }
      await ctx.oss.put(normalPath + '/' + newFileName, file.filepath);

      return { success: true, msg: 'http://static.1775.net.cn/' + normalPath + '/' + newFileName };//
    } catch (e) {
      console.log(e);
      return { success: false, msg: e };
    } finally {
      // await fs.unlinkSync(file.filepath);
    }

  }
}
module.exports = CommonService;
