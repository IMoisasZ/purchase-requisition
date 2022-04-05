create database purchase_requisitions;

use purchase_requisitions;

create table sector (
	sector_id int primary key auto_increment,
    sector varchar(30) unique not null,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table area (
	area_id int primary key auto_increment,
    area varchar(30) not null unique,
    sector_id int not null,
    foreign key(sector_id) references sector(sector_id),
    actived boolean default true,
	createdAt datetime,
    updatedAt datetime
);

create table unity (
	unity_id int primary key auto_increment,
    unity_tag varchar(5) unique not null,
    description varchar(20) not null,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table cost_center(
	cost_center_id int primary key auto_increment,
    cost_center varchar(20) not null unique,
    description varchar(100) not null,
    area_id int not null,
    foreign key(area_id) references area(area_id),
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table role (
	role_id int primary key auto_increment,
    role varchar(20) not null unique,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table user (
	user_id int primary key auto_increment,
    name varchar(30) not null,
    last_name varchar(30) not null,
    sector_id int not null,
    foreign key (sector_id) references sector(sector_id),
    role_id int not null,
    foreign key (role_id) references role(role_id),
    responsable_id int,
    email varchar(50) not null unique,
    password varchar(12) not null,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table responsable (
	responsable_id int primary key auto_increment,
    user_id int not null unique,
    foreign key (user_id) references user(user_id),
    name varchar(30) not null,
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table product (
	product_id int primary key auto_increment,
    code_dbcorp int unique,
    description varchar(255) not null unique,
    unity_id int not null,
    foreign key(unity_id) references unity(unity_id),
    actived boolean default true,
    createdAt datetime,
    updatedAt datetime
);

create table requisition (
	requisition_id int primary key auto_increment,
    user_id int not null,
    foreign key(user_id) references user(user_id),
    date date not null default now(),
    comments varchar(250),
    status varchar(30) not null,
    createdAt datetime,
    updatedAt datetime
);

create table requisition_itens (
	requisition_itens_id int primary key auto_increment,
	requisition_id int not null,
    foreign key(requisition_id) references requisition(requisition_id),
    quantity int not null,
    unity_id int not null,
    foreign key(unity_id) references unity(unity_id),
    cost_center_id int not null,
    foreign key (cost_center_id) references cost_center(cost_center_id),
    product_id int not null,
    foreign key(product_id) references product(product_id),
    di varchar(120),
    op varchar(120),
    comments varchar(250),
    deadline date not null,
    createdAt datetime,
    updatedAt datetime
);