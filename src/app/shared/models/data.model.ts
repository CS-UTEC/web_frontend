import { Case } from './case.model';

export class Data{
    constructor(
        public confirmed: Case[],
        public neutral: Case[],
        public recovered: Case[],
    ){}
}