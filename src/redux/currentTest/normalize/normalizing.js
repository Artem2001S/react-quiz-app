import { denormalize, normalize, schema } from 'normalizr';

const answer = new schema.Entity('answers');
const question = new schema.Entity('questions', {
  answers: [answer],
});

const testSchema = new schema.Entity('test', {
  questions: [question],
});

export const normalizeTest = (test) => {
  return normalize(test, testSchema);
};

export const denormalizeTest = (result, entities) => {
  return denormalize(result, testSchema, entities);
};
