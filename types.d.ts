export interface IMergeOverride {
    title?: boolean;
    meta?: boolean;
    script?: boolean;
    styleSheet?: boolean;
    passages?: boolean;
}

// @ts-ignore
export type TFoundPassage = [number, IPassage];

export interface IButtonConfig {
    name: string;
    icon: string;
    title: string;
    hotkey?: string;
    buttonIndex?: number;
    action?: Function;
}