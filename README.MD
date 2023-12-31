# Техническое требование: 
## "Сайт для управления рекомендациями"

> Все, что было реализовано помечено знаком &#10004;

Целью данного проекта является создание веб-приложения для управления рекомендациями различных произведений, таких как фильмы, книги и игры. Приложение будет предоставлять пользователям возможность создавать обзоры, оценивать произведения, оставлять комментарии и просматривать рекомендации других пользователей. Также, приложение будет поддерживать аутентификацию через социальные сети и предоставлять администраторам доступ к управлению пользователями и обзорами.

## Технические требования
### Фронтенд (Front-end)
* Язык программирования: <b>TypeScript</b>/JavaScript.&#10004;
* Фреймворк: React.&#10004;
* Дизайн и стилизация: Boostrap/<b>Tailwind</b> (поддержка светлой и темной темы).&#10004;
* Поддержка различных разрешений, включая мобильные устройства.&#10004;

### Бэкенд (Back-end)
* Язык программирования: Node.js (<b>Express</b>/Nest).&#10004;
* Система управления базами данных: <b>MySQL</b>/PostgreSQL/MongoDB.&#10004;
* ORM/ODM для доступа к данным.&#10004;
* Движок для полнотекстового поиска (возможно использование отдельного движка или средств базы данных, НЕ ПОЛНОЕ СКАНИРОВАНИЕ селектами).&#10004;

### Роли пользователей
* Неаутентифицированные пользователи:
   * Доступен только режим read-only (поиск доступен, создание обзоров, комментарии, лайки и рейтинги недоступны).&#10004;
* Аутентифицированные пользователи:
   * Доступ к созданию и редактированию обзоров.&#10004;&#10004;
   * Доступ к оценке произведений и обзоров.&#10004;
   * Доступ к комментированию.&#10004;
   * Доступ к личной странице с списком собственных обзоров.&#10004;
* Администраторы:
   * Все что могут аутентифицированные&#10004;
   * Доступ к списку пользователей (админка).&#10004;
### Обзоры
   * Создание обзоров с указанием названия обзора, названия произведения, "группы" (например, "Кино", "Книги", "Игры"), тэгов, текста обзора (с поддержкой форматирования markdown), изображения-иллюстрации (хранение в облаке) и оценки по 10-балльной шкале.&#10004;
### Изображения
   * Загрузка изображений с помощью драг-н-дроп.&#10004;
   * Хранение изображений в облаке.&#10004;
### Главная страница
   * Отображение последних добавленных обзоров.&#10004;
   * Отображение обзоров с самыми большими оценками.&#10004;
   * Отображение облака тэгов.&#10004;
### Рейтинги и лайки
   * Пользователи могут ставить рейтинг (1..5 звезд) произведению (не более одного от одного пользователя на один обзор или произведение).&#10004;
   * Отображение среднего пользовательского рейтинга рядом с названием обзора на сайте.&#10004;
   * Возможность пользователей поставить лайк собственно самому обзору (не более 1 на обзор от 1 пользователя).&#10004;
   * Отображение количества лайков рядом с именем пользователя.&#10004;
### Комментарии
   * Линейные комментарии.&#10004;
   * Нельзя комментировать комментарий.&#10004;
   * Автоматическая подгрузка новых комментариев при добавлении новых (с задержкой 2-5 секунд).&#10004;
### Мультиязычность
   * Поддержка не менее двух языков UI: английский и другой (польский, русский, грузинский, узбекский, др.) с возможностью выбора пользователем.
Содержимое, обзоры и комментарии не переводятся.&#10004;

### Темная/Светлая тема &#10004;

### Аутентификация
* Аутентификация через социальные сети (не менее двух видов)

### Дополнительные требования (по желанию)
   * Продвинутая админка для управления пользователями (просмотр, блокировка, удаление, назначение админами).&#10004;
   * Загрузка произвольного числа иллюстраций для обзоров и поддержка галереи для просмотра.&#10004;
   * Экспорт обзоров с картинками в PDF.&#10004;
   * Возможность "связывать" разные обзоры на одно произведение от разных пользователей и подсчет среднего рейтинга.&#10004;

<details open>
<summary>План работы:</summary>
<br>

