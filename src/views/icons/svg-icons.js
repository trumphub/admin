const context = require.context('../../icons/svg', false, /\.svg$/)

export default context.keys().map((item, index) => {
    const iconName = item.match(/\.\/(.*)\.svg/)[1]
    return {
        id: index,
        iconName,
        tooltip: `<svg-icon icon-class="${iconName}" />`
    }
})
