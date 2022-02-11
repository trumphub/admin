import debounce from 'lodash/debounce'
import {mapGetters} from 'vuex'

export default {
    computed: mapGetters(['collapse']),
    data() {
        return {
            activate: false
        }
    },
    mounted() {
        this.resizeChart = this.resizeChart || debounce(() => {
            (this.chart && this.activate) && this.chart.resize({
                animation: {
                    duration: 100,
                    easing: 'linear'
                }
            })
        }, 500)
        window.addEventListener('resize', this.resizeChart)
    },
    activated() {
        this.activate = true
        this.resizeChart()
    },
    deactivated() {
        this.activate = false
    },
    beforeDestroy() {
        this.resizeChart && window.removeEventListener('resize', this.resizeChart)
        delete this.resizeChart
        this.chart && this.chart.dispose()
        this.chart = null
    },
    watch: {
        collapse() {
            this.resizeChart()
        }
    }
}
