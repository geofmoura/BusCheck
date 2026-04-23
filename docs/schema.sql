-- Schema do banco de dados BusCheck
-- Criado a partir do diagrama DBML em erd-code.dbml
-- Banco de dados: PostgreSQL

-- Tabela de usuários
CREATE TABLE usuario (
    id SERIAL PRIMARY KEY,
    nome_completo TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    telefone TEXT,
    endereco TEXT,
    tipo VARCHAR(20) NOT NULL CHECK (tipo IN ('ADMIN', 'MOTORISTA', 'PASSAGEIRO'))
);

-- Tabela de passageiros
CREATE TABLE passageiro (
    codigo_cartao TEXT PRIMARY KEY,
    usuario_id INTEGER NOT NULL UNIQUE,
    faculdade TEXT NOT NULL,

    CONSTRAINT fk_passageiro_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE
);

-- Tabela de rotas
CREATE TABLE rota (
    id SERIAL PRIMARY KEY,
    descricao TEXT NOT NULL,
    codigo_veiculo TEXT NOT NULL,
    motorista_id INTEGER NOT NULL,
    turno VARCHAR(10) NOT NULL CHECK (turno IN ('Manhã', 'Tarde', 'Noite')),

    CONSTRAINT fk_rota_motorista
        FOREIGN KEY (motorista_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT uq_veiculo_turno
        UNIQUE (codigo_veiculo, turno, data_inicio);
);

-- Tabela de associação passageiro-rota
CREATE TABLE passageiro_rota (
    usuario_id INTEGER NOT NULL,
    rota_id INTEGER NOT NULL,
    dias_viagem TEXT NOT NULL,

    PRIMARY KEY (usuario_id, rota_id),

    CONSTRAINT fk_passageiro_rota_usuario
        FOREIGN KEY (usuario_id)
        REFERENCES usuario(id)
        ON DELETE CASCADE,

    CONSTRAINT fk_passageiro_rota_rota
        FOREIGN KEY (rota_id)
        REFERENCES rota(id)
        ON DELETE CASCADE
);

-- Tabela de check-in
CREATE TABLE check_in (
    id SERIAL PRIMARY KEY,
    codigo_cartao TEXT NOT NULL,
    codigo_veiculo TEXT NOT NULL,
    data_hora TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT fk_check_in_passageiro
        FOREIGN KEY (codigo_cartao)
        REFERENCES passageiro(codigo_cartao)
        ON DELETE CASCADE,

    CONSTRAINT uq_usuario_veiculo_data
        UNIQUE (usuario_id, codigo_veiculo, data_hora)
);