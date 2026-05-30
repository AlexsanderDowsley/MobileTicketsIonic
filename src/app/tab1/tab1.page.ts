import { Component } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page {

  senhaGerada: string = '';

  contadorSP: number = 1;
  contadorSG: number = 1;
  contadorSE: number = 1;

  ultimaData = '';

  constructor(private ticketService: TicketService) { }

  gerarSenha(tipo: string) {

    if (!this.ticketService.estaNoExpediente()) {

      this.senhaGerada =
        'Fora do expediente';

      return;
    }

    const hoje = new Date();

    const dataAtual =
      hoje.getFullYear().toString() +
      String(hoje.getMonth() + 1).padStart(2, '0') +
      String(hoje.getDate()).padStart(2, '0');

    if (this.ultimaData !== dataAtual) {

      this.contadorSP = 1;
      this.contadorSG = 1;
      this.contadorSE = 1;

      this.ultimaData = dataAtual;
    }

    const ano = hoje.getFullYear().toString().slice(-2);
    const mes = String(hoje.getMonth() + 1).padStart(2, '0');
    const dia = String(hoje.getDate()).padStart(2, '0');


    let numero = '';

    if (tipo === 'SP') {
      numero = String(this.contadorSP).padStart(3, '0');
      this.contadorSP++;
    }

    if (tipo === 'SG') {
      numero = String(this.contadorSG).padStart(3, '0');
      this.contadorSG++;
    }

    if (tipo === 'SE') {
      numero = String(this.contadorSE).padStart(3, '0');
      this.contadorSE++;
    }

    this.senhaGerada = `${ano}${mes}${dia}-${tipo}${numero}`;

    const ticket = {
      numero: this.senhaGerada,
      tipo: tipo,
      dataHoraEmissao: new Date(),
      atendida: false
    };

    this.ticketService.adicionarSenha(ticket);
  }

}