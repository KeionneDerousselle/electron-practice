let timer;

module.exports = element => {
    if(element.classList.contains('is-flashing'))
    {
        element.classList.remove('is-flashing')
    }

    clearTimeout(timer);
    element.classList.add('is-flashing');

    timer = setTimeout(()=>{
        element.classList.remove('is-flashing');
    }, 2000);
}