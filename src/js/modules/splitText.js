const els = document.querySelectorAll('.is-split-text');

const splitText = els.forEach(el => {
  const str = el.innerHTML.trim().split("");
  el.innerHTML = str.reduce((acc, curr) => {
    curr = curr.replace(/\s+/, '&nbsp;');
    return `${acc}<span>${curr}</span>`;
  }, "");
});
