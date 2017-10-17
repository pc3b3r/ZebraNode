const { exec } = require('child_process')

const fs = require('fs'),
      express = require('express'),
      app = express(),
      cors = require('cors')

app.options()
app.post('/print/:printer/:id', (req, res) => {

  const userInfo = req.body.userInfo;
  const text = `\n------\n> ${userInfo.nome}\n> ${userInfo.stanza} \n> ${userInfo.ristoro}\n-----\n`

  const printer = req.params.printer === '1' ? '-P Zebra-TLP2844' : ''
  fs.writeFile(`./text/${req.params.id}.txt`, text, function(err) {
      if(err) {
          return console.log(err)
      }
      exec(`lpr ${printer} ./text/${req.params.id}.txt`, (err, stdout, stderr) => {
        if (err) {
          // node couldn't execute the command
          return;
        }
      });
  });
  res.send(req.params);
});

app.listen(3000, function () {
  console.log('Zebra Print Server running on port 3000!');
});
