# Exemplo de documentação de API
![NPM](https://img.shields.io/npm/l/react)

# API Cardápio de Páscoa
Esta API é utilizada para gerenciar um catálogo de ovos de páscoa artesanais, permitindo operações de CRUD (criar, ler, atualizar e deletar) sobre os produtos e o processamento dos pedidos da loja.

## Endpoints - Pedidos
### - GET /orders
Esse endpoint é responsável por retornar a listagem de todos os pedidos cadastrados no banco de dados.

#### Parâmetros:
Nenhum

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber a listagem de todos os pedidos.

Exemplo de resposta:

```
{
  "_id": "69daed55202befdfaf1d5e61",
  "usuarioId": {
    "_id": "69da63a707381fcd2df9709c",
    "name": "Admin Heloisa",
    "email": "admin@heloisa.com",
    "whatsapp": "13996029633"
  },
  "itens": [
    {
      "tipo": "350g",
      "personalizacao": [
        {
          "casca": "Brownie",
          "recheio": "Ferreiro Rocher",
          "_id": "69daed55202befdfaf1d5e63"
        }
      ],
      "precoUnitario": 80,
      "quantidade": 1,
      "_id": "69daed55202befdfaf1d5e62"
    }
  ],
  "total": 80,
  "status": "AGUARDANDO_APROVACAO",
  "dataRetirada": "2026-04-03T14:00:00.000Z",
  "pagamento": {
    "metodo": "pix",
    "comprovanteUrl": null,
    "sinalPago": false,
    "_id": "69daed55202befdfaf1d5e64"
  },
  "createdAt": "2026-04-12T00:54:45.466Z",
  "updatedAt": "2026-04-12T00:54:45.466Z",
  "__v": 0
},
{
  "_id": "69daee1c202befdfaf1d5e6e",
  "usuarioId": {
    "_id": "69da63a707381fcd2df9709c",
    "name": "Admin Heloisa",
    "email": "admin@heloisa.com",
    "whatsapp": "13996029633"
  },
  "itens": [
    {
      "tipo": "450g",
      "personalizacao": [
        {
          "casca": "Brownie",
          "recheio": "Ferreiro Rocher",
          "_id": "69daf0a5202befdfaf1d5e93"
        }
      ],
      "precoUnitario": 80,
      "quantidade": 1,
      "_id": "69daf0a5202befdfaf1d5e92"
    }
  ],
  "total": 80,
  "status": "AGUARDANDO_APROVACAO",
  "dataRetirada": "2026-04-03T14:00:00.000Z",
  "pagamento": {
    "metodo": "pix",
    "comprovanteUrl": null,
    "sinalPago": false,
    "_id": "69daf0a5202befdfaf1d5e94"
  },
  "createdAt": "2026-04-12T00:58:04.883Z",
  "updatedAt": "2026-04-12T01:08:53.130Z",
  "__v": 0
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor. Motivos podem incluir falhas na comunicação com o banco de dados.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

### - POST /orders
Esse endpoint é responsável por cadastrar um novo pedido no banco de dados.

#### Parâmetros:
tipo: Peso ou categoria do item (ex: 250g).<br>
personalizacao: Detalhes da casca e do recheio escolhidos.<br>
precoUnitario: Preço individual do item.<br>
quantidade: Quantidade de itens solicitados.<br>
total: Valor total do pedido.<br>
dataRetirada: Data e hora programadas para a retirada.<br>
pagamento: Informações sobre o método, comprovante e status do sinal.<br>
Exemplo de requisição:

```
{
	"usuarioId": "69da63a707381fcd2df9709c",
	"itens": [
		{
			"tipo": "250g",
			"personalizacao": [
				{
					"casca": "Brownie",
					"recheio": "Ferreiro Rocher",
					"_id": "69db01cf84304b759ecd69a5"
				}
			],
			"precoUnitario": 80,
			"quantidade": 1,
			"_id": "69db01cf84304b759ecd69a4"
		}
	],
	"total": 80,
	"status": "AGUARDANDO_APROVACAO",
	"dataRetirada": "2026-04-03T14:00:00.000Z",
	"pagamento": {
		"metodo": "pix",
		"comprovanteUrl": null,
		"sinalPago": false,
		"_id": "69db01cf84304b759ecd69a6"
	},
	"_id": "69db01cf84304b759ecd69a3",
	"createdAt": "2026-04-12T02:22:07.505Z",
	"updatedAt": "2026-04-12T02:22:07.505Z",
	"__v": 0
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, o novo pedido foi criado com sucesso.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```


### - DELETE /orders/
Esse endpoint é responsável por deletar um pedido específico pelo seu ID.

#### Parâmetros:
id: ID do pedido a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o pedido foi deletado com sucesso e não há conteúdo para retornar ao cliente.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
	"message": "Pedido com id: 69daee1c202befdfaf1d5e6e foi deletado."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

### - PUT /orders/
Esse endpoint é responsável por atualizar as informações de um pedido específico pelo seu ID.

#### Parâmetros:
itens: Lista contendo os produtos selecionados para o pedido.<br>
tipo: Peso ou categoria do ovo de páscoa (ex: 450g).<br>
personalizacao: Especificações de casca e recheio escolhidas pelo cliente.<br>
precoUnitario: Valor de cada unidade do item.<br>
quantidade: Número de unidades de cada item no carrinho.<br>
total: Soma total do valor do pedido.<br>
dataRetirada: Data e horário previstos para a busca do pedido.<br>
pagamento: Informações sobre o método escolhido, anexo de comprovante e confirmação de sinal.<br>
Exemplo de requisição:

```
{
  "itens": [
    {
      "tipo": "350g",
      "personalizacao": [
        {
          "casca": "Brownie",
          "recheio": "Ferreiro Rocher"
        }
      ],
      "precoUnitario": 80,
      "quantidade": 1
    }
  ],
  "total": 80,
  "dataRetirada": "2026-04-03T14:00:00.000Z",
  "pagamento": {
    "metodo": "pix",
    "comprovanteUrl": null,
    "sinalPago": false
  }
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do pedido seram atualizadas com sucesso.

Exemplo de resposta:

```
{
    "_id": "69daed55202befdfaf1d5e61",
    "usuarioId": "69da63a707381fcd2df9709c",
    "itens": [
        {
            "tipo": "350g",
            "personalizacao": [
                {
                    "casca": "Brownie",
                    "recheio": "Ferreiro Rocher",
                    "_id": "69db072b6fb14b6bfcd9c495"
                }
            ],
            "precoUnitario": 80,
            "quantidade": 1,
            "_id": "69db072b6fb14b6bfcd9c494"
        }
    ],
    "total": 80,
    "status": "AGUARDANDO_APROVACAO",
    "dataRetirada": "2026-04-03T14:00:00.000Z",
    "pagamento": {
        "metodo": "pix",
        "comprovanteUrl": null,
        "sinalPago": false,
        "_id": "69db072b6fb14b6bfcd9c496"
    },
    "createdAt": "2026-04-12T00:54:45.466Z",
    "updatedAt": "2026-04-12T02:44:59.940Z",
    "__v": 0
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

Exemplo de resposta:

```
{
    "err": "ID inválido ou dados malformados!"
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

### - GET /orders/
Esse endpoint é responsável por retornar as informações de um pedido específico pelo seu ID.

#### Parâmetros:
_id: ID do pedido a ser consultado.

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, você vai receber as informações do pedido solicitado.

Exemplo de resposta:

```
{
		"_id": "69daed55202befdfaf1d5e61",
		"usuarioId": {
			"_id": "69da63a707381fcd2df9709c",
			"name": "Admin Heloisa",
			"email": "admin@heloisa.com",
			"whatsapp": "13996029633"
		},
		"itens": [
			{
				"tipo": "350g",
				"personalizacao": [
					{
						"casca": "Brownie",
						"recheio": "Ferreiro Rocher",
						"_id": "69daed55202befdfaf1d5e63"
					}
				],
				"precoUnitario": 80,
				"quantidade": 1,
				"_id": "69daed55202befdfaf1d5e62"
			}
		],
		"total": 80,
		"status": "AGUARDANDO_APROVACAO",
		"dataRetirada": "2026-04-03T14:00:00.000Z",
		"pagamento": {
			"metodo": "pix",
			"comprovanteUrl": null,
			"sinalPago": false,
			"_id": "69daed55202befdfaf1d5e64"
		},
		"createdAt": "2026-04-12T00:54:45.466Z",
		"updatedAt": "2026-04-12T00:54:45.466Z",
		"__v": 0
	},
```

##### Não Encontrado! 404
Caso essa resposta aconteça, significa que o pedido com o ID fornecido não foi encontrado.

Exemplo de resposta:

```
{
    "err": "Pedido não encontrado!"
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
    "err": "ID inválido!"
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

## Endpoints - Usuário

### - POST /auth
Esse endpoint é responsável para logar um usuário no banco de dados.

#### Parâmetros:
email: Endereço de e-mail do usuário para autenticação.<br>
password: Senha de acesso da conta.<br>
Exemplo de requisição:

```
{
  "email": "admin@heloisa.com",
  "password": "123456"
}
```

#### Respostas:
##### Criado! 200
Caso essa resposta aconteça, o novo pedido foi criado com sucesso.

Exemplo de resposta: Usuário autenticado com sucesso.

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

### - POST /users
Esse endpoint é responsável por cadastrar um novo usuário no banco de dados.

#### Parâmetros:
name: Nome do usuário.<br>
email: Endereço de e-mail para cadastro e login.<br>
password: Senha de acesso da conta.<br>
whatsapp: Número de telefone para contato via WhatsApp.<br>
role: Nível de permissão do usuário no sistema (ex: USER).<br>
Exemplo de requisição:

```
{
  "name": "Renan",
  "email": "renan@email.com",
  "password": "12345",
  "whatsapp": "13996054131",
  "role": "USER"
}
```

#### Respostas:
##### Criado! 201
Caso essa resposta aconteça, o novo usuário foi criado com sucesso.

Exemplo de resposta:
```
{
	"message": "O usuário foi cadastrado com sucesso!"
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```



### - DELETE /users/
Esse endpoint é responsável por deletar um usuário específico pelo seu ID.

#### Parâmetros:
id: ID do usuário a ser deletado.

#### Respostas:
##### Sem Conteúdo! 204
Caso essa resposta aconteça, o usuário foi deletado com sucesso e não há conteúdo para retornar ao cliente.

Exemplo de resposta: Nenhum conteúdo retornado.

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido.

Exemplo de resposta:

```
{
	"message": "usuário com id: 69daee1c202befdfaf1d5e6e foi deletado."
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```

### - PUT /users/
Esse endpoint é responsável por atualizar as informações de um usuário específico pelo seu ID.

#### Parâmetros:

Exemplo de requisição:

```
{
  "name": "Carlos",
  "email": "carlos@gmail.com",
  "password": "123",
  "whatsapp": "13991234567",
  "role": "USER"
}
```

#### Respostas:
##### OK! 200
Caso essa resposta aconteça, as informações do pedido seram atualizadas com sucesso.

Exemplo de resposta:

```
{
    "message": "Usuário atualizado com sucesso!",
    "user": {
        "_id": "69dac389a451a2635b99c9f9",
        "name": "Carlos",
        "email": "carlos@gmail.com",
        "password": "$2b$10$vEDVqViwcFb7kjlVXOw2bu5qz.8rN4hQ1PQowgjFA0GN4AQX7luK.",
        "whatsapp": "13991234567",
        "role": "USER",
        "__v": 0
    }
}
```

##### Requisição Inválida! 400
Caso essa resposta aconteça, significa que o ID fornecido é inválido ou a requisição contém dados malformados.

Exemplo de resposta:

```
{
    "err": "ID inválido ou dados malformados!"
}
```

##### Erro Interno do Servidor! 500
Caso essa resposta aconteça, significa que ocorreu um erro interno no servidor.

Exemplo de resposta:

```
{
    "err": "Erro interno do servidor!"
}
```
