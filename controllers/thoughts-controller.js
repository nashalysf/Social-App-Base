const { Thoughts } = require('../models');

const thoughtsController = {
    getAllThoughts(req, res) {
        Thoughts.find({})
          .then(dbThoughtsData => res.json(dbThoughtsData))
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      // get one Thoughts by id GET
      getThoughtsById({ params }, res) {
        Thoughts.findOne({ _id: params.id })
          .then(dbThoughtsData => {
            // If no Thoughts is found, send 404
            if (!dbThoughtsData) {
              res.status(404).json({ message: 'No thoughts found with this id!' });
              return;
            }
            res.json(dbThoughtsData);
          })
          .catch(err => {
            console.log(err);
            res.status(400).json(err);
          });
      },
    
      //create Thoughts POST
          createThoughts({ body }, res) {
            Thoughts.create(body)
              .then(dbThoughtsData => res.json(dbThoughtsData))
              .catch(err => res.status(400).json(err));
          },
  
      //PUT by id
          updateThoughts({ params, body }, res) {
            Thoughts.findOneAndUpdate({ _id: params.id }, body, { new: true })
              .then(dbThoughtsData => {
                  if (!dbThoughtsData) {
                  res.status(404).json({ message: 'No Thoughts found with this id!' });
                  return;
                  }
                  res.json(dbThoughtsData);
              })
              .catch(err => res.status(400).json(err));
          },
  
      //DELETE by id
          deleteThoughts({ params }, res) {
            Thoughts.findOneAndDelete({ _id: params.id })
              .then(dbThoughtsData => {
                  if (!dbThoughtsData) {
                  res.status(404).json({ message: 'No thoughts found with this id!' });
                  return;
                  }
                  res.json(dbThoughtsData);
              })
              .catch(err => res.status(400).json(err));
          }
};

module.exports = thoughtsController;