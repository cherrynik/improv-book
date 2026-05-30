import type { ReactNode } from "react";
import type { Locale } from "@/shared/i18n";
import type { Lesson } from "./types";

function strong(text: ReactNode) {
  return <strong className="font-semibold text-ink">{text}</strong>;
}

const RU: Record<string, Lesson> = {
  "story-spine": {
    titleNode: <>Story Spine</>,
    lede: "История — это про изменение: в начале мир один, в конце другой. Держится на каркасе из семи шагов.",
    blocks: [
      {
        type: "essence",
        text: "Каркас — это компас, а не рельсы. Подсказывает, куда тянуть сцену, но не диктует реплики.",
      },
      { type: "heading", text: "Каркас" },
      {
        type: "spine",
        steps: [
          {
            cue: "Жил-был…",
            note: "В такое-то время, в таком-то месте — герой, и сразу когда и где. Место и время — базовые предложения.",
          },
          {
            cue: "И каждый день…",
            note: "Рутина. Часто проговаривают дважды для ритма.",
          },
          { cue: "Но однажды…", note: "Слом рутины. Отсюда начинается история." },
          {
            cue: "И из-за этого…",
            note: "Последствие. Повторяется — цепочка нарастает.",
            highlighted: true,
          },
          { cue: "И в результате…", note: "Кульминация." },
          {
            cue: "А затем…",
            note: "Новый, изменённый мир. Развязка может стихать в несколько «а затем…».",
          },
        ],
      },
      {
        type: "example",
        title: "Пример",
        lines: [
          { cue: "Жил-был", text: "бариста Гоша — наши дни, крошечная кофейня на углу." },
          { cue: "И каждый день", text: "он рисовал на пенке одно и то же сердечко." },
          {
            cue: "Но однажды",
            text: "посетительница оставила записку: «нарисуй что-нибудь настоящее».",
          },
          { cue: "Из-за этого", text: "он стал рисовать на чашках сцены из своей жизни." },
          { cue: "Из-за этого", text: "о кофейне заговорили." },
          { cue: "Пока наконец", text: "хозяин не отдал ему под роспись целую стену." },
          { cue: "И с тех пор", text: "Гоша рисует на холстах." },
        ],
      },
      { type: "heading", text: "Движок истории" },
      {
        type: "paragraph",
        node: (
          <>
            Середина — не список событий, а {strong("цепочка причин")}. Связки
            «каждый день», «но однажды», «а затем» лишь отмечают начало и хвост.
            Весь подъём держится на одном слове: из-за этого.
          </>
        ),
      },
      {
        type: "comparison",
        items: [
          {
            alive: false,
            label: "просто подряд",
            text: "Рыцарь пошёл в лес. И потом встретил дракона. И потом съел бутерброд.",
            note: "Любое событие можно выкинуть или переставить — ничего не изменится. Это перечень, а не история.",
          },
          {
            alive: true,
            label: "каждое вызвано предыдущим",
            text: "Дракон сжёг деревню рыцаря. Из-за этого он год учился ходить по углям. И в результате задул драконье пламя одним вдохом.",
            note: "Выкинь одно звено — рвётся вся цепочка. Вот это и есть история.",
          },
        ],
      },
      {
        type: "callout",
        title: "Запомни",
        node: (
          <>
            Связки отмечают начало и конец. Но весь подъём держится на одном
            слове — из-за этого.
          </>
        ),
      },
      {
        type: "next",
        node: (
          <>
            Трёхактная структура, story spine в групповых форматах и упражнения
            на отработку причинной связки.
          </>
        ),
      },
    ],
  },

  "yes-and": {
    titleNode: <>«Да, и…»</>,
    lede: "Прими реальность, которую дал партнёр, и добавь своё. У импрова нет сценария — реальность строится предложение за предложением.",
    blocks: [
      {
        type: "essence",
        text: "«Да, и…» — это раствор, что скрепляет кирпичи сцены.",
      },
      { type: "heading", text: "Две половины" },
      {
        type: "definitionHalves",
        items: [
          {
            term: "Да",
            lead: "— принятие.",
            description:
              "Соглашаешься с реальностью партнёра. Без «да» нет общего мира: каждый играет свою сцену.",
          },
          {
            term: "И",
            lead: "— вклад.",
            description:
              "Добавляешь новое и двигаешь сцену. Без «и» мир есть, но топчется на месте.",
          },
        ],
      },
      { type: "heading", text: "Одна завязка, три ответа" },
      {
        type: "paragraph",
        node: <>Завязка: «Дедушка, ты опять оставил машину под дождём».</>,
      },
      {
        type: "dialogues",
        items: [
          {
            kind: "block",
            label: "Блок",
            cue: "Дедушка, ты опять оставил машину под дождём.",
            response: "Я не твой дедушка. И машины у меня никогда не было.",
            note: "Отменил всё. Строить не из чего.",
          },
          {
            kind: "weak",
            label: "«Да» без «и»",
            cue: "Дедушка, ты опять оставил машину под дождём.",
            response: "Ой, прости. Сейчас пойду заберу.",
            note: "Принято, но сцена не сдвинулась. Самая незаметная ошибка.",
          },
          {
            kind: "good",
            label: "«Да, и…»",
            cue: "Дедушка, ты опять оставил машину под дождём.",
            response:
              "Да, и я нарочно. Хотел, чтобы дождь смыл с неё то, что было на той дороге.",
            note: "Принял и добавил тайну. Поехало.",
          },
        ],
      },
      {
        type: "paragraph",
        node: (
          <>
            Правильных «да, и…» всегда много —{" "}
            {strong("любой честный вклад лучше блока.")}
          </>
        ),
      },
      { type: "heading", text: "Это не «соглашаться во всём»" },
      {
        type: "callout",
        title: "Главный нюанс",
        node: (
          <>
            «Да, и…» работает на уровне реальности сцены, а не мнений персонажа.
            Герои могут спорить и ругаться — важно лишь, принял ли игрок
            предложенный факт.
          </>
        ),
      },
      {
        type: "dialogues",
        items: [
          {
            kind: "block",
            label: "Блок",
            cue: "Ты разбил мамину вазу!",
            response: "Никакой вазы я не трогал.",
            note: "Игрок отрицает сам факт. Реальность рушится.",
          },
          {
            kind: "good",
            label: "«Да, и…»",
            cue: "Ты разбил мамину вазу!",
            response: "Да, и я рад! Ненавидел её всю жизнь!",
            note: "Принял факт и добавил давнюю обиду. Персонаж злится, но предложение принято.",
          },
        ],
      },
      {
        type: "paragraph",
        node: (
          <>
            Видишь разницу? Ссора — это не блок.{" "}
            {strong("Спор героев — топливо. Отрицание факта — тормоз.")}
          </>
        ),
      },
      { type: "heading", text: "Предложения — не только слова" },
      {
        type: "paragraph",
        node: (
          <>
            Принимай всё, что даёт партнёр: реплику, жест (протянул тяжёлую
            коробку — держи как тяжёлую), эмоцию (вошёл в слезах — что-то
            случилось), среду («как холодно в подвале» — теперь вы в подвале).
          </>
        ),
      },
      { type: "heading", text: "Ловушки" },
      {
        type: "traps",
        items: [
          { title: "«Да, но…» — вежливый блок", note: "Лови себя на «но»." },
          {
            title: "«Да, и…» в хаос",
            note: "Валишь гору несвязанных вводных. Одно хорошее «и» лучше пяти случайных.",
          },
          { title: "Принятие из вежливости", note: "Согласился, но не вложился." },
          {
            title: "Буквальная формула",
            note: "«Да, и…» — установка в голове, а не штамп в начале каждой реплики.",
          },
        ],
      },
      {
        type: "example",
        title: "Хаос против одного «и»",
        lines: [
          { cue: "Завязка.", text: "«Дорогой, у нас закончился кофе»." },
          {
            cue: "✕ Хаос.",
            text: "«Да, и я инопланетянин, и в подвале бомба, и я твой клон из будущего!» — пять вводных за ход, сцене не за что ухватиться.",
          },
          {
            cue: "✓ Одно «и».",
            text: "«Да, и я допил последний нарочно — нам надо поговорить на трезвую голову». — одно предложение, которое развивает то, что есть.",
          },
        ],
      },
      {
        type: "exercises",
        items: [
          {
            tag: "Соло",
            title: "Дневник да-и",
            note: "На любое бытовое событие мысленно отвечай «да, и…».",
          },
          {
            tag: "Пара",
            title: "Планируем вечеринку",
            note: "Каждая реплика с «Да, и…». Сцена набирает энергию.",
          },
          {
            tag: "Анти",
            title: "Сплошное нет",
            note: "Сыграйте сцену, где оба блокируют. Ощути, как это мёртво.",
          },
        ],
      },
      {
        type: "next",
        node: (
          <>
            Механика вблизи: что такое предложение (offer), что такое блок и
            почему «не отрицай» тренируется отдельно.
          </>
        ),
      },
    ],
  },
};

