create database efetivo_pmerj;
use efetivo_pmerj;

create table policiais(
	id int auto_increment primary key,
    rg_civil varchar(20) not null unique,
    rg_militar varchar(20) not null unique,
    cpf varchar(14) not null unique,
    data_nascimento date not null,
    matricula varchar(255) not null
)
