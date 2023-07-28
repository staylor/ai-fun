import type {ActionFunction} from '@remix-run/server-runtime';
import {json} from '@remix-run/server-runtime';

import {ask} from '../utils/llm';

export const action: ActionFunction = async ({request}) => {
  const formData = await request.formData();
  const question = formData.get('question') as string;
  const answer = await ask({question});
  return json({answer: answer?.response || 'Silence is golden.'});
};