const EN: Record<string, Lesson> = {
  "story-spine": {
    titleNode: <>Story Spine</>,
    lede: "A story is about change: at the start the world is one way, at the end another. It holds together on a seven-step spine.",
    blocks: [
      {
        type: "essence",
        text: "The spine is a compass, not rails. It hints where to pull the scene, but never dictates the lines.",
      },
      { type: "heading", text: "The spine" },
      {
        type: "spine",
        steps: [
          {
            cue: "Once upon a time…",
            note: "A time, a place — a hero, with the when and where right away. Place and time are the base offers.",
          },
          {
            cue: "Every day…",
            note: "The routine. Often repeated twice for rhythm.",
          },
          { cue: "But one day…", note: "The routine breaks. The story begins here." },
          {
            cue: "Because of that…",
            note: "A consequence. It repeats — the chain keeps building.",
            highlighted: true,
          },
          { cue: "Until finally…", note: "The climax." },
          {
            cue: "And ever since…",
            note: "A new, changed world. The ending can settle across a few “and then…”.",
          },
        ],
      },
      {
        type: "example",
        title: "Example",
        lines: [
          { cue: "Once upon a time", text: "a barista named Gosha — present day, a tiny corner café." },
          { cue: "Every day", text: "he drew the same little heart in the foam." },
          {
            cue: "But one day",
            text: "a customer left a note: “draw something real”.",
          },
          { cue: "Because of that", text: "he started drawing scenes from his life on the cups." },
          { cue: "Because of that", text: "people started talking about the café." },
          { cue: "Until finally", text: "the owner gave him a whole wall to paint." },
          { cue: "And ever since", text: "Gosha paints on canvases." },
        ],
      },
      { type: "heading", text: "The story engine" },
      {
        type: "paragraph",
        node: (
          <>
            The middle isn't a list of events, it's a {strong("chain of causes")}.
            The links “every day”, “but one day”, “and then” only mark the start
            and the tail. The whole rise rests on three words: because of that.
          </>
        ),
      },
      {
        type: "comparison",
        items: [
          {
            alive: false,
            label: "just in a row",
            text: "The knight went into the forest. And then met a dragon. And then ate a sandwich.",
            note: "Any event can be cut or reordered — nothing changes. That's a list, not a story.",
          },
          {
            alive: true,
            label: "each caused by the last",
            text: "A dragon burned the knight's village. Because of that he spent a year learning to walk on coals. And as a result he blew out the dragon's fire in one breath.",
            note: "Cut one link — the whole chain breaks. That's a story.",
          },
        ],
      },
      {
        type: "callout",
        title: "Remember",
        node: (
          <>
            The links mark the start and the end. But the whole rise rests on
            three words — because of that.
          </>
        ),
      },
      {
        type: "next",
        node: (
          <>
            Three-act structure, the story spine in group formats, and drills for
            the causal link.
          </>
        ),
      },
    ],
  },

  "yes-and": {
    titleNode: <>“Yes, and…”</>,
    lede: "Accept the reality your partner offers, and add your own. Improv has no script — reality is built offer by offer.",
    blocks: [
      {
        type: "essence",
        text: "“Yes, and…” is the mortar that binds the bricks of a scene.",
      },
      { type: "heading", text: "Two halves" },
      {
        type: "definitionHalves",
        items: [
          {
            term: "Yes",
            lead: "— acceptance.",
            description:
              "You agree with your partner's reality. Without “yes” there's no shared world: everyone plays their own scene.",
          },
          {
            term: "And",
            lead: "— contribution.",
            description:
              "You add something new and move the scene. Without “and” the world exists but stalls in place.",
          },
        ],
      },
      { type: "heading", text: "One setup, three answers" },
      {
        type: "paragraph",
        node: <>Setup: “Grandpa, you left the car out in the rain again.”</>,
      },
      {
        type: "dialogues",
        items: [
          {
            kind: "block",
            label: "Block",
            cue: "Grandpa, you left the car out in the rain again.",
            response: "I'm not your grandpa. And I've never owned a car.",
            note: "Cancelled everything. Nothing to build on.",
          },
          {
            kind: "weak",
            label: "“Yes” without “and”",
            cue: "Grandpa, you left the car out in the rain again.",
            response: "Oh, sorry. I'll go get it now.",
            note: "Accepted, but the scene didn't move. The sneakiest mistake.",
          },
          {
            kind: "good",
            label: "“Yes, and…”",
            cue: "Grandpa, you left the car out in the rain again.",
            response:
              "Yes, and I did it on purpose. I wanted the rain to wash off what was on it from that road.",
            note: "Accepted and added mystery. Off we go.",
          },
        ],
      },
      {
        type: "paragraph",
        node: (
          <>
            There are always many right “yes, and…”s —{" "}
            {strong("any honest contribution beats a block.")}
          </>
        ),
      },
      { type: "heading", text: "It's not “agree with everything”" },
      {
        type: "callout",
        title: "The key nuance",
        node: (
          <>
            “Yes, and…” works on the level of the scene's reality, not the
            character's opinions. Heroes can argue and fight — all that matters is
            whether the player accepted the offered fact.
          </>
        ),
      },
      {
        type: "dialogues",
        items: [
          {
            kind: "block",
            label: "Block",
            cue: "You broke mom's vase!",
            response: "I never touched any vase.",
            note: "The player denies the fact itself. Reality collapses.",
          },
          {
            kind: "good",
            label: "“Yes, and…”",
            cue: "You broke mom's vase!",
            response: "Yes, and I'm glad! I hated it my whole life!",
            note: "Accepted the fact and added an old grudge. The character is angry, but the offer is accepted.",
          },
        ],
      },
      {
        type: "paragraph",
        node: (
          <>
            See the difference? A quarrel isn't a block.{" "}
            {strong("An argument between characters is fuel. Denying a fact is the brake.")}
          </>
        ),
      },
      { type: "heading", text: "Offers aren't only words" },
      {
        type: "paragraph",
        node: (
          <>
            Accept everything your partner gives: a line, a gesture (handed you a
            heavy box — hold it as heavy), an emotion (walked in crying —
            something happened), the environment (“it's so cold in this basement”
            — now you're in a basement).
          </>
        ),
      },
      { type: "heading", text: "Traps" },
      {
        type: "traps",
        items: [
          { title: "“Yes, but…” — a polite block", note: "Catch yourself on “but”." },
          {
            title: "“Yes, and…” into chaos",
            note: "You pile on a heap of unrelated info. One good “and” beats five random ones.",
          },
          { title: "Accepting out of politeness", note: "You agreed but didn't invest." },
          {
            title: "The literal formula",
            note: "“Yes, and…” is a mindset, not a stamp at the start of every line.",
          },
        ],
      },
      {
        type: "example",
        title: "Chaos vs one “and”",
        lines: [
          { cue: "Setup.", text: "“Honey, we're out of coffee.”" },
          {
            cue: "✕ Chaos.",
            text: "“Yes, and I'm an alien, and there's a bomb in the basement, and I'm your clone from the future!” — five offers in one turn, nothing for the scene to grab.",
          },
          {
            cue: "✓ One “and”.",
            text: "“Yes, and I finished the last cup on purpose — we need to talk sober.” — one offer that develops what's already there.",
          },
        ],
      },
      {
        type: "exercises",
        items: [
          {
            tag: "Solo",
            title: "Yes-and journal",
            note: "To any everyday event, mentally answer “yes, and…”.",
          },
          {
            tag: "Pair",
            title: "Planning a party",
            note: "Every line with “Yes, and…”. The scene gains energy.",
          },
          {
            tag: "Anti",
            title: "Nothing but no",
            note: "Play a scene where both block. Feel how dead it is.",
          },
        ],
      },
      {
        type: "next",
        node: (
          <>
            The mechanics up close: what an offer is, what a block is, and why
            “don't deny” is trained separately.
          </>
        ),
      },
    ],
  },
};

const LESSONS: Record<Locale, Record<string, Lesson>> = { ru: RU, en: EN };

export function getLessonById(id: string, locale: Locale): Lesson | undefined {
  return LESSONS[locale][id];
}
