export interface IMergeOverride {
    title: boolean;
    script: boolean;
    styleSheet: boolean;
    passages: boolean;
}

// @ts-ignore
export type TFoundPassage = [number, IPassage];