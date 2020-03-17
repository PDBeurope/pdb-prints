declare class PdbPrintsPlugin {
    targetEle: HTMLElement;
    pdbevents: any;
    formattedApiResult: any;
    defaultOptions: {
        entryId: string | undefined;
        orientation: string;
        color: string;
        size: string;
        hideLogo: any[];
        errorStyle: string;
    };
    options: {
        entryId: string | undefined;
        orientation: string;
        color: string;
        size: string;
        hideLogo: any[];
        errorStyle: string;
    };
    oldOptions: any;
    displayError(errType?: string): void;
    updateParams(options: {
        entryId: string;
        orientation: string;
        color: string;
        size: string;
        hideLogo: any[];
        errorStyle?: string;
    }): void;
    render(target: HTMLElement, options: {
        entryId: string;
        orientation: string;
        color: string;
        size: string;
        hideLogo: any[];
        errorStyle?: string;
    }): void;
    getApiData(entryId: string): Promise<any>;
    checkIFOrganismsAreIdentical(scientificNameArr: any): boolean;
    formatApiData(respData: any): any;
    createTemplate(logoData: any): void;
    getTitle(titleForEle: string[]): string;
}
