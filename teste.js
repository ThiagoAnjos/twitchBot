var data = new Date().toISOString().split('T');
data = data[0].split('-')
let newData = []
newData = newData.concat(data[0], data[1]).join('')
console.log(newData)
