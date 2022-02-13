import Vue from "vue";
import Clipboard from "clipboard";

export default function (text, event) {
    const clipboard = new Clipboard(event.target, {
        text: () => text
    })
    clipboard.on("success", () => {
        Vue.prototype.$message({
            message: 'Copy successfully',
            type: 'success',
            duration: 1500
        })
        clipboard.destroy()
    })
    clipboard.on("error", () => {
        Vue.prototype.$message({
            message: 'Copy failed',
            type: 'error'
        })
        clipboard.destroy()
    })
    clipboard.onClick(event)
}
