import {useState, type FormEvent, useEffect, useRef} from 'react';
import cn from 'classnames';
import {useFetcher} from '@remix-run/react';
// @ts-ignore CJS related
import Markdown from 'react-markdown';

import styles from '../css/main.module.css';

interface ChatItem {
  role: string;
  value: string;
}

export default function Home() {
  const loadedRef = useRef(null);
  const bottomRef = useRef<HTMLLIElement>(null);
  const [question, setQuestion] = useState<string>('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const fetcher = useFetcher();

  useEffect(() => {
    if (
      fetcher.state === 'idle' &&
      fetcher.data &&
      loadedRef.current !== fetcher.data
    ) {
      const value = fetcher.data.answer;

      loadedRef.current = fetcher.data;

      setChatHistory((prev = []) => [...prev, {role: 'assistant', value}]);
    }
  }, [fetcher.state, fetcher.data]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({behavior: 'smooth'});
  }, [chatHistory]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const value = event.currentTarget.question.value;
    if (!value) return;

    setChatHistory((prev = []) => [...prev, {role: 'user', value}]);

    fetcher.submit(event.currentTarget);

    setQuestion('');
  };

  const size = chatHistory.length;

  return (
    <main className={styles.main}>
      <h1>Hello, AI Overlords!</h1>
      {size > 0 && (
        <ul className={styles.chat}>
          {chatHistory.map((item, i) => (
            <li
              key={item.value}
              className={cn(styles.bubble, styles[item.role])}
              ref={i === size - 1 ? bottomRef : undefined}
            >
              <Markdown>{item.value}</Markdown>
            </li>
          ))}
          {fetcher.state === 'submitting' && (
            <li
              key="submitting"
              className={cn(styles.bubble, styles.assistant, styles.pending)}
            >
              ...
            </li>
          )}
        </ul>
      )}
      <fetcher.Form method="post" action="/chat" onSubmit={handleSubmit}>
        <p>
          <textarea
            className={styles.input}
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.currentTarget.value)}
          />
        </p>
        <button className={styles.button} type="submit">
          Ask Question
        </button>
      </fetcher.Form>
    </main>
  );
}
