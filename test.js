var test = require('tape')
var jenks = require('./')
var fs = require('fs')

test('jenks', function(t){
  var points = JSON.parse(fs.readFileSync(__dirname+'/geojson/Points.geojson'))

  var jenked = jenks(points, 'elevation', 5)

  t.ok(jenked, 'should take a set of points and an array of percentiles and return a list of jenks breaks')
  t.equal(jenked.length, 6)

  t.end()
})



var t = require('../index'),
    should = require('should')

describe('reclass', function(){
  it('should take a feature collection and an array of translations and return a new featurecollection reclassed', function(done){
    var inField = 'elevation',
        outField = 'heightIndex',
        translations = [[0, 20, 1], [20, 40, 2], [40, 60 , 3], [60, Infinity, 4]]

    t.load(__dirname+'/testIn/Points3.geojson', function(err, pts){
      if(err) throw err
      pts.should.be.ok
      var syncOutPts = t.reclass(pts, inField, outField, translations, function(err, outPts){
        if(err) throw err
        outPts.should.be.ok
        outPts.features[0].geometry.type.should.equal('Point')
        t.save(__dirname+'/testOut/reclassed.geojson', outPts, 'geojson', function(){})
      })

      if (typeof syncOutPts === 'Error') {
        throw syncOutPts;
      }

      syncOutPts.should.be.ok;
      syncOutPts.features[0].geometry.type.should.equal('Point');

      done();
    })
  })
})