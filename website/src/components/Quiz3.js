import React, { useState } from 'react';
import styles from './Quiz.module.css';

const questions = [
  {q: 'Какой файл конфигурации применяется для всех пользователей при входе в систему?', a: ['/etc/bashrc', '/etc/profile', '~/.bashrc', '~/.profile'], c: 1},
  {q: 'Какая команда активирует изменения в .bashrc?', a: ['reload ~/.bashrc', 'exec ~/.bashrc', 'source ~/.bashrc', 'run ~/.bashrc'], c: 2},
  {q: 'Какая команда показывает дерево процессов?', a: ['ps aux', 'pstree', 'top', 'htop'], c: 1},
  {q: 'Какой сигнал завершает процесс принудительно?', a: ['SIGTERM', 'SIGUSR1', 'SIGHUP', 'SIGKILL'], c: 3},
  {q: 'Какой менеджер пакетов используется в Arch Linux?', a: ['apt', 'dnf', 'yum', 'pacman'], c: 3},
  {q: 'Что делает команда `apt update`?', a: ['Обновляет систему', 'Удаляет пакеты', 'Обновляет список пакетов', 'Устанавливает зависимости'], c: 2},
  {q: 'Какой каталог содержит конфигурационные файлы системы?', a: ['/home', '/etc', '/usr', '/var'], c: 1},
  {q: 'Что делает команда `killall`?', a: ['Завершает все процессы', 'Завершает процессы по имени', 'Перезапускает процессы', 'Показывает список процессов'], c: 1},
  {q: 'Какой файл используется для установки переменных окружения только для текущего пользователя?', a: ['/etc/profile', '/etc/bashrc', '~/.profile', '/usr/local/bin'], c: 2},
  {q: 'Какая команда используется для редактирования конфигурационных файлов в терминале?', a: ['vim', 'nano', 'edit', 'code'], c: 1}
];

export default function Quiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [finished, setFinished] = useState(false);
  const [clicked, setClicked] = useState(null);
  const [locked, setLocked] = useState(false);

  function choose(i) {
    if (locked) return;
    setClicked(i);
    setLocked(true);

    setTimeout(() => {
      const updated = [...answers, i];
      setAnswers(updated);
      setClicked(null);
      setLocked(false);

      if (step + 1 < questions.length) setStep(step + 1);
      else setFinished(true);
    }, 1200);
  }

  const score = answers.filter((a, i) => a === questions[i].c).length;

  if (finished) {
    return (
      <div className={styles.quizBox}>
        <h2 className={styles.title}>Результат</h2>
        <p className={styles.score}>{score} из {questions.length}</p>
      </div>
    );
  }

  return (
    <div className={styles.quizBox}>
      <h3 className={styles.question}>{questions[step].q}</h3>
      <div className={styles.answers}>
        {questions[step].a.map((text, i) => {
          let cls = styles.btn;

          if (clicked !== null) {
            if (i === questions[step].c) cls += ` ${styles.correctFinal}`;
            if (i === clicked && i !== questions[step].c) cls += ` ${styles.wrongFinal}`;
          }

          if (clicked === i) {
            cls += i === questions[step].c ? ` ${styles.correct}` : ` ${styles.wrong}`;
          }

          return (
            <button key={i} className={cls} onClick={() => choose(i)}>
              {text}
            </button>
          );
        })}
      </div>
      <p className={styles.progress}>{step + 1} / {questions.length}</p>
    </div>
  );
}
