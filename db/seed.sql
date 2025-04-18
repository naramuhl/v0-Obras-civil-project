-- Inserção de dados de exemplo
USE construcao_civil;

-- Inserção de Funcionários
INSERT INTO employees (id, name, role, salary, hire_date) VALUES
('e1', 'João da Silva', 'Pedreiro', 2500.00, '2022-01-15'),
('e2', 'Maria Santos', 'Ajudante', 1800.00, '2022-02-10'),
('e3', 'Pedro Oliveira', 'Eletricista', 3000.00, '2022-01-20'),
('e4', 'Ana Martins', 'Pintora', 2300.00, '2022-03-05'),
('e5', 'Carlos Souza', 'Pedreiro', 2500.00, '2022-02-15');

-- Inserção de Projetos
INSERT INTO projects (id, name, client, size, status, budget, start_date, end_date, description) VALUES
('p1', 'Residencial Vila Nova', 'João Pereira', 120.00, 'Em andamento', 264000.00, '2023-05-15', '2023-11-15', 'Construção de casa residencial de 120m²'),
('p2', 'Comercial Centro', 'Empresa ABC Ltda', 200.00, 'Em andamento', 480000.00, '2023-06-01', '2023-12-01', 'Reforma de loja comercial no centro'),
('p3', 'Residencial Jardins', 'Maria Silva', 150.00, 'Em andamento', 330000.00, '2023-07-10', '2024-01-10', 'Construção de casa residencial de 150m²'),
('p4', 'Pavilhão Industrial', 'Indústrias XYZ', 500.00, 'Em andamento', 1100000.00, '2023-08-01', '2024-03-01', 'Construção de pavilhão industrial'),
('p5', 'Residencial Parque Verde', 'Carlos Mendes', 180.00, 'Concluída', 396000.00, '2023-01-15', '2023-07-15', 'Construção de casa residencial de 180m²');

-- Inserção de Pagamentos
INSERT INTO payments (id, employee_id, project_id, amount, date, description) VALUES
('pay1', 'e1', 'p1', 1250.00, '2023-05-15', 'Pagamento semanal'),
('pay2', 'e2', 'p2', 950.00, '2023-05-15', 'Pagamento semanal'),
('pay3', 'e3', 'p3', 1350.00, '2023-05-15', 'Pagamento semanal'),
('pay4', 'e4', 'p1', 1150.00, '2023-05-15', 'Pagamento semanal'),
('pay5', 'e5', 'p2', 1250.00, '2023-05-15', 'Pagamento semanal'),
('pay6', 'e1', 'p1', 1250.00, '2023-05-22', 'Pagamento semanal'),
('pay7', 'e2', 'p2', 950.00, '2023-05-22', 'Pagamento semanal');

-- Inserção de Gastos
INSERT INTO expenses (id, category, project_id, amount, date, description) VALUES
('exp1', 'Material', 'p1', 2450.00, '2023-05-15', 'Cimento CP-II'),
('exp2', 'Transporte', 'p2', 850.00, '2023-05-16', 'Transporte de Areia'),
('exp3', 'Material', 'p3', 3150.00, '2023-05-17', 'Tijolos 9x19x19'),
('exp4', 'Material', 'p1', 1750.00, '2023-05-18', 'Vergalhão 10mm'),
('exp5', 'Transporte', 'p2', 650.00, '2023-05-19', 'Transporte de Equipamentos');

-- Inserção de Ferramentas
INSERT INTO tools (id, name, quantity, status, location, acquisition_date) VALUES
('t1', 'Furadeira', 3, 'Novo', 'p1', '2023-01-15'),
('t2', 'Serra Circular', 2, 'Usado', 'p2', '2022-11-10'),
('t3', 'Betoneira', 1, 'Usado', 'p3', '2022-08-05'),
('t4', 'Martelo Demolidor', 2, 'Novo', 'p1', '2023-02-20'),
('t5', 'Lixadeira', 3, 'Danificado', 'p2', '2022-10-15'),
('t6', 'Andaime', 10, 'Usado', 'p3', '2022-09-01'),
('t7', 'Escada', 5, 'Usado', 'p1', '2022-12-10');

-- Inserção de Orçamentos
INSERT INTO budgets (id, project_id, price_per_square_meter, extra_costs, total_budget, status, date, notes) VALUES
('b1', 'p1', 2200.00, 10000.00, 274000.00, 'Aprovado', '2023-05-10', 'Orçamento aprovado pelo cliente'),
('b2', 'p2', 2300.00, 20000.00, 480000.00, 'Aprovado', '2023-05-25', 'Inclui materiais especiais'),
('b3', 'p3', 2200.00, 15000.00, 345000.00, 'Pendente', '2023-06-05', 'Aguardando aprovação do cliente'),
('b4', 'p4', 2200.00, 50000.00, 1150000.00, 'Aprovado', '2023-07-15', 'Inclui equipamentos industriais'),
('b5', 'p5', 2400.00, 12000.00, 444000.00, 'Rejeitado', '2023-01-10', 'Cliente solicitou revisão de valores');

-- Inserção de Usuários com senhas hash geradas por bcryptjs
-- Senha: admin123
INSERT INTO users (id, name, email, password, role) VALUES
('u1', 'Administrador', 'admin@construcao.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'admin'),
('u2', 'Gerente', 'gerente@construcao.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'manager'),
('u3', 'Usuário', 'usuario@construcao.com', '$2a$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy', 'user');
