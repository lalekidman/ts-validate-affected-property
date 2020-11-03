declare enum AFFECTED_PROPERTY_STATES {
    ADDED = "added",
    UPDATED = "updated",
    REMOVED = "removed"
}
interface IAffectedProperty {
    fieldName: string;
    newValue: any;
    previousValue?: any;
    state: AFFECTED_PROPERTY_STATES;
}
export default class ChangedPropertyObject {
    private affectedProperty;
    constructor(updatedObject: any, previousObject: any, propertyNameToCheck?: string[]);
    private validate;
    private compare;
    getAffectedProperty: () => IAffectedProperty[];
}
export {};
//# sourceMappingURL=index.d.ts.map