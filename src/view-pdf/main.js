(() => {
    const $ = id => document.getElementById(id)

    const Debounce = (callback, time) => {
        let timeoutId
        return function () {
            if (timeoutId) {
                clearTimeout(timeoutId)
            }
            const context = this
            const args = arguments
            timeoutId = setTimeout(() => {
                callback.apply(context, args)
            }, time)
        }
    }
    
    const rangeWidth = $('width')
    const rangeHeight = $('height')
    const filter = $('filter')
    const filterSwitch = $('filter__switch');
    
    filterSwitch.onclick = () => {
        filter.classList.toggle('filter--active')
        rangeWidth.classList.toggle('filter__size--active')
        rangeHeight.classList.toggle('filter__size--active')
    }
    
    const generateClipPath = (rangeWidth = 50, rangeHeight = 50) => {
        return `polygon(0% 0%, 0% 100%,
            ${rangeWidth / 2}% 100%, 
            ${rangeWidth / 2}% ${rangeHeight / 2}%, 
            ${100 - (rangeWidth / 2)}% ${rangeHeight / 2}%,
            ${100 - (rangeWidth / 2)}% ${100 - (rangeHeight / 2)}%,
            ${rangeWidth / 2}% ${100 - (rangeHeight / 2)}%,
            ${rangeWidth / 2}% 100%,
            100% 100%, 100% 0%)`
    }
    
    (() => {
        dataFilter = JSON.parse(window.localStorage.getItem('data-filter'))
        buildFilter(dataFilter?.width, dataFilter?.height)
    })()
    
    function buildFilter(width = 30, height = 80) {
        filter.style.clipPath = generateClipPath(width, height)
        rangeWidth.value = width
        rangeHeight.value = height
    }
    
    const RANGES = {
        WIDTH: 'WIDTH',
        HEIGHT: 'HEIGHT',
    }
    
    rangeWidth.addEventListener('input', (e) => changeSize(RANGES.WIDTH, e.target.value))
    rangeHeight.addEventListener('input', (e) => changeSize(RANGES.HEIGHT, e.target.value))
    
    let saveDebounce = Debounce(save, 1000)
    function changeSize(by, range) {
        if (by === RANGES.WIDTH) {
            const height = rangeHeight.value
            filter.style.clipPath = generateClipPath(range, height)
            saveDebounce(range, height)
        }
        if (by === RANGES.HEIGHT) {
            const width = rangeWidth.value
            filter.style.clipPath = generateClipPath(width, range)
            saveDebounce(width, range)
        }
    }
    
    function save(rangeWidth = 50, rangeHeight = 50) {
        window.localStorage.setItem('data-filter', JSON.stringify({ width: rangeWidth, height: rangeHeight }))
    }
})()

