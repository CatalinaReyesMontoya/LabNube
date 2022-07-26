const controller = {};

controller.list = (req, res) => {
  req.getConnection((err, conn) => {
    conn.query('SELECT * FROM products', (err, products) => {
     if (err) {
      res.json(err);
     }
     res.render('products', {
        data: products
     });
    });
  });
};

controller.save = (req, res) => {
    const data = req.body;
    console.log(req.body)
    req.getConnection((err, connection) => {
      const query = connection.query('INSERT INTO products set ?', [data], (err, products) => {
        console.log(err)
        res.redirect('/');
      })
    })
  };
  
  controller.edit = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, conn) => {
      conn.query("SELECT * FROM products WHERE id = ?", [id], (err, rows) => {
        res.render('products_edit', {
          data: rows[0]
        })
      });
    });
  };
  
  controller.update = (req, res) => {
    const { id } = req.params;
    const newproducts = req.body;
    req.getConnection((err, conn) => {
  
    conn.query('UPDATE products set ? where id = ?', [newproducts, id], (err, rows) => {
      res.redirect('/');
    });
    });
  };
  
  controller.delete = (req, res) => {
    const { id } = req.params;
    req.getConnection((err, connection) => {
      connection.query('DELETE FROM products WHERE id = ?', [id], (err, rows) => {
        res.redirect('/');
      });
    });
  }


module.exports = controller;
