window.onload = makeFavoriteTheme;
const themesColor = {
  theme1: {
    body_background: '#3a4764',
    toggle_background: '#232c43',
    screen_background: '#182034',
    del_background: '#637097',
    del_shadow: '#404e72',
    toggle_btn_background: '#d03f2f',
    toggle_btn_shadow: '#93261a',
    num_background: '#eae3dc ',
    num_shadow: '#b4a597',
    text_num: '#444b5a',
    screen_text: '#ffffff',
    del_text: '#ffffff',
    equal_text: '#ffffff'
  },
  theme2: {
    body_background: '#e6e6e6',
    toggle_background: '#d1cccc',
    screen_background: ' #ededed',
    del_background: '#377f86',
    del_shadow: '#1b5f65',
    toggle_btn_background: '#ca5502',
    toggle_btn_shadow: '#893901',
    num_background: '#e5e4e1',
    num_shadow: '#a69d91',
    text_num: '#35352c',
    screen_text: '#35352c',
    del_text: '#fff',
    equal_text: '#fff'
  },
  theme3: {
    body_background: '#160628',
    toggle_background: '#1d0934',
    screen_background: '#1d0934',
    del_background: '#58077d',
    del_shadow: '#bc15f4',
    toggle_btn_background: '#00e0d1',
    toggle_btn_shadow: '#6cf9f2',
    num_background: '#341c4f',
    num_shadow: '#871c9c',
    text_num: '#ffe53d',
    screen_text: '#ffe53d',
    del_text: '#fff',
    equal_text: '#1b2428'
  }
};

const shiftArray = [
  '0',
  '1',
  '2',
  '3',
  '4',
  '5',
  '6',
  '7',
  '8',
  '9',
  '.',
  '+',
  '/',
  '-',
  '*'
];

const radioButtons = document.querySelectorAll('input[type="radio"]');
const toggleButton = document.querySelector('.circle__btn');
const buttons = document.querySelectorAll('button');
const screen = document.querySelector('.screen');

function changeTheme(id) {
  const currentTheme = themesColor[id]; //copy object(variables) of the theme given

  //lop over the object & change the css variables
  for (const item in currentTheme) {
    document.documentElement.style.setProperty(`--${item}`, currentTheme[item]);
  }
}

function makeFavoriteTheme() {
  //let the favorite theme when reload the page
  const favoriteTheme = localStorage.getItem('defaultTheme') || '';
  if (favoriteTheme.includes('theme')) {
    changeTheme(favoriteTheme);
    animateToggleButton(favoriteTheme);
  }
}

function animateToggleButton(id) {
  //moving the toggle button
  switch (id) {
    case 'theme1':
      toggleButton.style.left = '0';
      break;

    case 'theme2':
      toggleButton.style.left = '38%';
      break;

    case 'theme3':
      toggleButton.style.left = '75%';
      break;

    default:
      break;
  }
}

function buttonClicked(e) {
  const btnTxt = this.textContent || e.key;

  //when click RESET button
  if (btnTxt === 'RESET') {
    screen.textContent = '0';
  }

  //when click any sift button(shiftArray)
  if (shiftArray.find((shift) => shift === btnTxt)) {
    const lastCharacter = screen.textContent.slice(-1);

    if (
      screen.textContent === 'Infinity' ||
      screen.textContent === 'Math ERROR' ||
      screen.textContent === '0'
    ) {
      screen.textContent = btnTxt; //if the screen has this 3 value will display value of clicked button
    } else if (
      ['*', '/', '.', '-', '+'].includes(btnTxt) &&
      ['*', '/', '.', '-', '+'].includes(lastCharacter)
    ) {
      screen.textContent =
        screen.textContent.slice(0, screen.textContent.length - 1) + btnTxt; //avoid getting syntax like('5+*3','3+++3')
    } else {
      screen.textContent += btnTxt; //normal scenario concat screen value with clicked button value
    }
  }

  //when click DEL button
  if (btnTxt === 'DEL' || btnTxt === 'Backspace') {
    screen.textContent =
      screen.textContent == 'Infinity' ||
      screen.textContent == '0' ||
      screen.textContent == 'Math ERROR' ||
      screen.textContent.length === 1
        ? '0' //reset
        : screen.textContent.substring(0, screen.textContent.length - 1); //delete last character
  }

  //when click equal button
  if (btnTxt === '=' || btnTxt === 'Enter') {
    screen.textContent = calc(screen.textContent);
  }
}

function calc(exp) {
  try {
    return eval(exp);
  } catch (e) {
    return 'Math ERROR';
  }
}

function check() {
  if (this.checked) {
    const themeId = this.id;
    animateToggleButton(themeId);
    changeTheme(themeId);
    localStorage.setItem('defaultTheme', themeId);
  }
}

function keyDown(e) {
  buttonClicked(e);
}

radioButtons.forEach((rd) => rd.addEventListener('change', check));
buttons.forEach((btn) => btn.addEventListener('click', buttonClicked));
window.addEventListener('keyup', keyDown);
