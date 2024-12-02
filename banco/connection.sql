create database planner;

use planner;

create table lembretes (

	id integer not null,
    descricao varchar(255),
    datalembrete date,
    categoria varchar(30),
    concluido boolean,
    primary key (id)
    
);

create table informacoes (

	id integer not null,
    idCompromisso integer not null,
    texto text,
    primary key (id),
    foreign key (idCompromisso) references lembretes (id) on delete cascade on update cascade
    
);
	
insert into lembretes (id, descricao, datalembrete, categoria, concluido) values (1, 'Jogar futebol com os amigos', 
						'2024-12-02', 'Lazer', 0);
						
insert into lembretes (id, descricao, datalembrete, categoria, concluido) values (2, 'Ir ao cinema com a namorada', 
						'2024-11-30', 'Lazer', 0);
						
insert into lembretes (id, descricao, datalembrete, categoria, concluido) values (3, 'Estudar para prova', 
						'2024-11-27', 'Importantes', 1);
						
insert into lembretes (id, descricao, datalembrete, categoria, concluido) values (4, 'Implementar nova tela do Sistema', 
						'2024-11-28', 'Trabalho', 0);

select * from lembretes;

insert into informacoes (id, idCompromisso, texto) values (1, 1, 'Levar camisa do time');
insert into informacoes (id, idCompromisso, texto) values (2, 2, 'compar salgadinho');
insert into informacoes (id, idCompromisso, texto) values (3, 3, 'Revisar anotações do computador');
insert into informacoes (id, idCompromisso, texto) values (4, 4, 'Testar antes!');

SELECT * from informacoes;
    