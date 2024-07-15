# integracao-continua-t5

Repositório da disciplina Integração Contínua (Turma 5)

## Atualizando seu repositório local

O código produzido em sala de aula, e compartilhado neste repositório, pode ser atualizado em seu repositório local com o comando:

```console
git pull
```

No entanto, se você fez alterações no seu repositório local, o comando acima pode gerar conflitos. Para evitar lidar com isso, você pode forçar uma atualização com o repositório remoto por meio dos comandos:

```console
git fetch origin
git reset --hard origin/main
```

O primeiro comando recebe as atualizações mais recentes do repositório remoto, e o segundo descarta todas as alterações locais e atualiza com o histórico mais recente do repositório remoto (branch main).

## Como inciar a aplicação

### Back-end

A aplicação back-end pode ser iniciada pelo Spring Boot Dashboard ou diretamente com o Maven.

1. No Spring Boot Dashboard, clicar em "Run" na aplicação "sgcmapi".

2. No prompt de comandos, a partir do diretório `./sgcmapi`:

    a. Para iniciar a aplicação com o Maven:

    ```console
    mvn spring-boot:run
    ```

    Ou

    b. Para compilar o pacote e depois executar o JAR gerado:

    ```console
    mvn package
    java -jar target\sgcmapi.jar
    ```

A aplicação vai iniciar no endereço <http://localhost:9000/>, com acesso local a base de dados MySQL, por meio da porta padrão 3306, além de usuário e senha "root".

### Front-end

As dependências do projeto não são compartilhadas no repositório. Para instalar as dependências, a partir do diretório `./sgcmapp`, no prompt de comandos, digite:

```console
npm install
```

Para iniciar a aplicação, a partir do diretório `./sgcmapp`, execute o comando:

```console
ng serve
```

A aplicação vai iniciar no endereço <http://localhost:4200>.

## Sites de referência

- Software Delivery Guide (Martin Fowler): <https://martinfowler.com/delivery.html>
- GitHub Docs - GitHub Actions: <https://docs.github.com/pt/actions>
- Docker Docs: <https://docs.docker.com/get-started/overview/>

## Ferramentas