## Шаг 0: Подготовка материалов для разработки
1. Изучение
	- Что такое ORM? 
	- Что такое Машина полнотекстового поиска?
	- Как интегрировать в проект? 
	- Изучение базы mySql
   
2. Создание дизайна каждой страницы 

## Шаг 1: Настройка окружения и структуры проекта
1. Инициализация проекта:
   - Создание новой директории для проекта.
   - Использование `npm init` для инициализации проекта и создания `package.json`. 
<br/><br/>
2. Создание серверной части:
   - Использование Express.js для создания сервера. 
   - **Подключение к удаленному MySQL серверу!** 
<br/><br/>
3. Создание клиентской части:
   - Использование Create React App или ручную настройку для создания React-приложения. 
<br/><br/>
4. Деплой приложения 

## Шаг 2: Работа с базой данных
0. Обучение проектированию базы данных
1. Создание базы данных MySQL и настройка подключения.
2. Использование ORM (например, Sequelize) для создания моделей и связей между таблицами. &#10004;
3. Создание таблиц

## Шаг 3: Реализация полнотекстового поиска
1. Изучение вариантов полнотекстового поиска в MySQL. 
2. Создание механизма поиска по сайту, используя SQL запросы или поисковый движок. 

## Шаг 4: Настройка аутентификации
1. Изучение документации по аутентификации через социальные сети (например, Passport.js) для выбранных социальных сетей (например, Google, Facebook).
2. Реализация аутентификации и создание роутов для обработки авторизации.

## Шаг 5: Отображение страниц и компонентов
0. Создание переиспользуемых компонентов
   - Кнопки 
   - Текст 
   - Инпуты 
   - Лайк 
   - Селект
   - Алерт 
   - Бэйдж 
   - Нижняя нав панель
   - Чекбокс
   - Рэндж 
   - Строка поиска
   - Спиннер
   - Таблица
   - Облако тэгов 
   - TextArea 
   - Переключатель темы 
   - Переключатель языка 
   - Маленькие картинки (аватар)
<br/><br/>
1. Создание компонентов для верхней панели, бокового меню, футера и других общих элементов интерфейса:
   - Header 
   - Footer 
   - Обзор 
   - Боковое меню 
   - Комментарий 
<br/><br/>
2. Создание роутов основных страниц (Protected-Routes)

## Шаг 6: Создание страницы аутентификации
1. Реализация страницы Login 
2. Реализация страницы SignUp 

## Шаг 7: Создание страницы пользователя
1. Реализация страницы профиля пользователя:
   - Отображение списка своих обзоров. 
   - Возможность создания, редактирования и удаления обзоров.
   - Загрузка изображений с помощью drag-n-drop. 

## Шаг 8: Создание главной страницы
1. Реализация главной страницы:
   - Отображение списка последних обзоров.
   - Отображение лучших обзоров
   - Облако тэгов. 

## Шаг 9: Создание страницы обзора
1. Реализация главной страницы:
   - Отображение данных об обзоре. 
   - Отображение комментариев обзоров 

## Шаг 10: Рейтинги, лайки и комментарии
1. Добавление функциональности для установки рейтинга и лайка для обзоров. 
2. Реализация логики для отображения среднего пользовательского рейтинга. 
3. Разработка системы комментариев с автоматической подгрузкой новых. 

## Шаг 11:  Страница настроек
1. Добавление поддержки локализации для двух языков UI (английский и выбранный вами язык).
2. Разработка стилей для светлой и темной тем.

## Шаг 12: Административная панель
1. Создание страницы администратора:
   - Отображение списка пользователей.
   - Возможность блокировки, разблокировки и удаления пользователей.

## Шаг 13: Опциональные требования
1. Реализация продвинутой админки для управления пользователями и их правами. &#10004;
2. Добавление поддержки загрузки нескольких иллюстраций для обзора и галереи для просмотра. 
3. Разработка функциональности экспорта обзоров в PDF.
4. Создание связи между разными обзорами на одно произведение и расчет среднего рейтинга.

## Шаг 14: Деплой и тестирование
1. Развертывание вашего приложения на выбранной платформе.
2. Тестирование всех функциональностей и удостоверение, что приложение работает корректно.
</details>

