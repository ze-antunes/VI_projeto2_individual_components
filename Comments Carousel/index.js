let file = './UFO_sights.csv'
let carousel = document.querySelector(".pic-ctn");

const handleRequest = data => {
    console.log(data.length)
    for (let i = 0; i < data.length; i += 1000) {
        // let comment = document.createElement('p')
        // comment.innerHTML = data[i].comments
        // comment.classList.add('pic')
        // carousel.append(comment)
        let str = `<p class="pic" style=" animation-delay: ${i / 100}s">${data[i].comments}</p>`
        carousel.insertAdjacentHTML('beforeend', str);
    }
}

// Data Request 
d3.csv(file, d3.autoType).then(handleRequest)