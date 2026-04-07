# BusCheck
Aplicativo mobile (Android) para organização de viagens de ônibus privados, conectando estudantes do interior às faculdades na cidade.

## Requisitos Funcionais

Administrador
   - Deve ser capaz de cadastrar novas rotas de viagem, incluindo turno e veiculo
   - Deve poder visualizar todas as rotas cadastradas
   - Deve poder editar informações de rotas existentes
   - Deve poder desativar/reativar rotas conforme necessário

Aluno
   - Deve poder criar uma conta de usuário com informações pessoais
   - Deve poder vincular-se a uma instituição de ensino (faculdade/universidade)
   - Deve poder visualizar todas as rotas cadastradas
   - Deve poder inscrever-se em uma rota de viagem disponível
   - Deve poder selecionar os dias da semana em que utilizará o transporte
   - Deve poder visualizar suas inscrições ativas e histórico de viagens
   - Deve poder confirmar presença nas viagens (check-in)

Motorista
   - Deve poder visualizar a lista completa de viagens agendadas para o dia atual
   - Deve poder acessar detalhes específicos de cada viagem (horário, passageiros)
   - Deve poder visualizar a lista de alunos inscritos em cada viagem
   - Deve poder verificar informações de cada aluno (nome, faculdade, cidade de origem)
   - Deve poder visualizar em tempo real quais alunos já estão a bordo do transporte

## Arquitetura
![alt text](docs/BusCheck.jpg)

## Entidades do Banco

