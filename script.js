const card = document.querySelector('.product-card');

document.addEventListener('mousemove', (event) => {
  if (!card) return;

  const x = (event.clientX / window.innerWidth - 0.5) * 10;
  const y = (event.clientY / window.innerHeight - 0.5) * 10;

  card.style.transform = `translateY(${y}px) rotate(${x * 0.2}deg)`;
});
