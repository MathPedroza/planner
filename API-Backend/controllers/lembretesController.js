exports.getLembretes = (req, res) => {
    res.send('Resposta do GET no exemploController');
  };
  
  exports.postLembretes = (req, res) => {
    const data = req.body;
    res.send(`Dados recebidos no POST: ${JSON.stringify(data)}`);
  };