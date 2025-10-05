export async function trainModel(file) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/train', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Train request failed');
  }
  return res.json();
}

export async function predict(file) {
  const form = new FormData();
  form.append('file', file);

  const res = await fetch('/api/predict', {
    method: 'POST',
    body: form,
  });

  if (!res.ok) {
    const txt = await res.text();
    throw new Error(txt || 'Predict request failed');
  }
  return res.json();
}
