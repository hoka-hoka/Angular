/*
Модель коммита по умолчанию:
<type>(<scope?>): <subject!>
<BLANK LINE>
<body?>
<BLANK LINE>
<footer?>

Default types:
build: изменения, затрагивающие системы сборки или внешние зависимости
ci: обновление файлов конфигурации для служб непрерывной интеграции и развертывания
chore: обновление грубых задач и т.д.; без изменения производственного кода
docs: изменения только для документации
feat: новая функция
fix: исправление ошибки
perf: изменение кода, повышающее производительность
refactor: изменение кода, которое не исправляет ошибку и не добавляет новую функцию.
style: изменения, не влияющие на смысл кода (пробелы, форматирование, отсутствие точек с запятой и т. д.)
test: добавление отсутствующих тестов или исправление существующих тестов

scope - имя области действия (что было затронуто)
subject - заголовок коммита (*в повелительном наклонении -> закрой дверь, вынеси мусор, перенеси код)
body - тело коммита

Current types:
⭐️ - New feature (:star:)
🐞 - Bugfix (:beetle:)
✅ - Add, update tests (:white_check_mark:)
🚧 - Work in progress (:construction:)
♻️ - Refactor (:recycle:)
📝 - Documentation update (:pencil:)
*/

const matchAnyEmojiWithSpaceAfter =
  /(\u00a9|\u00ae|[\u2000-\u3300]|\ud83c[\ud000-\udfff]|\ud83d[\ud000-\udfff]|\ud83e[\ud000-\udfff])\s/;
const matchOptionalTicketNumberWithSpaceAfter = /(\[(T-\d+)\]\s)/; // "[T-4605] ", "[T-1]"
const subjectThatDontStartWithBracket = /([|].+)/; // "Add tests" but

module.exports = {
  extends: ['@commitlint/config-conventional'],
  parserPreset: {
    parserOpts: {
      headerPattern: new RegExp(
        '^' +
          matchAnyEmojiWithSpaceAfter.source +
          matchOptionalTicketNumberWithSpaceAfter.source +
          subjectThatDontStartWithBracket.source +
          '$',
      ),
      headerCorrespondence: ['type', 'ticket', 'subject'],
    },
  },

  plugins: [
    {
      rules: {
        'header-match-team-pattern': (parsed) => {
          const { emoji, ticket, subject } = parsed;
          if (emoji === null && ticket === null && subject === null) {
            return [false, "header must be in format '✅ [T-4605] Add tests' or '✅ Add tests'"];
          }
          return [true, ''];
        },
      },
    },
  ],

  rules: {
    'header-match-team-pattern': [2, 'always'],
    'type-empty': [0, 'never'],
    'subject-empty': [0, 'never'],
    'subject-case': [0, 'never'],
    'header-max-length': [0, 'never'],
    'type-enum': [2, 'always', ['⭐️', '🐞', '✅', '🚧', '♻️', '📝']],
  },
};
