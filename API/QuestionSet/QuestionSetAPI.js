import QuestionSet from './QuestionSet'
const client = require('../client');

exports.get_question_sets = async () => {
    let questionSetPromise = new Promise((resolve, reject) => {
        client.get('/api/questionSet/')
            .then((response) => {
                const questionSets = response.data.questionSets;
                let questionSetArray = [];
                for(let i=0; i<questionSets.length; i++) {
                    const name = questionSets[i].name;
                    const _id = questionSets[i]._id;
                    questionSetArray.push(new QuestionSet(name, _id))
                }
                resolve(questionSetArray);
            })
            .catch(err => {
                reject(err);
            });
    });

    return await questionSetPromise.catch(err => {
        throw new Error(err.message || "There was a problem getting the question sets");
    });
};
