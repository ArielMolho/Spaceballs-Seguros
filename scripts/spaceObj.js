/**
 * Creation of insurance spaceship object.
 * @constructor
 * @param {Text} model - The ship model.
 * @param {Number} age - The age of the ship.
 * @param {Text} insType  - The type of insurance selected.
*/

function InsuredShip(argModel, argAge, argInsType) {
    this.model = argModel;
    this.age = argAge;
    this.insType = argInsType;

    /**
     * Get Evaluation.
     * @return validate age to quote insurance or deny quote.
     */
    this.getEvaluation = function () {
        if (this.age >= 10) {
            return ageOut();
        } else {
            return procesarPoliza ();
        }
    }
}

function ageOut(){
    $(".ageOut").append(
        `<p style="color: red">${nombre}, su nave ${modelo}, ya no es asegurable. Que la fuerza te acompañe!</p>`
    );
}