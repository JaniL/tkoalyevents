var parseString = require('xml2js').parseString;
var request = require('request')

var XML_URL = 'https://members.tko-aly.fi/externals/browseCalendar/'

module.exports = function(cb) {
  request(XML_URL, (err, res) => {
    parseString(res.body, (err, res) => {
      cb(res.response.array[0].event.map(el => {
        var obj = {}
        for (var i = 0; i < el.field.length; i++) {
          if (el.field[i].value[0] && el.field[i].value[0] !== '') {
            var value = el.field[i].value[0]
          } else {
            var value = null
          }
          obj[el.field[i].name[0]] = value
        }
        return obj
      }))
    })
  })
}
