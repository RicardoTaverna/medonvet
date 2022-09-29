import os
import click, json, pika, sendgrid, time

from datetime import datetime
from sendgrid.helpers.mail import Mail, Email, To, Content
from templates.templates import template_passwd, template_agendamento


url = ('amqp://guest:guest@localhost')
params = pika.URLParameters(url=url)
params.socket_timeout = 5
connection = pika.BlockingConnection(params)
channel = connection.channel()



@click.command()
@click.option('--queue', help='Nome da fila do rabbitmq a ser monitorada')
def consumer(queue):
    """Função para monitorar e consumar a fila do rabitmq passada como parametro.

    Args:
        queue (str): Nome da fila do rabbitmq
    """
    while True:
        time.sleep(2)
        print(f'[CONSUMER] - Buscando itens na fila {queue}')
        
        method_frame, header_frame, body = channel.basic_get(queue)

        if method_frame:
            print('[CONSUMER] - Log da fila: ', method_frame, header_frame, body)
            body = body.decode()
            print(f'[CONSUMER] - payload da fila: {body}')
            context = json.loads(body)
            reset_password = context.get('reset_password')
            print(reset_password)

            if reset_password:
                subject = "Troca de senha MedOnVet"
                template_new = template_passwd.replace("$token", context.get('token'))
                template_new = template_new.replace("$user", context.get('user'))
                template_new = template_new.replace("$data", str(datetime.now()))
                

            else:
                subject = "Agendamento de Consulta"
                template_new = template_agendamento.replace("$user", context.get('user'))
                template_new = template_new.replace("$dia", context.get('data'))
                template_new = template_new.replace("$hora", context.get('horario'))
                template_new = template_new.replace("$vet", context.get('veterinario'))
                template_new = template_new.replace("$pet", context.get('pet'))

            api_key = os.environ.get('SENDGRID_API_KEY')
            sg = sendgrid.SendGridAPIClient(api_key=api_key)
            from_email = Email("taverna.ricardo@gmail.com")  # Change to your verified sender
            to_email = To(context.get('email'))  # Change to your recipient
            
            content = Content("text/html", template_new)
            mail = Mail(from_email, to_email, subject, content)

            # Get a JSON-ready representation of the Mail object
            mail_json = mail.get()

            # Send an HTTP POST request to /mail/send
            sg.client.mail.send.post(request_body=mail_json)
            print(f'[CONSUMER] - Email enviado para: {context.get("email")}')

            channel.basic_ack(method_frame.delivery_tag)
        else:
            print('[CONSUMER] - Nenhuma mensagem encontrada na fila')

if __name__ == '__main__':
    consumer()