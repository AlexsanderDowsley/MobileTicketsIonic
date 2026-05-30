import { Injectable } from '@angular/core';
import { Ticket } from '../models/ticket';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    filaSP: Ticket[] = [];
    filaSG: Ticket[] = [];
    filaSE: Ticket[] = [];

    atendidas: Ticket[] = [];
    todasSenhas: Ticket[] = [];

    historico: string[] = [];

    guicheAtual: number = 1;
    ultimaFoiPrioritaria: boolean = false;

    constructor() { }

    estaNoExpediente(): boolean {

        const agora = new Date();

        const hora = agora.getHours();

        return hora >= 7 && hora < 17;

    }

    adicionarSenha(ticket: Ticket) {

        this.todasSenhas.push(ticket);

        if (ticket.tipo === 'SP') {
            this.filaSP.push(ticket);
        }

        else if (ticket.tipo === 'SG') {
            this.filaSG.push(ticket);
        }

        else if (ticket.tipo === 'SE') {
            this.filaSE.push(ticket);
        }

    }
    listarSenhas() {
        return [
            ...this.filaSP,
            ...this.filaSG,
            ...this.filaSE
        ];
    }

    proximaSenha() {

        if (!this.ultimaFoiPrioritaria && this.filaSP.length > 0) {

            this.ultimaFoiPrioritaria = true;

            return this.filaSP.shift();
        }

        if (this.filaSE.length > 0) {

            this.ultimaFoiPrioritaria = false;

            return this.filaSE.shift();
        }

        if (this.filaSG.length > 0) {

            this.ultimaFoiPrioritaria = false;

            return this.filaSG.shift();
        }

        if (this.filaSP.length > 0) {

            this.ultimaFoiPrioritaria = true;

            return this.filaSP.shift();
        }

        return undefined;
    }
    adicionarHistorico(senha: string) {

        this.historico.unshift(
            `${senha} - Guichê ${this.guicheAtual}`
        );

        if (this.historico.length > 5) {
            this.historico.pop();
        }

        this.guicheAtual++;

        if (this.guicheAtual > 5) {
            this.guicheAtual = 1;
        }
    }

    listarHistorico() {
        return this.historico;
    }

    encerrarExpediente() {

        this.filaSP.forEach(ticket => {
            ticket.descartada = true;
        });

        this.filaSG.forEach(ticket => {
            ticket.descartada = true;
        });

        this.filaSE.forEach(ticket => {
            ticket.descartada = true;
        });

        this.filaSP = [];
        this.filaSG = [];
        this.filaSE = [];

    }
}