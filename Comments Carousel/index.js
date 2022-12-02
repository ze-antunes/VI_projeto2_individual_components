let file = './UFO_sights.csv'
let carousel = document.querySelector(".pic-ctn");

const test = (start, end) => {
    const handleRequest = data => {
        console.log(data)
        for (let i = 0; i < data.length; i++) {
            console.log(i, `<p class="pic" style=" animation-delay: ${i * 10}s">${data[i].comments}</p>`)
            // let comment = document.createElement('p')
            // comment.innerHTML = data[i].comments
            // comment.classList.add('pic')
            // carousel.append(comment)
            let str = `<p class="pic" style=" animation-delay: ${i * 10}s">${data[i].comments}</p>`
            carousel.insertAdjacentHTML('beforeend', str);
        }
        setTimeout(() => {
            // carousel.removeChild(carousel.lastChild);
            console.log("ola")*10
        }, 100000);

        // setTimeout(function () {
        //     setInterval(() => {
        //         let elem = document.querySelector('.pic')
        //         console.log(elem)
        //         let state = window.getComputedStyle(elem)
        //         console.log(state.animationPlayState)
        //     }, 1000)
        // }, 4000);
    }

    // Data Request 
    d3.csv(file, d3.autoType, (d, i) => {
        // console.log(e, `, `, i)

        if (i < end && i >= start) return d
    }).then(handleRequest)
}

let i = 0

function foo() {
    console.log(i * 10, i * 10 + 10)
    test(i * 10, i * 10 + 10)
    i++
    setTimeout(foo, 100000);
}

foo();