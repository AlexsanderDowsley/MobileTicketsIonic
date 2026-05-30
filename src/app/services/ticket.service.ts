import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})
export class TicketService {

    filaSP: string[] = [];
    filaSG: string[] = [];
    filaSE: string[] = [];
    historico: string[] = [];
    guicheAtual: number = 1;
    ultimaFoiPrioritaria: boolean = false;

    constructor() { }

    adicionarSenha(senha: string) {

        if (senha.includes('SP')) {
            this.filaSP.push(senha);
        }

        else if (senha.includes('SG')) {
            this.filaSG.push(senha);
        }

        else if (senha.includes('SE')) {
            this.filaSE.push(senha);
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
}