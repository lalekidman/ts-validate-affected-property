
enum AFFECTED_PROPERTY_STATES {
  ADDED = 'added',
  UPDATED = 'updated',
  REMOVED = 'removed',
}
interface IAffectedProperty {
  fieldName: string
  newValue: any,
  previousValue?: any,
  state: AFFECTED_PROPERTY_STATES
}
export default class ChangedPropertyObject {
  private affectedProperty: IAffectedProperty[] = []
  constructor (updatedObject: any, previousObject: any, propertyNameToCheck: string[] = []) {
    this.validate(updatedObject, previousObject)
    // this.validateRemovedProperty(updatedObject, previousObject)
  }
  private validate = (updatedObject: any, previousObject: any, propertyName: string = '') => {
    for (let prop in updatedObject) {
      if (!this.compare(updatedObject[prop], previousObject[prop], propertyName ? `${propertyName}->${prop}` : prop)) {
        this.validate(updatedObject[prop], previousObject[prop], propertyName ? `${propertyName}->${prop}` : prop)
      }
      // *** DEVNOTE ***
      //  enable this comment below to get the newly added object as a whole.
      // if (typeof updatedObject[prop] === 'object' && previousObject[prop]) {
      
    }
    return this
  }
  private compare (updatedProperty: any, previousObject: any, propertyName: string = '') {
    if (typeof updatedProperty === 'object') {
      return false
    } else {
      // check if on the previous object property is undefined, it means newly added.
      if (previousObject === undefined) {
        this.affectedProperty.push({
          fieldName: propertyName,
          state: AFFECTED_PROPERTY_STATES.ADDED,
          newValue: updatedProperty
        })
      } else if (updatedProperty !== previousObject) {
          this.affectedProperty.push({
            fieldName: propertyName,
            state: AFFECTED_PROPERTY_STATES.UPDATED,
            newValue: updatedProperty,
            previousValue: previousObject,
          })
      }
      return true
    }
  }
  // private validateRemovedProperty = (updatedObject: any, previousObject: any, propertyName: string = '') => {
  //   if (typeof previousObject === 'object') {
  //     for (let prop in previousObject) {
  //       if (typeof previousObject[prop] === 'object' && updatedObject[prop]) {
  //         this.validateRemovedProperty(updatedObject ? updatedObject[prop] : undefined, previousObject[prop], propertyName ? `${propertyName}->${prop}` : prop)
  //       } else {
  //         if (updatedObject === undefined || updatedObject[prop] === undefined) {
  //           this.affectedProperty.push({
  //             fieldName: propertyName ? `${propertyName}->${prop}` : prop,
  //             state: AFFECTED_PROPERTY_STATES.REMOVED,
  //             value: previousObject[prop]
  //           })
  //         }
  //       }
  //     }
  //   }
  //   return this
  // }
  public getAffectedProperty = () => {
    return this.affectedProperty

  }
}