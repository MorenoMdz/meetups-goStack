# MeetApp

Meetups sobre desenvolvimento na sua região.

## Setup

Configure o servidor de banco de dados PG
Configure o servidor Redis
`npm install`
`adonis serve --dev`
`adonis kue:listen`

### API Routes

# Endpoint | Method | Data | * authenticated route

Rotas de Login e Registro
> `users` | POST | { name, email, password, password_confirmation}
> `users/:id` | GET | {} | * 
> `users/:id` | POST | { name, email, password, password_confirmation, preferences:[]} 

Rotas de Sessão
> `sessions` | POST | { name, email}

Rotas de reset de senha
> `forgot` | POST | { email, redirect_url }
> `forgot` | PUT | { token, password }

Rotas de preferências
> `preferences` | POST | { name, description } | *
> `preferences` | GET | {} | *

Rotas de Arquivos
> `files` | POST | {file} MultiPart | *
> `files/:id` | DELETE | {} | *
> `files/:id` | GET | {} | *

Rotas de Meetups
> `meetups` | POST | {title, decription, event_date, preferences: [], address: {
>  street, number, city, state
> }} | *
> `meetups/:id` | PUT | {title, decription, event_date, preferences: [], address: {
>  street, number, city, state
> }} | *
> `meetups` | GET | {} | *
> `meetups/:id` | GET | {} | *
> `meetups/:id` | DELETE | {} | *

Rotas de Registro em Meetup
> `meetups/:id/register` | POST | {} | *
> `meetups/:id/register` | DELETE | {} | *

Buscar Meetups
> `meetups/by-title` | GET | { title } | *
> `meetups/registered` | GET | {} | *
> `meetups/registered-soon` | GET | {} | *
> `meetups/not-registered` | GET | {} | *
> `meetups/registered-soon` | GET | {} | *
