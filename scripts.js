// Função para obter a lista existente do servidor via requisição GET
const getList = async () => {
  let url = 'https://fakestoreapi.com/products';
  fetch(url, {
    method: 'get',
  })
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      data.forEach(item => insertCard(item))
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Chamada da função para carregamento inicial dos dados
getList()

// Função para inserir items na lista apresentada
const insertCard = (product) => {
  var section = document.getElementById('products-list');
  let article = document.createElement('article');
  article.setAttribute('class', 'product');
  article.setAttribute('id', product.id);

  let img = document.createElement('img');
  img.setAttribute('src', product.image);
  img.setAttribute('alt', 'Não foi possível carregar a imagem do produto');

  let h3 = document.createElement('h3');
  h3.setAttribute('class', 'price-product');
  let span = document.createElement('span');
  span.innerHTML = 'R$ ' + product.price;
  h3.appendChild(span);

  let p = document.createElement('p');
  p.setAttribute('class', 'name-product');
  p.innerHTML = product.title;

  let button = document.createElement('button');
  button.setAttribute('class', 'buy-product');
  button.setAttribute('type', 'button');
  button.setAttribute('id', product.id);
  button.innerHTML = 'Comprar';

  article.appendChild(img);
  article.appendChild(h3);
  article.appendChild(p);
  article.appendChild(button);
  section.appendChild(article);
}

// Função para inserir items no banco de dados
const insertIntoDatabase = (product) => {
  // Configurar a conexão com o banco de dados
  const connection = sqlite.createConnection({
    host: 'http://127.0.0.1:5000/product', // host do seu banco de dados
  });

  // Conectar ao banco de dados
  connection.connect((err) => {
    if (err) {
      console.error('Erro ao conectar ao banco de dados:', err);
      return;
    }
    console.log('Conexão bem-sucedida ao banco de dados sqlite');
  });
}

// Função para enviar a solicitação POST para o servidor
const postItem = async (productId) => {
  const data = {
    productId: productId,
  };

  let url = 'http://127.0.0.1:5000/product'; // Endpoint correto para a compra

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (response.status === 200) {
      const result = await response.json();
      console.log('Produto comprado com sucesso', result);
      // Aqui você pode adicionar qualquer lógica adicional, como atualizar a interface do usuário após a compra bem-sucedida.
    } else {
      console.error('Erro ao comprar o produto');
      // Aqui você pode adicionar tratamento de erro apropriado, como exibir uma mensagem de erro ao usuário.
    }
  } catch (error) {
    console.error('Erro ao enviar a solicitação POST:', error);
  }
};

// Evento de clique do botão "Comprar"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-product')) {
    const productId = e.target.id;

    // Chamar a função para comprar o produto
    postItem(productId);
  }
});


// Evento de clique do botão "Comprar"
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('buy-product')) {
    const productId = e.target.id;

    // Chamar a função para comprar o produto
    postItem(productId);
  }
});
