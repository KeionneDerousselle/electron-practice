module.exports = function countdown(setCount){
    let count = 3;

    let timer = setInterval(() => {
        setCount(count--);

        if(count == -1){
            clearInterval(timer);
        }
    }, 1000);
}