import { Component } from '@angular/core';
import { TicketService } from '../services/ticket.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false
})
export class Tab3Page {

  senhaAtual: string = '';
  guicheAtual: number = 1;

  constructor(private ticketService: TicketService) { }

  chamarProximaSenha() {

    const senha = this.ticketService.proximaSenha();

    if (senha) {

      this.guicheAtual =
        this.ticketService.guicheAtual;

      this.senhaAtual = senha;

      this.ticketService.adicionarHistorico(
        senha
      );

    } else {
      this.senhaAtual = 'Nenhuma senha na fila';
    }

  }

}