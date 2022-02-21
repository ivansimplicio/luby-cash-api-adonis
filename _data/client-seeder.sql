INSERT INTO public.address(id, address, city, state, zipcode, created_at, updated_at)
VALUES (101, 'Rua 1, Nº 1', 'Campina Grande', 'Paraíba', '12345-67', default, default),
		(102, 'Rua 1, Nº 2', 'Campina Grande', 'Paraíba', '12345-67', default, default),
		(103, 'Rua 1, Nº 3', 'Campina Grande', 'Paraíba', '12345-67', default, default),
		(104, 'Rua 1, Nº 4', 'Campina Grande', 'Paraíba', '12345-67', default, default);

INSERT INTO public.clients(id, full_name, email, phone, cpf_number, average_salary, current_balance, created_at, updated_at, address_id)
VALUES ('9e384fa1-25f6-4822-b0e2-c06e30af0bc2', 'Ivan Simplício', 'ivan@email.com', '22 2222-2222', '222.222.222-22', 1000, 170, default, default, 101),
		('e1619208-8582-4c70-b58b-cde41dcf6c32', 'José Alves', 'jose@email.com', '33 3333-3333', '333.333.333-33', 900, 170, default, default, 102),
		('a1f0e57b-3c75-4bdb-91b3-e3f4f0cd9cbb', 'Maria Silva', 'maria@email.com', '44 4444-4444', '444.444.444-44', 800, 260, default, default, 103),
		('19bae3dd-f2e0-4757-86d7-676f9c34d7c7', 'João Paulo', 'joao@email.com', '55 5555-5555', '555.555.555-55', 450, 0, default, default, 104);
