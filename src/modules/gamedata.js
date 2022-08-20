class GameData {
    categoryId = 0;
    numberOfQuestions = 0;
    questionArray = [];
    chosenCategory = '';

    constructor(categoryId, numberOfQuestions, questionArray, chosenCategory) {
        this.categoryId = categoryId;
        this.numberOfQuestions = numberOfQuestions;
        this.questionArray = questionArray;
        this.chosenCategory = chosenCategory;
    }

    static getDeafault() {
        return new GameData(0, 0, [], '');
    }
}

export {GameData};