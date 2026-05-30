import { Component } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false
})
export class Tab4Page {

  constructor(public ticketService: TicketService) { }

  get totalEmitidas() {
    return this.ticketService.todasSenhas.length;
  }

  get totalAtendidas() {
    return this.ticketService.atendidas.length;
  }

  get spEmitidas() {
    return this.ticketService.todasSenhas.filter(
      t => t.tipo === 'SP'
    ).length;
  }

  get sgEmitidas() {
    return this.ticketService.todasSenhas.filter(
      t => t.tipo === 'SG'
    ).length;
  }

  get seEmitidas() {
    return this.ticketService.todasSenhas.filter(
      t => t.tipo === 'SE'
    ).length;
  }

  get spAtendidas() {
    return this.ticketService.atendidas.filter(
      t => t.tipo === 'SP'
    ).length;
  }

  get sgAtendidas() {
    return this.ticketService.atendidas.filter(
      t => t.tipo === 'SG'
    ).length;
  }

  get seAtendidas() {
    return this.ticketService.atendidas.filter(
      t => t.tipo === 'SE'
    ).length;
  }

  get todasSenhas() {
    return this.ticketService.todasSenhas;
  } get tmSP() {

    const lista = this.ticketService.atendidas
      .filter(t => t.tipo === 'SP' && t.tempoAtendimento);

    if (lista.length === 0) {
      return 0;
    }

    const soma = lista.reduce(
      (total, ticket) =>
        total + (ticket.tempoAtendimento || 0),
      0
    );

    return (soma / lista.length).toFixed(2);
  }

  get tmSG() {

    const lista = this.ticketService.atendidas
      .filter(t => t.tipo === 'SG' && t.tempoAtendimento);

    if (lista.length === 0) {
      return 0;
    }

    const soma = lista.reduce(
      (total, ticket) =>
        total + (ticket.tempoAtendimento || 0),
      0
    );

    return (soma / lista.length).toFixed(2);
  }

  get tmSE() {

    const lista = this.ticketService.atendidas
      .filter(t => t.tipo === 'SE' && t.tempoAtendimento);

    if (lista.length === 0) {
      return 0;
    }

    const soma = lista.reduce(
      (total, ticket) =>
        total + (ticket.tempoAtendimento || 0),
      0
    );

    return (soma / lista.length).toFixed(2);
  }
  get totalDescartadas() {
    return this.ticketService.todasSenhas.filter(
      t => t.descartada
    ).length;
  }

  encerrarExpediente() {

    this.ticketService.encerrarExpediente();

  }

  get senhasHoje() {

    const hoje = new Date();

    return this.ticketService.todasSenhas.filter(ticket => {

      const data = new Date(ticket.dataHoraEmissao);

      return (
        data.getDate() === hoje.getDate() &&
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );

    });

  }

  get emitidasHoje() {
    return this.senhasHoje.length;
  }

  get atendidasHoje() {
    return this.senhasHoje.filter(
      t => t.atendida
    ).length;
  }

  get descartadasHoje() {
    return this.senhasHoje.filter(
      t => t.descartada
    ).length;
  }
  get senhasMes() {

    const hoje = new Date();

    return this.ticketService.todasSenhas.filter(ticket => {

      const data = new Date(ticket.dataHoraEmissao);

      return (
        data.getMonth() === hoje.getMonth() &&
        data.getFullYear() === hoje.getFullYear()
      );

    });

  } get emitidasMes() {
    return this.senhasMes.length;
  }

  get atendidasMes() {
    return this.senhasMes.filter(
      t => t.atendida
    ).length;
  }

  get descartadasMes() {
    return this.senhasMes.filter(
      t => t.descartada
    ).length;
  }

}