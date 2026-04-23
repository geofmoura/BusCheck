# BusCheck
Aplicativo mobile (Android) para organização de viagens de ônibus privados, conectando estudantes do interior às faculdades na cidade.

## Requisitos Funcionais

**Administrador**
- RF01 - Cadastrar novas rotas de viagem, incluindo turno e veículo
- RF02 - Visualizar todas as rotas cadastradas
- RF03 - Editar informações de rotas existentes
- RF04 - Desativar/reativar rotas conforme necessário

**Passageiro**
- RF05 - Criar uma conta de usuário com informações pessoais
- RF06 - Vincular-se a uma instituição de ensino (faculdade/universidade)
- RF07 - Visualizar todas as rotas cadastradas
- RF08 - Inscrever-se em uma rota de viagem disponível
- RF09 - Selecionar os dias da semana em que utilizará o transporte
- RF10 - Visualizar suas inscrições ativas e histórico de viagens
- RF11 - Marcar quando pretender faltar na viagem
- RF12 - Confirmar presença nas viagens (check-in)

**Motorista**
- RF13 - Visualizar a lista completa de rotas em que está vinculado
- RF14 - Acessar detalhes específicos de cada rota (horário, passageiros)
- RF15 - Visualizar a lista de alunos inscritos em cada rota
- RF16 - Verificar informações de cada aluno (nome, faculdade, cidade de origem)
- RF17 - Visualizar em tempo real quais alunos já estão a bordo do transporte

## Requisitos Não Funcionais

- Um usuário do tipo passageiro não pode se inscever na mesma rota mais de uma vez.
- O código de cartão deve ser único para cada passageiro.
- Um usuário do tipo motorista não pode se inscever em uma rota.
- Um usuário do tipo admin não pode se inscever em uma rota.
- Um veículo não pode estar cadastrado na mesma rota e no mesmo turno mais de uma vez.

## ERD - Diagram de Entidades e Relacionamentos

![Diagram de Entidades e Relacionamentos](docs/erd.svg)

## Telas

**1. Autênticação**
   - Login: permite ao usuário entrar como email e senha
   - Cadastro: permite que o usuário se cadastre no sistema.
   - Perfil: premite visualizar as informações do usuário.

**2. Passageiro**
   -  Rotas cadastradas: permite visualizar as rotas em que ele está cadastrado
   - Cadastar-se em uma rota: permite se cadastar para utilizar uma rota.
   -  Informar ausência: permite ao usuário informar que não usará o transpote em um dia espessifico.
   - Histórico de check-in

**3. Motorista**
   - Rotas cadastradas: permite visualizar as rotas em que ele está cadastrado
   - Detalhes da rota: permite visualizar as informações da rota
   - lista de presença da rota: permite visualizar a lista de alunos que utilizarão o trasporte no dia.

**3. Motorista**
   - Rotas cadastradas: permite visualizar todas as rotas cadastradas no sistema
   - Detalhes da rota: permite visualizar as informações da rota

   
## Arquitetura
![Arquitetura](docs/BusCheck.jpg)

