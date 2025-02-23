export class WeightedVideo {
    constructor(
        public file: File,
        public weight: number
    ) {}

    changeWeight(newWeight: string | number): void {
        this.weight = Number(newWeight) || 1;
    }
}