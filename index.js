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
          switch (value) {
            case "1":
              obj[el.field[i].name[0]] = true
              break
            case "0":
              obj[el.field[i].name[0]] = false
              break
            default:
              obj[el.field[i].name[0]] = value
          }
        }
        obj.created = new Date(obj.created)
        obj.starts = new Date(obj.starts)
        obj.id = parseInt(obj.id)
        obj.user_id = parseInt(obj.user_id)
        if (obj.registration_starts) obj.registration_starts = new Date(obj.registration_starts)
        if (obj.registration_ends) obj.registration_ends = new Date(obj.registration_ends)
        if (obj.cancellation_starts) obj.cancellation_starts = new Date(obj.cancellation_starts)
        if (obj.cancellation_ends) obj.cancellation_ends = new Date(obj.cancellation_ends)
        return obj
      }))
    })
  })
}
