# Deploy do site AGS Digital

Este site e estatico: nao usa framework, backend ou processo de build.

## 1. Subir para o GitHub

No terminal, dentro desta pasta, use o repositorio que voce criou no GitHub:

```bash
git remote add origin https://github.com/SEU-USUARIO/NOME-DO-REPOSITORIO.git
git push -u origin main
```

Se o GitHub pedir login, entre com sua conta. Se pedir senha, use um token do GitHub em vez da senha da conta.

## 2. Publicar na Cloudflare Pages

1. Acesse o painel da Cloudflare.
2. Va em `Workers & Pages`.
3. Clique em `Create application`.
4. Entre na aba `Pages`.
5. Escolha `Import an existing Git repository`.
6. Conecte sua conta do GitHub e selecione o repositorio deste site.
7. Use estes campos:
   - `Production branch`: `main`
   - `Framework preset`: `None` ou `No framework`
   - `Build command`: deixe em branco ou use `exit 0`
   - `Build output directory`: `/`
8. Clique em `Save and Deploy`.

Depois do deploy, a Cloudflare vai gerar um endereco temporario no formato:

```text
https://nome-do-projeto.pages.dev
```

## 3. Colocar o dominio da Cloudflare

1. Na Cloudflare, va em `Workers & Pages`.
2. Abra o projeto do site.
3. Entre em `Custom domains`.
4. Clique em `Set up a domain`.
5. Digite seu dominio, por exemplo:

```text
seudominio.com.br
```

6. Confirme. Se o dominio ja esta na Cloudflare, ela normalmente cria o DNS necessario automaticamente.

## 4. Atualizar o site depois

Sempre que mudar algo no site:

```bash
git add .
git commit -m "Atualiza site"
git push
```

A Cloudflare Pages vai publicar a nova versao automaticamente.
