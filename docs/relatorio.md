# Relatório do Projeto BusCheck

## Visão Geral

O **BusCheck** é um aplicativo mobile Android desenvolvido para organizar e gerenciar viagens de ônibus, conectando estudantes do interior às faculdades na cidade. O projeto surge como uma solução tecnológica para um problema logístico comum em regiões onde estudantes precisam se deslocar diariamente de suas cidades de origem até instituições de ensino localizadas em centros urbanos.

## Objetivos

O objetivo principal do BusCheck é **digitalizar e estruturar todo o fluxo de transporte universitário, substituindo processos manuais e descentralizados por uma plataforma unificada. O sistema atende três perfis de usuário distintos:

- **Administradores**: podem cadastrar, editar, visualizar e ativar/desativar rotas de viagem, gerenciando a operação como um todo.
- **Passageiros (estudantes)**: podem criar contas, vincular-se a instituições de ensino, visualizar rotas disponíveis, inscrever-se em rotas específicas, selecionar dias de uso, gerenciar ausências e realizar check-in.
- **Motoristas**: podem visualizar as rotas às quais estão vinculados, acessar detalhes de cada rota, consultar a lista de passageiros e acompanhar em tempo real quais alunos já embarcaram.

## Desafios

O projeto enfrenta desafios significativos tanto no domínio da engenharia de software quanto no contexto social:

**Desafios Técnicos:**
- Garantir a integridade dos dados com restrições complexas, como impedir que um passageiro se inscreva mais de uma vez na mesma rota, que um motorista ou admin se inscreva como passageiro, e que um veículo seja alocado em duas rotas no mesmo turno.
- Assegurar a unicidade do código de cartão de cada passageiro, um identificador físico importante para o controle de embarque.
- Implementar um sistema de check-in que permita ao motorista visualizar em tempo real quais alunos estão a bordo.

**Desafios Operacionais:**
- Coordenar múltiplas rotas, turnos e veículos de forma eficiente.
- Gerenciar ausências e imprevistos dos estudantes, garantindo que o motorista tenha visibilidade clara de quem utilizará o transporte em cada dia.

**Desafios Sociais:**
- Lidar com a heterogeneidade de infraestrutura de internet nas regiões de origem dos estudantes, que podem ter conectividade limitada.
- Garantir a acessibilidade do aplicativo para usuários com diferentes níveis de familiaridade com tecnologia.

## Impacto Social

O BusCheck possui um impacto social relevante por atuar em um elo crítico da cadeia educacional: o **acesso físico à educação superior**. Muitos estudantes brasileiros residentes em cidades do interior dependem de transporte privado para frequentar faculdades em centros urbanos, e a falta de organização eficiente desse transporte pode resultar em atrasos, perda de vagas ou até desistência do curso.

Ao estruturar o gerenciamento de viagens, o aplicativo contribui para:

1. **Redução da evasão universitária**: ao tornar o transporte mais confiável e organizado, remove-se uma barreira logística que frequentemente leva à desistência.
2. **Otimização de recursos**: rotas bem planejadas e gerenciadas digitalmente reduzem custos operacionais para as empresas de transporte, o que pode refletir em mensalidades mais acessíveis para os estudantes.
3. **Segurança e rastreabilidade**: o controle de presença e check-in permite que motoristas e administradores saibam exatamente quem está utilizando o serviço, prevenindo situações de risco e garantindo que ninguém seja deixado para trás.
4. **Inclusão educacional**: ao facilitar o deslocamento, o projeto amplia indiretamente o alcance das instituições de ensino, permitindo que estudantes de regiões mais distantes tenham acesso à educação superior de qualidade.

## Considerações Finais

O BusCheck representa uma iniciativa de **tecnologia cívica** aplicada à educação, onde um problema aparentemente simples — organizar viagens de ônibus — se desdobra em desafios complexos de modelagem de dados, segurança e experiência do usuário. Mais do que um aplicativo de transporte, o projeto se posiciona como uma ferramenta de **democratização do acesso ao ensino superior**, endereçando uma necessidade real e sentida por milhares de estudantes em todo o Brasil.
