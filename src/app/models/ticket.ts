export interface Ticket {

    numero: string;

    tipo: string;

    dataHoraEmissao: Date;

    dataHoraAtendimento?: Date;

    guiche?: number;

    atendida: boolean;

    descartada?: boolean;

    tempoAtendimento?: number;

}