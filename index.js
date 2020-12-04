function getRandom(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}
for(let i=0;i<10;i++){
    console.log(getRandom(0,2))
}

