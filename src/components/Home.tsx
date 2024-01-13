import NavBar from './NavBar';

export default function Home() {
	return (
		<>
			<NavBar />
			<div className="text-center p-4">
				<h2 className="text-3xl font-bold mb-4">Sobre Este Projeto</h2>
				<p className="text-gray-700 text-lg mb-4">
					Bem-vindo à nossa aplicação GitHub Replica! Este projeto
					demonstra o uso de várias tecnologias e padrões de design
					para criar uma aplicação robusta e eficiente.
				</p>

				<h3 className="text-2xl font-semibold mb-2">
					Tecnologias Utilizadas
				</h3>
				<ul className="list-disc list-inside text-left text-lg mb-4">
					<li>React para construção da interface do usuário</li>
					<li>
						TypeScript para melhor qualidade e manutenção do código
					</li>
					<li>Tailwind CSS para estilização responsiva e bonita</li>
					<li>React Router para gerenciar as rotas da aplicação</li>
				</ul>

				<h3 className="text-2xl font-semibold mb-2">
					Padrões de Design
				</h3>
				<p className="text-gray-700 text-lg mb-4">
					Neste projeto, implementamos vários padrões de design para
					garantir um código estruturado e de fácil manutenção:
				</p>
				<ul className="list-disc list-inside text-left text-lg mb-4">
					<li>
						<strong>MVC (Model-View-Controller):</strong> Organiza a
						aplicação em três componentes separados, promovendo a
						separação de preocupações e manutenibilidade.
					</li>
					<li>
						<strong>Singleton:</strong> Garante que uma classe tenha
						apenas uma instância e fornece um ponto de acesso global
						para essa instância.
					</li>
					<li>
						<strong>Observer:</strong> Permite que objetos se
						inscrevam para receber notificações sobre mudanças em
						outros objetos, garantindo comunicação e atualizações
						eficientes.
					</li>
					<li>
						<strong>Facade:</strong> Fornece uma interface
						simplificada para um subsistema complexo, tornando mais
						fácil de usar e entender.
					</li>
					<li>
						<strong>Abstract Factory:</strong> Permite a criação de
						famílias de objetos relacionados ou dependentes sem
						especificar suas classes concretas.
					</li>
					<li>
						<strong>Command:</strong> Encapsula um pedido como um
						objeto, permitindo a parametrização de clientes com
						operações, enfileiramento de pedidos e registro de
						pedidos.
					</li>
					<li>
						<strong>Factory Method:</strong> Define uma interface
						para criar um objeto, permitindo que subclasses alterem
						o tipo de objetos que serão criados.
					</li>
				</ul>

				<p className="text-gray-700 text-lg">
					Este projeto tem como objetivo demonstrar as melhores
					práticas no desenvolvimento de software, desde a seleção de
					tecnologia até a implementação de padrões de design, para
					criar uma aplicação confiável e de fácil manutenção.
				</p>
			</div>
		</>
	);
}
