CREATE TABLE lembretes (
	id INT NOT NULL AUTO_INCREMENT,
    descricao VARCHAR(255),
    datalembrete TIMESTAMP,
    categoria VARCHAR (30),
    obs TEXT,
    statusL CHAR (1),
    PRIMARY KEY (id)
)

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Apresentação trabalho Pós Graduação', '2024-12-16 19:30:00', 'Estudos', 'Apresentação em equipe!', 'P');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Reunião com cliente importante', '2024-12-17 14:00:00', 'Trabalho', 'Levar proposta atualizada.', 'E');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Consulta médica', '2024-12-18 10:00:00', 'Saúde', 'Retorno exame anual.', 'P');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Aniversário da Ana', '2024-12-05 19:00:00', 'Pessoal', 'Levar presente e cartão.', 'C');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Pagamento da fatura cartão', '2024-12-11 12:00:00', 'Financeiro', 'Evitar juros, pagar antes do prazo.', 'C');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Entrega relatório mensal', '2024-12-21 16:00:00', 'Trabalho', 'Analisar dados finais antes.', 'P');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Viagem de férias', '2024-12-07 06:30:00', 'Lazer', 'Checar documentação e malas.', 'C');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Revisão do carro', '2024-12-15 09:00:00', 'Pessoal', 'Troca de óleo e filtros.', 'E');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Treinamento de equipe', '2024-11-19 13:30:00', 'Trabalho', 'Focar em novas ferramentas.', 'C');

insert into lembretes (descricao, datalembrete, categoria, obs, statusL) 
VALUES ('Planejamento de metas 2025', '2024-12-26 11:00:00', 'Pessoal', 'Definir objetivos para o ano.', 'F');

SELECT * FROM lembretes;

ALTER TABLE lembretes AUTO_INCREMENT =1;