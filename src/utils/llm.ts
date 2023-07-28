// @ts-ignore
import type {ConversationChain} from 'langchain/chains';

let llmChain: ConversationChain;

export const loadChain = async () => {
  if (llmChain) {
    return llmChain;
  }

  const {ConversationChain} = await import('langchain/chains');
  const {ChatOpenAI} = await import('langchain/chat_models/openai');
  const {
    ChatPromptTemplate,
    HumanMessagePromptTemplate,
    SystemMessagePromptTemplate,
    MessagesPlaceholder,
  } = await import('langchain/prompts');
  const {BufferMemory} = await import('langchain/memory');

  const chat = new ChatOpenAI({temperature: 0});

  const chatPrompt = ChatPromptTemplate.fromPromptMessages([
    SystemMessagePromptTemplate.fromTemplate(
      `The following is a friendly conversation between a human and an AI.
      The AI is talkative and provides lots of specific details from its context.
      If the AI does not know the answer to a question, it truthfully says it does not know.
    `,
    ),
    new MessagesPlaceholder('history'),
    HumanMessagePromptTemplate.fromTemplate('{input}'),
  ]);

  llmChain = new ConversationChain({
    memory: new BufferMemory({returnMessages: true, memoryKey: 'history'}),
    prompt: chatPrompt,
    llm: chat,
  });
  return llmChain;
};

interface AskArgs {
  question: string;
}

export async function ask({question}: AskArgs) {
  const chain = await loadChain();
  const response = await chain.call({
    input: question,
  });
  return response;
}
