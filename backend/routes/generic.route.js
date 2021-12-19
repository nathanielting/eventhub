const express = require('express');
const genericRoute = express.Router();
const modelRoute = express.Router();
let models = []
// generic model module
let genericModel = require('../models/Model');

let model_to_schema_agg = [
                            {
                              '$project': {
                                'name': 1,
                                'model_schema': {
                                  '$map': {
                                    'input': '$model_schema',
                                    'as': 'model_key',
                                    'in': {
                                      'k': '$$model_key.name',
                                      'v': {
                                        'type': '$$model_key.type'
                                      }
                                    }
                                  }
                                }
                              }
                            },
                            {
                              '$addFields': {
                                'schema': {
                                  '$arrayToObject': '$model_schema'
                                }
                              }
                            },
                            {
                              '$project': {
                                'name': 1,
                                'schema': 1
                              }
                            }
                          ]

function populateRoutes() {
  // add get function for all models
  // /model/
  genericRoute.route('/').get((req, res) => {
      genericModel.model.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  })
  genericRoute.route('/create').post((req, res, next) => {
    // console.log(req.body)
    genericModel.model.create(req.body, (error, data) => {
      if (error) {
        return next(error)
      } else {
        res.json(data)
      }
    })
  });
  genericRoute.route('/edit/:id').get((req, res) => {
      genericModel.model.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
  })
  genericRoute.route('/update/:id').post((req, res, next) => {
    console.log(req.body)
    genericModel.model.findByIdAndUpdate(req.params.id, {
      $set: req.body
    },{
      strict: false
    }, (error, data) => {
      console.log(data)
      if (error) {
        return next(error);
      } else {
        res.json(data)
      }
    })
  })
  genericRoute.route('/delete/:id').delete((req, res, next) => {
    genericModel.model.findByIdAndRemove(req.params.id, (error, data) => {
      if (error) {
        return next(error);
      } else {
        res.status(200).json({
          msg: data
        })
      }
    })
  })
  for (var i = models.length - 1; i >= 0; i--) {
    let baseroute = '/'+models[i].collection.name+'/'
    let targetmodel = models[i]

    // /model/<model-name>
    genericRoute.route(baseroute).get((req, res) => {
      genericModel.model.find({ name: targetmodel.collection.name }, (error, data) =>{
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    })

    // /<model-name>/
    modelRoute.route(baseroute).get((req, res) => {
        targetmodel.find((error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    })

    // /<model-name>/create
    modelRoute.route(baseroute + 'create').post((req, res, next) => {
      console.log(req.body)
      targetmodel.create(req.body, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    });

    // /<model-name>/edit/:id
    modelRoute.route(baseroute + 'edit/:id').get((req, res) => {
      // console.log(req.body)
      targetmodel.findById(req.params.id, (error, data) => {
        if (error) {
          return next(error)
        } else {
          res.json(data)
        }
      })
    })

    // /<model-name>/update/:id
    modelRoute.route(baseroute + 'update/:id').post((req, res, next) => {
      console.log(targetmodel.collection.name)
      console.log(req.body)
      targetmodel.findByIdAndUpdate(req.params.id, {
        $set: req.body
      },{
        strict: false
      }, (error, data) => {
        console.log(data)
        if (error) {
          return next(error);
        } else {
          res.json(data)
        }
      })
    })

    // /<model-name>/delete/:id
    modelRoute.route(baseroute + 'delete/:id').delete((req, res, next) => {
      targetmodel.findByIdAndRemove(req.params.id, (error, data) => {
        if (error) {
          return next(error);
        } else {
          res.status(200).json({
            msg: data
          })
        }
      })
    })
  }
}

let modelPromise = new Promise(function(resolve, reject) {
  genericModel.model.aggregate(model_to_schema_agg).exec((error, data) => {
    if (error) {
      reject(next(error))
    } else {
      // create individual models for each document found
      for (var i = data.length - 1; i >= 0; i--) {
        // console.log(data[i]['model_schema'])
        models.push(genericModel.createModel(data[i]))
      }
      // populate routes for each model
      populateRoutes()
      // pass back router object
      resolve({genericAPI: genericRoute, modelAPI: modelRoute})
    }
  })
})

module.exports = modelPromise