- **Render**
  - Plataforma que será utilizada para deploy com Docker.
  - Criar uma conta: <https://render.com/>
  - [Tutorial de configuração do Render para deploy](https://github.com/webacademyufac/tutoriais/blob/main/render/render.md)
- **Aiven**
  - Serviço de hospedagem de banco de dados MySQL.
  - Criar uma conta: <https://aiven.io/>
  - [Tutorial de configuração do Aiven para hospedagem do banco de dados](https://github.com/webacademyufac/tutoriais/blob/main/aiven/aiven.md)
- **Visual Studio Code**
  - <https://code.visualstudio.com/Download>
- **Extension Pack for Java (Extensão do VS Code)**
  - <https://marketplace.visualstudio.com/items?itemName=vscjava.vscode-java-pack>
- **Spring Boot Extension Pack (Extensão do VS Code)**
  - <https://marketplace.visualstudio.com/items?itemName=pivotal.vscode-boot-dev-pack>
- **XML (Extensão do VS Code)**
  - <https://marketplace.visualstudio.com/items?itemName=redhat.vscode-xml>
- **Angular Language Service (Extensão do VS Code)**
  - <https://marketplace.visualstudio.com/items?itemName=Angular.ng-template>
- **Git**
  - <https://git-scm.com/downloads>
- **Postman**
  - <https://www.postman.com/downloads/>
  - Link para download da coleção compartilhada (contendo requisições utilizadas nas aulas): <https://api.postman.com/collections/19704449-afc96c2c-7ce9-4370-b280-30b4bf2e67a7?access_key=PMAT-01HZR284JMDFHP76NYMWK1AJCD>
    - Para importar a coleção no Postman, clique em ```Import``` e cole o link acima.
- **JDK 17**
  - Para verificar se o JDK está corretamente instalado e configurado, digite no prompt de comandos:

    ```console
    javac -version
    ```

  - Se necessário, realizar a instalação e configuração:
    - Link para download: <https://download.oracle.com/java/17/archive/jdk-17.0.10_windows-x64_bin.msi>
    - Criar a variável de ambiente JAVA_HOME configurada para o diretório de instalação do JDK. Exemplo: “C:\Program Files\Java\jdk-17”.
    - Adicionar “%JAVA_HOME%\bin” na variável de ambiente PATH.
    - Tutorial de configuração: <https://mkyong.com/java/how-to-set-java_home-on-windows-10/>
- **Maven**
  - Para verificar se o Maven está corretamente instalado e configurado, digite no prompt de comandos:

    ```console
    mvn -version
    ```

  - Se necessário, realizar a instalação e configuração:
    - Link para download: <https://dlcdn.apache.org/maven/maven-3/3.8.8/binaries/apache-maven-3.8.8-bin.zip>
    - Adicionar o diretório de instalação do Maven na variável de ambiente PATH. Exemplo: “C:\apache-maven\bin”.
    - Tutorial de instalação: <https://mkyong.com/maven/how-to-install-maven-in-windows/>
- **MySQL**
  - Verificar se o MySQL está funcionando:
    - Para tentar conectar no MySQL, no prompt de comandos digite:

      ```console
      mysql -u root -p
      ```

    - Tentar acessar com senha em branco ou senha igual ao nome de usuário (root).
    - Tutorial para resetar a senha de root, caso necessário: <https://dev.mysql.com/doc/mysql-windows-excerpt/8.0/en/resetting-permissions-windows.html>
  - Remova o banco de dados ```sgcm```, se existir:
    - No prompt de comandos digite:
  
      ```console
      mysql -u root -p
      ```
  
    - Ao conectar no MySQL, execute a seguinte instrução SQL:

      ```sql
      DROP DATABASE sgcm;
      ```
  
  - Se necessário, realizar a instalação:
    - Link para download: <https://dev.mysql.com/downloads/file/?id=516927>
    - [Tutorial de instalação](https://github.com/webacademyufac/tutoriais/blob/main/mysql/mysql.md)
- **Node.js (e npm)**
  - Versão 20 (LTS).
  - Para verificar a versão do Node.js, no prompt de comandos digite:

    ```console
    node --version
    ```

  - Link para download: <https://nodejs.org/dist/v20.14.0/node-v20.14.0-x64.msi>
- **Angular CLI**
  - Versão 17.
  - Para verificar a versão do Angular CLI, no prompt de comandos digite:

    ```console
    ng version
    ```

  - Tutorial de instalação: <https://v17.angular.io/guide/setup-local>
  - Para instalar o Angular CLI, no prompt de comandos digite:

    ```console
    npm i -g @angular/cli@17.3.8
    ```

## SGCM - Sistema de Gerenciamento de Clínica Médica

A demonstração de uso das ferramentas e tecnologias abordadas na capacitação é baseada em um projeto de exemplo, o SGCM. A documentação básica deste projeto está disponível [em outro repositório](https://github.com/webacademyufac/sgcmdocs) e aborda os seguintes tópicos:

- [Principais funcionalidades](https://github.com/webacademyufac/sgcmdocs#principais-funcionalides)
- [Histórias de usuário](https://github.com/webacademyufac/sgcmdocs#histórias-de-usuário)
- [Diagrama de Classes](https://github.com/webacademyufac/sgcmdocs#diagrama-de-classes)
- [Diagrama Entidade Relacionamento](https://github.com/webacademyufac/sgcmdocs#diagrama-entidade-relacionamento)

## Atividades práticas

> [!IMPORTANT]
>
> - As atividades serão realizadas com o GitHub Classroom e podem ser acessadas pelos links nas descrições das atividades.
> - No primeiro acesso, _**cada aluno deverá selecionar seu nome na lista para vincular sua conta no GitHub**_ e aceitar o convite para a atividade prática.
> - O repositório da atividade prática será criado automaticamente para cada aluno ou grupo (compartilhado entre os membros).
> - O aluno deverá clonar o repositório para seu computador, fazer as modificações necessárias e subir o repositório para o GitHub (`git push`).
> - Não é necessário nenhuma outra ação para submeter a atividade.
> - Atividades em grupo:
>   - Ao acessar o link da atividade, o aluno deverá criar seu grupo ou ingressar no seu respectivo grupo se existir.
>   - O nome do grupo deve seguir o padrão: `Time_X`, onde `X` é o número do grupo.
>   - _**Todos os membros dos grupos devem participar das atividades**_, registrando esta participação por meio da identificação dos commits com seus respectivos usuários no GitHub.

1. [INDIVIDUAL] Modificar o workflow para que o _**job**_ que compila o projeto do back-end e realiza os testes seja dividido em dois _**jobs**_: um para compilar o projeto e outro para os testes.

    - Link da atividade: <https://classroom.github.com/a/x3ke4bvO>
    - Entrega: 11/07/2024 - 18:00h

    **Solução:** <https://github.com/webacademyufac/integracao-continua-t5/commit/d7bb4c2>

2. [INDIVIDUAL] Criar workflow de implantação contínua para o projeto front-end utilizando o GitHub Actions.

    - A implantação pode ser feita em qualquer plataforma. Exemplos:
      - Render (com Docker, a exemplo do que foi feito para aplicação back-end)
        - Dockerfile já está disponível no diretório do projeto front-end.
      - Netlify (não tem suporte para Docker): <https://www.netlify.com/>
      - Vercel (não tem suporte para Docker): <https://vercel.com/>
    - Antes do _**job**_ de _**deploy**_, deve ser executado o workflow de integração contínua do front-end.
    - Deve ser criado também um _**job**_ para executar os testes E2E.
      - Comando para executar os testes: `ng run sgcmapp:cypress-run`
    - O _**job**_ de _**deploy**_ deve ser executado apenas se o _**job**_ de testes E2E e o do CI do front-end forem bem-sucedidos.
    - **ATENÇÃO**:
      - Configurar a constante `API_URL` no arquivo `environment.ts` do projeto front-end.
      - Modificar as configurações de CORS no back-end para adicionar o host da aplicação front-end em produção.
      - A implantação deve ser feita obrigatoriamente por meio do GitHub Actions.

    - Link da atividade: <https://classroom.github.com/a/kJvvWUvv>
    - Entrega: 16/07/2024 - 18:00h
