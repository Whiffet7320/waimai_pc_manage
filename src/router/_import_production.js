// module.exports = file => () => import('@' + file + '.vue')
module.exports = file => require('@' + file + '.vue').default 