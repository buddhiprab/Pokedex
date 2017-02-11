export class PokemonSkill {
    egg: number[];
    level_up: number[];
    tm: number[];
    transfer: number[];
    tutor: number[];
    @JsonProperty('pre-evolution')
    pre_Evolution: number[];
// Default constructor will be called by mapper
    constructor(){
        this.egg = undefined;
        this.level_up = undefined;
        this.tm = undefined;
        this.transfer = undefined;
        this.tutor = undefined;
        this.pre_Evolution = undefined;
    }
}
