<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Real-Time Collaborative Document Management System</title>
</head>
<body>
    <h1>Real-Time Collaborative Document Management System</h1>

    <h2>Descrição do Projeto</h2>
    <p>
        Este projeto é uma aplicação para gerenciamento de documentos colaborativos em tempo real. 
        Ele permite que múltiplos usuários editem documentos simultaneamente, visualizem alterações em tempo real e interajam de forma segura através de autenticação JWT e WebSockets. 
        Foi desenvolvido utilizando tecnologias modernas do ecossistema JavaScript.
    </p>

    <h2>Funcionalidades</h2>
    <h3>Front-end</h3>
    <ul>
        <li><strong>Autenticação de Usuários</strong>:
            <ul>
                <li>Tela de login e cadastro.</li>
                <li>Validação de credenciais e criação de contas.</li>
            </ul>
        </li>
        <li><strong>Gerenciamento de Documentos</strong>:
            <ul>
                <li>Criação, edição, exclusão e listagem de documentos.</li>
                <li>Atualização em tempo real para todos os usuários conectados.</li>
                <li>Exibição de usuários online para cada documento.</li>
            </ul>
        </li>
        <li><strong>Controle de Sessões</strong>:
            <ul>
                <li>Cookies para gerenciar tokens JWT.</li>
                <li>Redirecionamento em caso de falhas de autenticação.</li>
            </ul>
        </li>
    </ul>

    <h3>Back-end</h3>
    <ul>
        <li><strong>API em Tempo Real</strong>: Uso de <strong>WebSockets</strong> com a biblioteca <code>socket.io</code> para comunicação bidirecional.</li>
        <li><strong>Autenticação Segura</strong>: Hash de senhas com <code>crypto</code> e autenticação baseada em JWT.</li>
        <li><strong>Gerenciamento de Documentos</strong>:
            <ul>
                <li>Banco de dados para persistência de documentos e usuários.</li>
                <li>Eventos WebSocket para manipular documentos.</li>
            </ul>
        </li>
        <li><strong>Usuários Online</strong>: Gerenciamento e exibição em tempo real de usuários conectados por documento.</li>
    </ul>

    <h2>Tecnologias Utilizadas</h2>
    <h3>Back-end</h3>
    <ul>
        <li><strong>Node.js</strong></li>
        <li><strong>Express</strong>: Servidor web para servir arquivos estáticos e API base.</li>
        <li><strong>Socket.IO</strong>: Comunicação em tempo real com WebSockets.</li>
        <li><strong>JWT (JSON Web Token)</strong>: Autenticação baseada em tokens.</li>
        <li><strong>Crypto</strong>: Hash seguro de senhas com <code>scryptSync</code> e geração de sal.</li>
        <li><strong>MongoDB</strong>: Banco de dados para persistência de documentos e usuários.</li>
        <li><strong>dotenv</strong>: Gerenciamento de variáveis de ambiente.</li>
    </ul>

    <h3>Front-end</h3>
    <ul>
        <li><strong>HTML, CSS, JavaScript</strong>: Interface do usuário.</li>
        <li><strong>Socket.IO Client</strong>: Comunicação com o servidor WebSocket.</li>
        <li><strong>Cookies</strong>: Controle de sessões.</li>
    </ul>

    <h2>Pré-requisitos</h2>
    <ul>
        <li><strong>Node.js</strong> (v16 ou superior)</li>
        <li><strong>MongoDB</strong> (instância local ou em nuvem)</li>
        <li><strong>Gerenciador de pacotes</strong>: npm ou yarn</li>
    </ul>


    <h2>Principais Eventos WebSocket</h2>
    <table border="1">
        <thead>
            <tr>
                <th>Evento</th>
                <th>Descrição</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><code>cadastrar_usuario</code></td>
                <td>Registra novos usuários no sistema.</td>
            </tr>
            <tr>
                <td><code>autenticar_usuario</code></td>
                <td>Realiza a autenticação do usuário e retorna o token JWT.</td>
            </tr>
            <tr>
                <td><code>adicionar_documento</code></td>
                <td>Cria um novo documento.</td>
            </tr>
            <tr>
                <td><code>obter_documentos</code></td>
                <td>Retorna a lista de documentos existentes.</td>
            </tr>
            <tr>
                <td><code>selecionar_documento</code></td>
                <td>Conecta um usuário a um documento específico.</td>
            </tr>
            <tr>
                <td><code>texto_editor</code></td>
                <td>Atualiza o texto do documento em tempo real.</td>
            </tr>
            <tr>
                <td><code>emitir_exclusao_documento</code></td>
                <td>Remove um documento do sistema.</td>
            </tr>
        </tbody>
    </table>
</body>
</html>
