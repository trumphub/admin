let isMoving = false
let interval = null

export function scrollTo(to, duration) {
    if (isMoving) {
        return
    }
    isMoving = true
    // 获取元素
    const containerEl = document.getElementsByClassName('main')[0]
    // top 值
    let scrollTop = containerEl.scrollTop
    interval && clearInterval(interval)
    interval = setInterval(() => {
        // step
        let step = Math.ceil(scrollTop / 10)
        // to position
        scrollTop -= step
        if (scrollTop <= to) {
            scrollTop = to
        }
        containerEl.scrollTo(0, scrollTop)
        if (scrollTop === to) {
            clearInterval(interval)
            interval = null
            isMoving = false
        }
    }, duration / 60)
}
