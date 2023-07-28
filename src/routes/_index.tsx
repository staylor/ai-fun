import cn from 'classnames';
import {useFetcher} from '@remix-run/react';
import styles from '../css/main.module.css';
import {useState, type FormEvent, useEffect, useRef} from 'react';

interface ChatItem {
  type: string;
  value: string;
}

export default function Home() {
  const loadedRef = useRef('');
  const [chatHistory, setChatHistory] = useState<ChatItem[]>([]);
  const fetcher = useFetcher();

  useEffect(() => {
    if (fetcher.data && fetcher.data.answer !== loadedRef.current) {
      const value = fetcher.data.answer;

      loadedRef.current = value;

      setChatHistory((prev = []) => [...prev, {type: 'answer', value}]);
    }
  }, [fetcher.data]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    const value = event.currentTarget.question.value;

    setChatHistory((prev = []) => [...prev, {type: 'question', value}]);

    fetcher.submit(event.currentTarget);
  };

  return (
    <main className={styles.main}>
      <h1>Hello, AI Overlords!</h1>
      <ul className={styles.chat}>
        {chatHistory.map((item) => (
          <li key={item.value} className={cn(styles.bubble, styles[item.type])}>
            {item.value}
          </li>
        ))}
        {fetcher.state === 'submitting' && (
          <li key="submitting" className={cn(styles.bubble, styles.answer)}>
            ...
          </li>
        )}
      </ul>
      <fetcher.Form method="post" action="/chat" onSubmit={handleSubmit}>
        <p>
          <textarea className={styles.input} name="question"></textarea>
        </p>
        <button className={styles.button} type="submit">
          Ask Question
        </button>
      </fetcher.Form>
    </main>
  );
}
