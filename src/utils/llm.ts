import {OpenAI} from 'langchain/llms/openai';

export async function ask({question}) {
  const llm = new OpenAI({
    temperature: 0.1,
  });
  return llm.predict(question);
}
