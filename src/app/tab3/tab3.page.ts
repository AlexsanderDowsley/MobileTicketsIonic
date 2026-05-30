import { Component } from '@angular/core';
import { TicketService } from '../services/ticket.service';
import { Ticket } from '../models/ticket';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {

  senhaAtual: string = '';
  guicheAtual: number = 1;

  ticketAtual?: Ticket;

  constructor(private ticketService: TicketService) { }

  chamarProximaSenha() {

    if (!this.ticketService.estaNoExpediente()) {

      this.senhaAtual =
        'Expediente encerrado';

      return;

    }

    const ticket = this.ticketService.proximaSenha();

    if (ticket) {

      this.guicheAtual =
        this.ticketService.guicheAtual;

      this.ticketAtual = ticket;

      this.senhaAtual = ticket.numero;

    } else {

      this.ticketAtual = undefined;

      this.senhaAtual = 'Nenhuma senha na fila';

    }

  }
  atenderSenha() {

    if (!this.ticketAtual) {
      return;
    }

    this.ticketAtual.atendida = true;

    this.ticketAtual.dataHoraAtendimento =
      new Date();

    this.ticketAtual.guiche =
      this.guicheAtual;

    if (this.ticketAtual.tipo === 'SP') {

      this.ticketAtual.tempoAtendimento =
        Math.floor(Math.random() * 11) + 10;

    }

    else if (this.ticketAtual.tipo === 'SG') {

      this.ticketAtual.tempoAtendimento =
        Math.floor(Math.random() * 7) + 2;

    }

    else if (this.ticketAtual.tipo === 'SE') {

      this.ticketAtual.tempoAtendimento =
        Math.random() <= 0.95 ? 1 : 5;

    }

    this.ticketService.atendidas.push(
      this.ticketAtual
    );

    this.ticketService.adicionarHistorico(
      this.ticketAtual.numero
    );

    this.ticketAtual = undefined;

    this.senhaAtual = '';

  } naoCompareceu() {

    if (!this.ticketAtual) {
      return;
    }

    this.ticketAtual.descartada = true;

    this.ticketService.adicionarHistorico(
      `${this.ticketAtual.numero} - Descartada`
    );

    this.ticketAtual = undefined;

    this.senhaAtual = '';

  }
}