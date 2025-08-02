const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

// GET all vocab
exports.list_all_words = (req, res) => {
  Vocab.find({}, (err, words) => {
    if (err) return res.send(err);
    res.json(words);
  });
};

// POST new vocab
exports.create_a_word = (req, res) => {
  const newWord = new Vocab(req.body);
  newWord.save((err, word) => {
    if (err) return res.send(err);
    res.json(word);
  });
};

// GET one vocab by ID
exports.read_a_word = (req, res) => {
  Vocab.findById(req.params.wordId, (err, word) => {
    if (err) return res.send(err);
    res.json(word);
  });
};

// PUT update vocab
exports.update_a_word = (req, res) => {
  Vocab.findOneAndUpdate(
    { _id: req.params.wordId },
    req.body,
    { new: true },
    (err, word) => {
      if (err) return res.send(err);
      res.json(word);
    }
  );
};

// DELETE vocab
exports.delete_a_word = (req, res) => {
  Vocab.deleteOne({ _id: req.params.wordId }, (err) => {
    if (err) return res.send(err);
    res.json({
      message: 'Word successfully deleted',
      _id: req.params.wordId
    });
  });
};
