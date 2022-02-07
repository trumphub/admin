import debounce from 'lodash/debounce'
import {mapGetters} from 'vuex'

export default {
    computed: mapGetters(['collapse']),
    mounted() {
        this.resizeChart = this.resizeChart || debounce(() => {
            this.chart && this.chart.resize({
                animation: {
                    duration: 100,
                    easing: 'linear'
                }
            })
        }, 500)
        window.addEventListener('resize', this.resizeChart)
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
