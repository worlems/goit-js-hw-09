const STORAGE_KEY = 'feedback-form-state';

const refs = {
  form: document.querySelector('.feedback-form'),
};

let formData = { email: '', message: '' };

refs.form.addEventListener('input', e => {
  if (e.target.name === 'email' || e.target.name === 'message') {
    formData[e.target.name] = e.target.value.trim();
    saveToLS(STORAGE_KEY, formData);
  }
});

function saveToLS(key, value) {
  const jsonData = JSON.stringify(value);
  localStorage.setItem(key, jsonData);
}

function loadFromLS(key) {
  const savedData = localStorage.getItem(key);
  try {
    return savedData ? JSON.parse(savedData) : null;
  } catch {
    return null;
  }
}

function initPage() {
  const savedData = loadFromLS(STORAGE_KEY);
  if (savedData) {
    formData = savedData;
    refs.form.elements.email.value = formData.email || '';
    refs.form.elements.message.value = formData.message || '';
  }
}
initPage();

refs.form.addEventListener('submit', e => {
  e.preventDefault();

  if (!formData.email || !formData.message) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  refs.form.reset();
  formData = { email: '', message: '' };
});
