const bcrypt = require("bcryptjs")

// Senha que queremos hashear
const password = "admin123"

// Gerar o hash
bcrypt.hash(password, 10, (err, hash) => {
  if (err) {
    console.error("Erro ao gerar hash:", err)
    return
  }

  console.log("Senha original:", password)
  console.log("Hash gerado:", hash)

  // Verificar se o hash funciona
  bcrypt.compare(password, hash, (err, result) => {
    if (err) {
      console.error("Erro ao verificar hash:", err)
      return
    }

    console.log("Verificação do hash:", result ? "Sucesso" : "Falha")
  })
})
