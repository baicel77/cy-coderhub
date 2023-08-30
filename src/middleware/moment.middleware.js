const { queryLabelByName, create } = require("../service/label.service")

async function checkLabelExists(ctx, next) {
  const { label } = ctx.request.body
  /* 
    如果标签已经存在,拿到标签的id,插入到moment_label表
    如果标签不存在, 需要先将标签添加到标签表中
  */
  ctx.labels = []
  for (const item of label) {
    const data = await queryLabelByName(item)
    if (data.length) {
      // 该标签已经存在label表
      ctx.labels.push({
        id: data[0].id,
        name: item
      })
    } else {
      // 该标签不存在label表
      const data = await create(item)
      ctx.labels.push({
        id: data.insertId,
        name: item
      })
    }
  }
  await next()
}

module.exports = {
  checkLabelExists
}