# siehp-webapp
Aplicação cliente front-end para o Sistema Integrado de Ensino a Histologia e Patologia 

## Pré-requisitos
- Sistema operacional Linux (Ubuntu 20.04 LTS ou superior recomendado)
- Docker (versão 20.10 ou superior)
- Docker Compose (versão 2.0 ou superior)
- Git

## Instalação

### 1. Instalar Docker e Docker Compose
```bash
# Atualizar os repositórios
sudo apt update

# Instalar dependências necessárias
sudo apt install -y apt-transport-https ca-certificates curl software-properties-common

# Adicionar a chave GPG oficial do Docker
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg

# Adicionar o repositório do Docker
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null

# Atualizar os repositórios novamente
sudo apt update

# Instalar Docker
sudo apt install -y docker-ce docker-ce-cli containerd.io

# Instalar Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/download/v2.20.0/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# Adicionar seu usuário ao grupo docker (para executar docker sem sudo)
sudo usermod -aG docker $USER
```

### 2. Clonar o Repositório (Caso prefira clonar o repositório entre em contato com os desenvolvedores para liberarem seu acesso ao repositório)
```bash
git clone https://github.com/seu-usuario/siehp-webapp.git
cd siehp-webapp
```

### 3. Configurar o Arquivo .env
Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:
```bash
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o arquivo .env com suas configurações
nano .env
```

Exemplo de configuração do arquivo `.env`:
```env
# Configurações da aplicação
NEXT_PUBLIC_SIEHP_URL=http://localhost:3000
NEXT_PUBLIC_SIEHP_API_URL=http://localhost:8080
```

### 4. Executar o Projeto
```bash
# Construir e iniciar os containers
docker-compose up --build

# Para executar em background
docker-compose up -d --build

# Para parar os containers
docker-compose down
```

## Acessando a Aplicação
Após a inicialização, a aplicação estará disponível em:
- http://localhost:3000

## Solução de Problemas
- Se encontrar problemas de permissão com o Docker, certifique-se de que seu usuário está no grupo docker:
  ```bash
  sudo usermod -aG docker $USER
  ```
  E faça logout e login novamente para aplicar as alterações.

- Se os containers não iniciarem corretamente, verifique os logs:
  ```bash
  docker-compose logs
  ```

- Para reconstruir os containers do zero:
  ```bash
  docker-compose down
  docker-compose up --build
  ```
