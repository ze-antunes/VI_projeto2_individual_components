let file = './UFO_sights.csv'
let carousel = document.querySelector(".pic-ctn");
let i = 0

const test = (start, end) => {
    const handleRequest = data => {
        console.log(data)

        carousel.innerHTML = '';

        for (let i = 0; i < data.length; i++) {
            console.log(i, `<p class="pic" style=" animation-delay: ${i * 10}s">${data[i].comments}</p>`)
            let str = `<p class="pic" style=" animation-delay: ${i * 10}s">${data[i].comments}</p>`
            carousel.insertAdjacentHTML('beforeend', str);
        }
    }

    // Data Request 
    d3.csv(file, d3.autoType, (d, i) => {
        if (i < end && i >= start) return d
    }).then(handleRequest)
}

const foo = () => {
    if (i * 10 + 10 > 80330) {
        i = 0;
        test(i * 10, i * 10 + 10)
        i++
    } else {
        test(i * 10, i * 10 + 10)
        i++
    }
    setTimeout(foo, 100000);
}

foo();